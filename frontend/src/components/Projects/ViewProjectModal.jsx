import { X } from "lucide-react";

import { Pin } from "lucide-react";

function ViewProjectModal({
    project,
    onClose,
    onTogglePin,
    onToggleComplete,
    onEditProject,
    onDeleteProject,
}) {
    if (!project) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.35)",

                backdropFilter: "blur(20px)",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                zIndex: 1000,
            }}
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                style={{
                    width: "500px",

                    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border: "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "32px",

                    backdropFilter: "blur(30px)",

                    boxShadow: "0 30px 80px rgba(0,0,0,0.45)",

                    padding: "36px",
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

                                onTogglePin(project._id);
                            }}
                        />

                        {/* CIRCLE DIV */}
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

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();

                                onToggleComplete(project._id);
                            }}
                        >
                            {project.completed && "✓"}
                        </div>

                        <h2
                            style={{
                                fontWeight: "400",
                            }}
                        >
                            {project.title}
                        </h2>
                    </div>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    />
                </div>

                {/* CONTENTS OF CARD*/}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >

                    {project.description?.trim() && (
                        <div>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    marginBottom: "6px",
                                }}
                            >
                                Description
                            </p>

                            <p>{project.description}</p>
                        </div>
                    )}

                    {/* CHIPS */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                        }}
                    >
                        <span
                            style={{
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "0.75rem",

                                background: "#063f4733",
                                border: "1px solid #063f4766",
                            }}
                        >
                            {project.category}
                        </span>

                        <span
                            style={{
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "0.75rem",

                                background:
                                    project.priority === "High"
                                        ? "#ab313033"
                                        : project.priority === "Medium"
                                            ? "#62929e33"
                                            : "#ffdb5833",

                                border:
                                    project.priority === "High"
                                        ? "1px solid #ab313066"
                                        : project.priority === "Medium"
                                            ? "1px solid #62929e66"
                                            : "1px solid #ffdb5866",
                            }}
                        >
                            {project.priority}
                        </span>
                    </div>

                    <div>
                        <p
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.8rem",
                                marginBottom: "6px",
                            }}
                        >
                            Due Date
                        </p>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <span>{project.dueDate}</span>

                            {!project.completed && (
                                <span
                                    style={{
                                        padding: "4px 10px",
                                        borderRadius: "999px",
                                        fontSize: "0.72rem",

                                        background:
                                            project.status === "Active"
                                                ? "#52677d33"
                                                : project.status === "Completed"
                                                    ? "#72715c33"
                                                    : project.status === "Paused"
                                                        ? "#83545c33"
                                                        : project.status === "Archived"
                                                            ? "#854c4933"
                                                            : project.status === "In Progress"
                                                                ? "#e9b95733"
                                                                : "#ab313033",

                                        border:
                                            project.status === "Active"
                                                ? "1px solid #52677d66"
                                                : project.status === "Completed"
                                                    ? "1px solid #72715c66"
                                                    : project.status === "Paused"
                                                        ? "1px solid #83545c66"
                                                        : project.status === "Archived"
                                                            ? "1px solid #854c4966"
                                                            : project.status === "In Progress"
                                                                ? "1px solid #e9b95766"
                                                                : "1px solid #ab313066",

                                        color:
                                            project.status === "Active"
                                                ? "#52677d"
                                                : project.status === "Completed"
                                                    ? "#72715c"
                                                    : project.status === "Paused"
                                                        ? "#83545c"
                                                        : project.status === "Archived"
                                                            ? "#854c49"
                                                            : project.status === "In Progress"
                                                                ? "#e9b957"
                                                                : "#ab3130",
                                    }}
                                >
                                    {project.status}
                                </span>
                            )}
                        </div>
                    </div>

                    {(
                        project.tasks > 0 ||
                        project.goals > 0 ||
                        project.notes > 0 ||
                        project.reminders > 0
                    ) && (
                            <div>
                                <p
                                    style={{
                                        color:
                                            "var(--text-secondary)",

                                        fontSize:
                                            "0.8rem",

                                        marginBottom:
                                            "10px",
                                    }}
                                >
                                    Linked Items
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "8px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {project.tasks > 0 && (
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "999px",
                                                fontSize: "0.75rem",

                                                background: "#72715c33",
                                                border: "1px solid #72715c66",
                                            }}
                                        >
                                            {project.tasks} Tasks
                                        </span>
                                    )}

                                    {project.goals > 0 && (
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "999px",
                                                fontSize: "0.75rem",

                                                background: "#c59c7033",
                                                border: "1px solid #c59c7066",
                                            }}
                                        >
                                            {project.goals} Goals
                                        </span>
                                    )}

                                    {project.notes > 0 && (
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "999px",
                                                fontSize: "0.75rem",

                                                background: "#52677d33",
                                                border: "1px solid #52677d66",
                                            }}
                                        >
                                            {project.notes} Notes
                                        </span>
                                    )}

                                    {project.reminders > 0 && (
                                        <span
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "999px",
                                                fontSize: "0.75rem",

                                                background: "#83545c33",
                                                border: "1px solid #83545c66",
                                            }}
                                        >
                                            {project.reminders} Reminders
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                    {!project.completed ? (
                        <div>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "0.8rem",
                                    marginBottom: "6px",
                                }}
                            >
                                Progress
                            </p>

                            <div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "8px",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.08)",
                                        overflow: "hidden",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${project.progress}%`,
                                            height: "100%",
                                            background: "#c59c70",
                                        }}
                                    />
                                </div>

                                <p>{project.progress}% Complete</p>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                padding: "14px",
                                borderRadius: "16px",
                                background: "rgba(114,138,110,0.12)",
                                border: "1px solid rgba(114,138,110,0.25)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "500",
                                    marginBottom: "4px",
                                }}
                            >
                                ✓ Project Completed
                            </p>

                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                Completed on {project.completedDate}
                            </p>
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",

                        gap: "12px",

                        marginTop: "12px",
                    }}
                >
                    <button
                        onClick={() => {
                            onDeleteProject(project._id);

                            onClose();
                        }}
                        style={{
                            background:
                                "transparent",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            borderRadius:
                                "999px",

                            padding:
                                "8px 14px",

                            color:
                                "#ff6b6b",

                            cursor:
                                "pointer",
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
                        Delete
                    </button>

                    <button
                        onClick={() => {
                            if (project.completed) {
                                onToggleComplete(project._id);
                            } else {
                                onEditProject(project);
                            }
                        }}
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "999px",
                            padding: "8px 14px",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
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
                        {project.completed
                            ? "Restore Project"
                            : "Edit Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewProjectModal;