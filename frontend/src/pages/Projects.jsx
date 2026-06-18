import MainLayout from "../layouts/MainLayout";

import AllProjectsCard from "../components/Projects/AllProjectsCard";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";
import ViewProjectModal from "../components/Projects/ViewProjectModal";
import CompletedProjectsCard from "../components/Projects/CompletedProjectsCard";
import PinnedProjectsCard from "../components/Projects/PinnedProjectsCard";

import { useState } from "react";
import { initialProjects } from "../data/projects";

function Projects() {
    const [showProjectModal,
        setShowProjectModal] =
        useState(false);

    const [projects, setProjects] =
        useState(initialProjects);

    const [selectedProjectId, setSelectedProjectId] =
        useState(null);

    const [editingProject, setEditingProject] =
        useState(null);

    const selectedProject =
        projects.find(
            (project) =>
                project.id === selectedProjectId
        );

    const handleTogglePin = (projectId) => {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        pinned: !project.pinned,
                    }
                    : project
            )
        );
    };

    const handleClearAllProjects = () => {
        setProjects([]);
    };

    const handleClearAllCompleted = () => {
        setProjects((prev) =>
            prev.filter(
                (project) => !project.completed
            )
        );
    };

    const handleEditProject = (project) => {
        setEditingProject(project);

        setShowProjectModal(true);
    };

    const handleDeleteProject = (projectId) => {
        setProjects((prev) =>
            prev.filter(
                (project) =>
                    project.id !== projectId
            )
        );
    };

    const handleUnpinAllProjects = () => {
        setProjects((prev) =>
            prev.map((project) => ({
                ...project,
                pinned: false,
            }))
        );
    };

    const handleToggleComplete = (projectId) => {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        completed: !project.completed,

                        completedDate: !project.completed
                            ? new Date().toLocaleDateString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )
                            : null,

                        status: !project.completed
                            ? "Completed"
                            : "Active",

                        progress: !project.completed
                            ? 100
                            : project.progress,
                    }
                    : project
            )
        );
    };

    return (
        <>
            <MainLayout>
                <div
                    style={{
                        display: "grid",

                        gridTemplateColumns:
                            "repeat(3, 1fr)",

                        gap: "24px",
                    }}
                >
                    <AllProjectsCard
                        projects={projects}
                        onNewProject={() =>
                            setShowProjectModal(true)
                        }
                        onTogglePin={handleTogglePin}
                        onToggleComplete={handleToggleComplete}
                        onDeleteProject={handleDeleteProject}
                        onEditProject={handleEditProject}
                        onClearAll={handleClearAllProjects}
                        onViewProject={setSelectedProjectId}
                    />

                    <CompletedProjectsCard
                        projects={projects}
                        onClearAll={handleClearAllCompleted}
                        onToggleComplete={handleToggleComplete}
                        onDeleteProject={handleDeleteProject}
                        onViewProject={setSelectedProjectId}
                    />

                    <PinnedProjectsCard
                        projects={projects}
                        onTogglePin={handleTogglePin}
                        onToggleComplete={handleToggleComplete}
                        onUnpinAll={handleUnpinAllProjects}
                        onDeleteProject={handleDeleteProject}
                        onEditProject={handleEditProject}
                        onViewProject={setSelectedProjectId}
                    />

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onView={() =>
                                setSelectedProjectId(project.id)
                            }
                            onTogglePin={handleTogglePin}
                            onToggleComplete={handleToggleComplete}
                            onEditProject={handleEditProject}
                            onDeleteProject={handleDeleteProject}
                        />
                    ))}

                    {selectedProject && (
                        <ViewProjectModal
                            project={selectedProject}
                            onClose={() =>
                                setSelectedProjectId(null)
                            }
                            onTogglePin={handleTogglePin}
                            onToggleComplete={handleToggleComplete}
                            onEditProject={handleEditProject}
                        />
                    )}
                </div>
            </MainLayout>

            {showProjectModal && (
                <ProjectModal
                    mode={
                        editingProject
                            ? "edit"
                            : "create"
                    }
                    project={editingProject}
                    onClose={() => {
                        setShowProjectModal(false);

                        setEditingProject(null);
                    }}
                    onSave={(projectData) => {
                        if (editingProject) {
                            setProjects((prev) =>
                                prev.map((project) =>
                                    project.id ===
                                        editingProject.id
                                        ? {
                                            ...project,
                                            ...projectData,
                                        }
                                        : project
                                )
                            );
                        } else {
                            setProjects((prev) => [
                                {
                                    id: Date.now(),
                                    ...projectData,
                                },
                                ...prev,
                            ]);
                        }

                        setShowProjectModal(false);

                        setEditingProject(null);
                    }}
                />
            )}
        </>
    );
}

export default Projects;