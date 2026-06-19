import GlassCard from "../GlassCard";

import {
    Pin,
    Pencil,
    Trash2,
    RotateCcw,
} from "lucide-react";

import { useState } from "react";

function CompletedProjectsCard({
    projects,
    onClearAll,
    onToggleComplete,
    onDeleteProject,
    onViewProject,

    setToast,
    setLastDeletedProject,
}) {
    const completedProjects =
        projects.filter(
            (project) => project.completed
        );

    const [hoveredProject, setHoveredProject] = useState(null);

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

                    {/* CLEAR ALL */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                        }}
                    >
                        <button
                            onClick={onClearAll}
                            disabled={
                                completedProjects.length === 0
                            }
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "999px",
                                padding: "8px 14px",

                                color:
                                    completedProjects.length === 0
                                        ? "rgba(255,255,255,0.25)"
                                        : "var(--text-secondary)",

                                fontSize: "0.8rem",
                                fontWeight: "300",

                                cursor:
                                    completedProjects.length === 0
                                        ? "not-allowed"
                                        : "pointer",

                                opacity:
                                    completedProjects.length === 0
                                        ? 0.5
                                        : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (
                                    completedProjects.length === 0
                                )
                                    return;

                                e.currentTarget.style.color =
                                    "var(--text-primary)";

                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";
                            }}
                            onMouseLeave={(e) => {
                                if (
                                    completedProjects.length === 0
                                )
                                    return;

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";

                                e.currentTarget.style.background =
                                    "transparent";
                            }}
                        >
                            Clear All
                        </button>
                    </div>
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
                    {completedProjects.length === 0 ? (
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.85rem",
                                padding: "24px 0",
                            }}
                        >
                            No completed projects.
                        </p>
                    ) : (
                        <>
                            <p
                                style={{
                                    fontWeight: "400",
                                    color: "var(--text-primary)",
                                    marginBottom: "6px",
                                }}
                            >
                                {completedProjects.length} Completed
                            </p>

                            {completedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => onViewProject(project.id)}
                                    style={{
                                        display: "flex",

                                        justifyContent: "space-between",

                                        alignItems: "center",

                                        padding: "8px 12px",

                                        borderRadius: "12px",

                                        transition: "all 0.2s ease",

                                        cursor: "pointer",
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
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                onToggleComplete(project.id);
                                            }}
                                            onMouseEnter={() =>
                                                setHoveredProject(project.id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredProject(null)
                                            }
                                            style={{
                                                cursor: "pointer",

                                                width: "18px",
                                                height: "18px",

                                                borderRadius: "50%",

                                                background:
                                                    hoveredProject === project.id
                                                        ? "rgba(245,245,245,0.75)"
                                                        : "rgba(245,245,245,0.45)",

                                                border:
                                                    hoveredProject === project.id
                                                        ? "1.5px solid rgba(245,245,245,0.75)"
                                                        : "1.5px solid rgba(245,245,245,0.45)",

                                                flexShrink: 0,

                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",

                                                transition: "all 0.2s ease",

                                                fontSize: "12px",
                                                fontWeight: "600",

                                                color: "#1a1d29",
                                            }}
                                        >
                                            {hoveredProject === project.id ? (
                                                <RotateCcw
                                                    size={10}
                                                    strokeWidth={2}
                                                />
                                            ) : (
                                                "✓"
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "2px",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontWeight: "300",
                                                }}
                                            >
                                                {project.title}
                                            </p>

                                            <p
                                                style={{
                                                    fontSize: "0.68rem",
                                                    color: "var(--text-secondary)",
                                                    opacity: 0.75,
                                                }}
                                            >
                                                Completed {project.completedDate}
                                            </p>
                                        </div>

                                        <span
                                            style={{
                                                padding: "4px 8px",
                                                borderRadius: "999px",
                                                fontSize: "0.68rem",
                                                background: "#728a6e33",
                                                border: "1px solid #728a6e66",
                                            }}
                                        >
                                            Completed
                                        </span>
                                    </div>


                                    <Trash2
                                        size={16}
                                        strokeWidth={1.5}
                                        style={{
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
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
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            setLastDeletedProject(project);

                                            onDeleteProject(project.id);

                                            setToast("Project deleted");

                                            setTimeout(() => {
                                                setToast("");
                                            }, 4000);
                                        }}
                                    />
                                </div>
                            ))}
                        </>
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