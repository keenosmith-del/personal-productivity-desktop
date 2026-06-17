import MainLayout from "../layouts/MainLayout";

import AllProjectsCard from "../components/Projects/AllProjectsCard";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";

import { useState } from "react";
import { initialProjects } from "../data/projects";

function Projects() {
    const [showProjectModal,
        setShowProjectModal] =
        useState(false);

    const [projects, setProjects] =
        useState(initialProjects);

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
                    />

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                        />
                    ))}
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