import GlassCard from "../GlassCard";

import {
    Pin,
    Pencil,
    Trash2,
} from "lucide-react";

function AllProjectsCard({
    projects,
    onNewProject,
}) {
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
                        All Projects
                    </h2>

                    <button
                        onClick={onNewProject}
                        style={{
                            background: "transparent",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "999px",

                            padding: "8px 14px",

                            color: "var(--text-secondary)",

                            fontSize: "0.8rem",

                            fontWeight: "300",

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
                        + New Project
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
                    <p
                        style={{
                            fontWeight: "400",
                            color: "var(--text-primary)",
                            marginBottom: "6px",
                        }}
                    >
                        {projects.length} Projects
                    </p>

                    {/* ROWS */}
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            style={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",

                                cursor: "pointer",

                                padding: "8px 12px",

                                borderRadius: "12px",

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
                                            flexShrink: 0,
                                        }}
                                    />

                                    <div
                                        style={{
                                            width: "18px",
                                            height: "18px",

                                            borderRadius: "50%",

                                            border:
                                                "1.5px solid rgba(245,245,245,0.7)",

                                            background:
                                                project.completed
                                                    ? "rgba(245,245,245,0.75)"
                                                    : "transparent",

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
                                    />
                                </div>
                            </>
                        </div>
                    ))}
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

export default AllProjectsCard;