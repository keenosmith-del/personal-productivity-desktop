import MainLayout from "../layouts/MainLayout";

import AllProjectsCard from "../components/Projects/AllProjectsCard";
import ProjectCard from "../components/Projects/ProjectCard";

function Projects() {
    const projects = [
        {
            title: "Portfolio Website",
            tasks: 12,
            goals: 3,
            notes: 4,
            reminders: 2,
            status: "Active",
        },

        {
            title: "Productivity App",
            tasks: 8,
            goals: 2,
            notes: 6,
            reminders: 3,
            status: "Active",
        },

        {
            title: "Job Search",
            tasks: 5,
            goals: 1,
            notes: 2,
            reminders: 1,
            status: "Completed",
        },
    ];

    return (
        <MainLayout>
            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(3, 1fr)",

                    gap: "24px",
                }}
            >
                <AllProjectsCard />

                {projects.map((project) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                    />
                ))}
            </div>
        </MainLayout>
    );
}

export default Projects;