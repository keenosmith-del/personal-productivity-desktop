import MainLayout from "../layouts/MainLayout";

import AllProjectsCard from "../components/Projects/AllProjectsCard";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";
import ViewProjectModal from "../components/Projects/ViewProjectModal";
import CompletedProjectsCard from "../components/Projects/CompletedProjectsCard";
import PinnedProjectsCard from "../components/Projects/PinnedProjectsCard";

import { useState } from "react";
import { initialProjects } from "../data/projects";

import Toast from "../components/Toast";

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

    const [toast, setToast] =
        useState("");

    const [
        lastDeletedProject,
        setLastDeletedProject,
    ] = useState(null);

    const [
        showClearProjects,
        setShowClearProjects,
    ] = useState(false);

    const [
        showClearCompletedProjects,
        setShowClearCompletedProjects,
    ] = useState(false);

    const [
        showUnpinProjects,
        setShowUnpinProjects,
    ] = useState(false);

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
                        // onClearAll={handleClearAllProjects}
                        onViewProject={setSelectedProjectId}
                        setToast={setToast}
                        setLastDeletedProject={
                            setLastDeletedProject
                        }
                        onClearAll={() =>
                            setShowClearProjects(true)
                        }
                    />

                    <CompletedProjectsCard
                        projects={projects}
                        onClearAll={() =>
                            setShowClearCompletedProjects(true)
                        }
                        onToggleComplete={handleToggleComplete}
                        onDeleteProject={handleDeleteProject}
                        onViewProject={setSelectedProjectId}

                        setToast={setToast}
                        setLastDeletedProject={setLastDeletedProject}
                    />

                    <PinnedProjectsCard
                        projects={projects}
                        onTogglePin={handleTogglePin}
                        onToggleComplete={handleToggleComplete}
                        onUnpinAll={handleUnpinAllProjects}
                        onDeleteProject={handleDeleteProject}
                        onEditProject={handleEditProject}
                        onViewProject={setSelectedProjectId}
                        onShowUnpinModal={() =>
                            setShowUnpinProjects(true)
                        }
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
                            onDeleteProject={(projectId) => {
                                setLastDeletedProject(project);

                                handleDeleteProject(projectId);

                                
                                setToast("Project deleted");

                                setTimeout(() => {
                                    setToast("");
                                }, 4000);
                            }}


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
                {showClearProjects && (
                    <div
                        onClick={() =>
                            setShowClearProjects(
                                false
                            )
                        }
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(12px)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 2000,
                        }}
                    >
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            style={{
                                width: "400px",
                                padding: "28px",
                                borderRadius: "24px",
                                background: "rgba(20,20,20,0.85)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: "12px",
                                    fontWeight: "400",
                                }}
                            >
                                Clear all projects?
                            </h3>

                            <p
                                style={{
                                    color:
                                        "var(--text-secondary)",
                                    marginBottom: "24px",
                                }}
                            >
                                This action cannot be undone.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "flex-end",
                                    gap: "12px",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        setShowClearProjects(
                                            false
                                        )
                                    }
                                    style={{
                                        background: "transparent",

                                        border: "1px solid rgba(255,255,255,0.08)",

                                        borderRadius: "999px",

                                        padding: "8px 14px",

                                        color: "#ff6b6b",

                                        fontSize: "0.85rem",

                                        fontWeight: "400",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        setProjects([]);

                                        setLastDeletedProject(null);

                                        setToast("Projects cleared");

                                        setTimeout(() => {
                                            setToast("");
                                        }, 3000);

                                        setShowClearProjects(false);
                                    }}

                                    style={{
                                        background: "transparent",

                                        border: "1px solid rgba(255,255,255,0.08)",

                                        borderRadius: "999px",

                                        padding: "8px 14px",

                                        color: "var(--text-secondary)",

                                        fontSize: "0.85rem",

                                        fontWeight: "400",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--text-primary)";

                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--text-secondary)";

                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showClearCompletedProjects && (
                    <div
                        onClick={() =>
                            setShowClearCompletedProjects(
                                false
                            )
                        }
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(12px)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 2000,
                        }}
                    >
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            style={{
                                width: "400px",
                                padding: "28px",
                                borderRadius: "24px",
                                background: "rgba(20,20,20,0.85)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: "12px",
                                    fontWeight: "400",
                                }}
                            >
                                Clear all completed projects?
                            </h3>

                            <p
                                style={{
                                    color:
                                        "var(--text-secondary)",
                                    marginBottom: "24px",
                                }}
                            >
                                This action cannot be undone.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "flex-end",
                                    gap: "12px",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        setShowClearCompletedProjects(
                                            false
                                        )
                                    }
                                    style={{
                                        background: "transparent",

                                        border: "1px solid rgba(255,255,255,0.08)",

                                        borderRadius: "999px",

                                        padding: "8px 14px",

                                        color: "#ff6b6b",

                                        fontSize: "0.85rem",

                                        fontWeight: "400",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleClearAllCompleted();

                                        setToast("Completed projects cleared");

                                        setTimeout(() => {
                                            setToast("");
                                        }, 3000);

                                        setShowClearCompletedProjects(false);
                                    }}

                                    style={{
                                        background: "transparent",

                                        border: "1px solid rgba(255,255,255,0.08)",

                                        borderRadius: "999px",

                                        padding: "8px 14px",

                                        color: "var(--text-secondary)",

                                        fontSize: "0.85rem",

                                        fontWeight: "400",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--text-primary)";

                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--text-secondary)";

                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showUnpinProjects && (
                    <div
                        onClick={() =>
                            setShowUnpinProjects(false)
                        }
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.45)",
                            backdropFilter: "blur(12px)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 2000,
                        }}
                    >
                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            style={{
                                width: "400px",
                                padding: "28px",
                                borderRadius: "24px",
                                background: "rgba(20,20,20,0.85)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: "12px",
                                    fontWeight: "400",
                                }}
                            >
                                Unpin all projects?
                            </h3>

                            <p
                                style={{
                                    color:
                                        "var(--text-secondary)",
                                    marginBottom: "24px",
                                }}
                            >
                                This action cannot be undone.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "flex-end",
                                    gap: "12px",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        setShowUnpinProjects(false)
                                    }
                                    style={{
                                        background: "transparent",

                                        border: "1px solid rgba(255,255,255,0.08)",

                                        borderRadius: "999px",

                                        padding: "8px 14px",

                                        color: "#ff6b6b",

                                        fontSize: "0.85rem",

                                        fontWeight: "400",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        handleUnpinAllProjects();

                                        setToast("Projects unpinned");

                                        setTimeout(() => {
                                            setToast("");
                                        }, 3000);

                                        setShowUnpinProjects(false);
                                    }}

                                    style={{
                                        background: "transparent",

                                        border: "1px solid rgba(255,255,255,0.08)",

                                        borderRadius: "999px",

                                        padding: "8px 14px",

                                        color: "var(--text-secondary)",

                                        fontSize: "0.85rem",

                                        fontWeight: "400",

                                        cursor: "pointer",

                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--text-primary)";

                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.04)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--text-secondary)";

                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Unpin
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Toast
                    message={toast}
                    actionLabel={
                        lastDeletedProject
                            ? "Undo"
                            : null
                    }
                    onAction={() => {
                        if (!lastDeletedProject)
                            return;

                        setProjects((prev) => [
                            lastDeletedProject,
                            ...prev,
                        ]);

                        setLastDeletedProject(null);

                        setToast("");
                    }}
                />
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

                            setToast("Project updated");

                            setTimeout(() => {
                                setToast("");
                            }, 3000);
                        } else {
                            setProjects((prev) => [
                                {
                                    id: Date.now(),
                                    ...projectData,
                                },
                                ...prev,
                            ]);

                            setToast("Project created");

                            setTimeout(() => {
                                setToast("");
                            }, 3000);
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