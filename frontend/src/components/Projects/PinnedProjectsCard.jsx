import GlassCard from "../GlassCard";

import {
    Pin,
    Pencil,
    Trash2,
} from "lucide-react";

function PinnedProjectsCard({
    projects,
    onTogglePin,
    onToggleComplete,
    onDeleteProject,
    onEditProject,
    onViewProject,
    onShowUnpinModal,
}) {
    const pinnedProjects = projects.filter(
        (project) => project.pinned
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
                        Pinned Projects
                    </h2>

                    <button
                        onClick={onShowUnpinModal}
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "999px",
                            padding: "8px 14px",

                            color:
                                pinnedProjects.length === 0
                                    ? "rgba(255,255,255,0.25)"
                                    : "var(--text-secondary)",

                            fontSize: "0.8rem",
                            fontWeight: "300",

                            cursor:
                                pinnedProjects.length === 0
                                    ? "not-allowed"
                                    : "pointer",

                            opacity:
                                pinnedProjects.length === 0
                                    ? 0.5
                                    : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (pinnedProjects.length === 0)
                                return;

                            e.currentTarget.style.color =
                                "var(--text-primary)";

                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            if (pinnedProjects.length === 0)
                                return;

                            e.currentTarget.style.color =
                                "var(--text-secondary)";

                            e.currentTarget.style.background =
                                "transparent";
                        }}
                    >
                        Unpin all
                    </button>
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
                    {pinnedProjects.length === 0 ? (
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.85rem",
                                padding: "24px 0",
                            }}
                        >
                            No pinned projects.
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
                                {pinnedProjects.length} Pinned
                            </p>

                            {/* ROWS */}
                            {pinnedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    onClick={() => onViewProject(project.id)}
                                    style={{
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        display: "flex",

                                        cursor: "pointer",

                                        padding: "8px 12px",

                                        borderRadius: "12px",

                                        transition: "all 0.2s ease",
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
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <Pin
                                                size={15}
                                                strokeWidth={1.5}
                                                fill={
                                                    project.pinned
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                                style={{
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease",
                                                    flexShrink: 0,
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color =
                                                        "#F5F5F5";

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

                                                    onTogglePin(project.id);
                                                }}
                                            />

                                            {/* CIRCLE DIV */}
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    onToggleComplete(project.id);
                                                }}
                                                style={{
                                                    cursor: "pointer",

                                                    width: "18px",
                                                    height: "18px",

                                                    borderRadius: "50%",

                                                    border:
                                                        "1.5px solid rgba(245,245,245,0.7)",

                                                    background:
                                                        project.completed
                                                            ? "rgba(245,245,245,0.75)"
                                                            : "transparent",

                                                    transition: "all 0.2s ease",

                                                    flexShrink: 0,

                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",

                                                    fontSize: "12px",
                                                    fontWeight: "600",

                                                    color: "#1a1d29",
                                                }}
                                            >
                                                {project.completed && "✓"}
                                            </div>

                                            <p
                                                style={{
                                                    fontWeight: "300",
                                                }}
                                            >
                                                {project.title}
                                            </p>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "12px",
                                            }}
                                        >
                                            <Pencil
                                                size={16}
                                                strokeWidth={1.5}
                                                style={{
                                                    cursor: "pointer",
                                                    transition:
                                                        "all 0.2s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color =
                                                        "#F5F5F5";

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

                                                    onEditProject(project);
                                                }}
                                            />

                                            <Trash2
                                                size={16}
                                                strokeWidth={1.5}
                                                style={{
                                                    cursor: "pointer",
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
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    onDeleteProject(project.id);
                                                }}
                                            />
                                        </div>
                                    </>
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
        </GlassCard >
    );
}

export default PinnedProjectsCard;