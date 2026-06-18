import GlassCard from "../GlassCard";

import {
    Pin,
    Pencil,
    Trash2,
} from "lucide-react";

function ProjectCard({
    project,
    onView,
    onTogglePin,
    onToggleComplete,
}) {
    const statusColors = {
        Active: "#52677d",
        Completed: "#72715c",
        Paused: "#83545c",
        Archived: "#854c49",
        "In Progress": "#e9b957",
        Overdue: "#ab3130",
    };

    return (
        <GlassCard minHeight="260px">
            <div
                onClick={onView}
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        marginBottom: "24px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Pin
                            size={16}
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

                        <h2
                            style={{
                                fontWeight: "500",
                                fontSize: "1.1rem",
                            }}
                        >
                            {project.title}
                        </h2>
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
                                transition: "all 0.2s ease",
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
                            }}
                        />

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
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        fontSize: "0.72rem",
                        color: "var(--text-secondary)",
                        fontWeight: "300",
                        marginBottom: "16px",
                    }}
                >
                    {project.dueDate}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        marginBottom: "20px",
                    }}
                >

                    <span
                        style={{
                            padding: "4px 8px",
                            borderRadius: "999px",
                            fontSize: "0.68rem",

                            background:
                                project.category === "Work"
                                    ? "#063f4733"
                                    : project.category ===
                                        "Study"
                                        ? "#29737633"
                                        : project.category ===
                                            "Personal"
                                            ? "#5c939633"
                                            : "#10343933",

                            border:
                                project.category === "Work"
                                    ? "1px solid #063f4766"
                                    : project.category ===
                                        "Study"
                                        ? "1px solid #29737666"
                                        : project.category ===
                                            "Personal"
                                            ? "1px solid #5c939666"
                                            : "1px solid #10343966",
                        }}
                    >
                        {project.category}
                    </span>

                    <span
                        style={{
                            padding: "4px 8px",
                            borderRadius: "999px",
                            fontSize: "0.68rem",

                            background:
                                project.priority === "High"
                                    ? "#ab313033"
                                    : project.priority ===
                                        "Medium"
                                        ? "#62929e33"
                                        : "#ffdb5833",

                            border:
                                project.priority === "High"
                                    ? "1px solid #ab313066"
                                    : project.priority ===
                                        "Medium"
                                        ? "1px solid #62929e66"
                                        : "1px solid #ffdb5866",
                        }}
                    >
                        {project.priority}
                    </span>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",

                        marginBottom: "20px",
                    }}
                >
                    {project.tasks > 0 && (
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#72715c33",
                                border: "1px solid #72715c66",
                            }}
                        >
                            {project.tasks} Task{project.tasks !== 1 ? "s" : ""}
                        </span>
                    )}

                    {project.goals > 0 && (
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#c59c7033",
                                border: "1px solid #c59c7066",
                            }}
                        >
                            {project.goals} Goal{project.goals !== 1 ? "s" : ""}
                        </span>
                    )}

                    {project.notes > 0 && (
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#52677d33",
                                border: "1px solid #52677d66",
                            }}
                        >
                            {project.notes} Note{project.notes !== 1 ? "s" : ""}
                        </span>
                    )}

                    {project.reminders > 0 && (
                        <span
                            style={{
                                padding: "4px 8px",
                                borderRadius: "999px",
                                fontSize: "0.68rem",
                                background: "#83545c33",
                                border: "1px solid #83545c66",
                            }}
                        >
                            {project.reminders} Reminder{project.reminders !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                <>
                    <div
                        style={{
                            flex: 1,
                        }}
                    />

                    <div
                        style={{
                            marginBottom: "16px",
                        }}
                    >
                        <div
                            style={{
                                height: "8px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.08)",

                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width:
                                        `${project.progress}%`,

                                    height: "100%",

                                    background:
                                        "#c59c70",

                                    borderRadius:
                                        "999px",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                marginTop: "6px",

                                fontSize: "0.7rem",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {project.progress}% Complete
                        </div>
                    </div>
                </>

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