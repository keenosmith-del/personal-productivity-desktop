import GlassCard from "../GlassCard";

import { Trash2 } from "lucide-react";

function CompletedProjectsCard({
    projects,
}) {
    const completedProjects =
        projects.filter(
            (project) => project.completed
        );

    return (
        <GlassCard minHeight="260px">
            <div
                style={{
                    height: "100%",

                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        marginBottom: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "500",
                            fontSize: "1.1rem",
                        }}
                    >
                        Completed Projects
                    </h2>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",

                        height: "140px",

                        overflowY: "auto",

                        gap: "10px",

                        color:
                            "var(--text-secondary)",

                        paddingRight: "4px",
                    }}
                >
                    <p
                        style={{
                            fontWeight: "400",

                            color:
                                "var(--text-primary)",

                            marginBottom: "6px",
                        }}
                    >
                        {completedProjects.length} Completed
                    </p>

                    {completedProjects.map(
                        (project) => (
                            <div
                                key={project.id}
                                style={{
                                    display: "flex",

                                    justifyContent:
                                        "space-between",

                                    alignItems:
                                        "center",

                                    padding:
                                        "8px 12px",

                                    borderRadius:
                                        "12px",

                                    transition:
                                        "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "transparent";
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",

                                        alignItems:
                                            "center",

                                        gap: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "18px",
                                            height: "18px",

                                            borderRadius:
                                                "50%",

                                            border:
                                                "1.5px solid rgba(245,245,245,0.7)",

                                            background:
                                                "rgba(245,245,245,0.75)",

                                            flexShrink: 0,

                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            fontSize:
                                                "12px",

                                            fontWeight:
                                                "600",

                                            color:
                                                "#1a1d29",
                                        }}
                                    >
                                        ✓
                                    </div>

                                    <p
                                        style={{
                                            fontWeight:
                                                "300",
                                        }}
                                    >
                                        {project.title}
                                    </p>

                                    <span
                                        style={{
                                            padding:
                                                "4px 8px",

                                            borderRadius:
                                                "999px",

                                            fontSize:
                                                "0.68rem",

                                            background:
                                                "#728a6e33",

                                            border:
                                                "1px solid #728a6e66",
                                        }}
                                    >
                                        Completed
                                    </span>
                                </div>

                                <Trash2
                                    size={16}
                                    strokeWidth={1.5}
                                    style={{
                                        cursor:
                                            "pointer",

                                        transition:
                                            "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "#ff6b6b";

                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "";

                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>

                <div
                    style={{
                        flex: 1,
                    }}
                />
            </div>
        </GlassCard>
    );
}

export default CompletedProjectsCard;