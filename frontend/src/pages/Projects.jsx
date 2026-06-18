import MainLayout from "../layouts/MainLayout";

import AllProjectsCard from "../components/Projects/AllProjectsCard";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";
import ViewProjectModal from "../components/Projects/ViewProjectModal";

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

    const handleToggleComplete = (projectId) => {
        setProjects((prev) =>
            prev.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        completed: !project.completed,
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
                        />
                    ))}

                    {selectedProject && (
                        <ViewProjectModal
                            project={selectedProject}
                            onClose={() =>
                                setSelectedProjectId(null)
                            }
                            onTogglePin={handleTogglePin}
                            onToggleComplete={
                                handleToggleComplete
                            }
                        />
                    )}
                </div>
            </MainLayout>

            {showProjectModal && (
                <ProjectModal
                    onClose={() =>
                        setShowProjectModal(false)
                    }
                    onSave={(project) => {
                        setProjects((prev) => [
                            {
                                id: Date.now(),

                                ...project,
                            },

                            ...prev,
                        ]);

                        setShowProjectModal(false);
                    }}
                />
            )}
        </>
    );
}

export default Projects;