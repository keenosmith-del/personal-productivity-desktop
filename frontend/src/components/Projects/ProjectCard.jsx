import GlassCard from "../GlassCard";

function ProjectCard({
    project,
}) {
    const statusColors = {
        Active: "#52677d",

        Completed: "#72715c",

        Paused: "#83545c",

        Archived: "#854c49",
    };

    return (
        <GlassCard minHeight="260px">
            <div
                style={{
                    height: "100%",

                    display: "flex",

                    flexDirection: "column",

                    cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.parentElement.style.background =
                        "rgba(14,17,22,0.75)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.parentElement.style.background =
                        "var(--glass-bg)";
                }}
            >
                <h2
                    style={{
                        fontWeight: "500",

                        fontSize: "1.1rem",

                        marginBottom: "24px",
                    }}
                >
                    {project.title}
                </h2>

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        gap: "12px",

                        color:
                            "var(--text-secondary)",
                    }}
                >
                    <p>
                        {project.tasks} Tasks
                    </p>

                    <p>
                        {project.goals} Goals
                    </p>

                    <p>
                        {project.notes} Notes
                    </p>

                    <p>
                        {project.reminders} Reminders
                    </p>
                </div>

                <div
                    style={{
                        flex: 1,
                    }}
                />

                <div
                    style={{
                        alignSelf:
                            "flex-start",

                        padding:
                            "6px 12px",

                        borderRadius:
                            "999px",

                        background: `${statusColors[
                            project.status
                        ]}20`,

                        border: `1px solid ${statusColors[
                            project.status
                        ]
                            }40`,

                        color:
                            statusColors[
                            project.status
                            ],

                        fontSize:
                            "0.8rem",

                        fontWeight: "400",
                    }}
                >
                    {project.status}
                </div>
            </div>
        </GlassCard>
    );
}

export default ProjectCard;