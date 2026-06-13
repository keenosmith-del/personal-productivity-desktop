import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { Calendar } from "lucide-react";

function ProjectModal({
    onClose,
    mode = "create",
}) {
    const projectInputRef = useRef(null);

    const [category, setCategory] =
        useState("Work");

    const [theme, setTheme] =
        useState("Portfolio");

    const [showCalendar, setShowCalendar] =
        useState(false);

    const [selectedDate, setSelectedDate] =
        useState("Choose a date");

    useEffect(() => {
        projectInputRef.current?.focus();
    }, []);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background:
                    "rgba(0,0,0,0.55)",

                backdropFilter:
                    "blur(12px)",

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

                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                    border:
                        "1px solid rgba(255,255,255,0.10)",

                    borderRadius: "32px",

                    backdropFilter:
                        "blur(30px)",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.35)",

                    padding: "36px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",
                    }}
                >
                    <h2
                        style={{
                            fontWeight: "400",
                            fontSize: "1.4rem",
                        }}
                    >
                        {mode === "edit"
                            ? "Edit Project"
                            : "New Project"}
                    </h2>

                    <X
                        size={18}
                        strokeWidth={1.5}
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    />
                </div>

                <input
                    ref={projectInputRef}
                    placeholder="Project name"
                    style={{
                        width: "100%",

                        background:
                            "transparent",

                        border: "none",

                        outline: "none",

                        color:
                            "var(--text-primary)",

                        fontSize: "1.2rem",

                        fontWeight: "300",

                        letterSpacing:
                            "-0.03em",

                        padding:
                            "0 0 12px 0",

                        borderBottom:
                            "1px solid rgba(255,255,255,0.06)",
                    }}
                />

                <div
                    style={{
                        padding: "18px 0",

                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <p
                        style={{
                            marginBottom: "12px",

                            fontSize: "0.85rem",

                            color: "var(--text-secondary)",
                        }}
                    >
                        Description
                    </p>

                    <textarea
                        rows={3}
                        placeholder="Describe your project..."
                        style={{
                            width: "100%",

                            background:
                                "transparent",

                            border: "none",

                            outline: "none",

                            resize: "none",

                            color:
                                "var(--text-primary)",

                            fontFamily:
                                "inherit",

                            fontSize: "0.95rem",
                        }}
                    />
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "10px",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
                        }}
                    >
                        Category
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            {
                                name: "Work",
                                color: "#1a1d29",
                            },
                            {
                                name: "Study",
                                color: "#3d3f4a",
                            },
                            {
                                name: "Personal",
                                color: "#c59c70",
                            },
                            {
                                name: "Health",
                                color: "#7d8491",
                            },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() =>
                                    setCategory(
                                        item.name
                                    )
                                }
                                style={{
                                    padding:
                                        "6px 12px",

                                    borderRadius:
                                        "999px",

                                    fontSize:
                                        "0.75rem",

                                    cursor:
                                        "pointer",

                                    background:
                                        category ===
                                            item.name
                                            ? `${item.color}33`
                                            : "transparent",

                                    border:
                                        category ===
                                            item.name
                                            ? `1px solid ${item.color}66`
                                            : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        category ===
                                            item.name
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "10px",

                            color:
                                "var(--text-secondary)",

                            fontSize: "0.85rem",
                        }}
                    >
                        Project Theme
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            {
                                name: "Portfolio",
                                color: "#c59c70",
                            },
                            {
                                name: "Productivity",
                                color: "#72715c",
                            },
                            {
                                name: "Business",
                                color: "#83545c",
                            },
                            {
                                name: "Creative",
                                color: "#854c49",
                            },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() =>
                                    setTheme(
                                        item.name
                                    )
                                }
                                style={{
                                    padding:
                                        "6px 12px",

                                    borderRadius:
                                        "999px",

                                    fontSize:
                                        "0.75rem",

                                    cursor:
                                        "pointer",

                                    background:
                                        theme ===
                                            item.name
                                            ? `${item.color}33`
                                            : "transparent",

                                    border:
                                        theme ===
                                            item.name
                                            ? `1px solid ${item.color}66`
                                            : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        theme ===
                                            item.name
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    onClick={() =>
                        setShowCalendar(
                            !showCalendar
                        )
                    }
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",

                        borderRadius: "12px",

                        padding: "18px 12px",

                        borderBottom: "1px solid rgba(255,255,255,0.06)",

                        cursor: "pointer",

                        transition:
                            "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "rgba(255,255,255,0.03)";
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                            "transparent";
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.8rem",

                            color:
                                selectedDate ===
                                    "Choose a date"
                                    ? "var(--text-secondary)"
                                    : "var(--text-primary)",
                        }}
                    >
                        {selectedDate}
                    </span>

                    <Calendar
                        size={16}
                        strokeWidth={1.5}
                    />
                </div>
                {showCalendar && (
                    <div
                        style={{
                            background: "rgba(255,255,255,0.04)",

                            border: "1px solid rgba(255,255,255,0.08)",

                            borderRadius: "20px",

                            padding: "20px",

                            marginTop: "-8px",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: "20px",

                                textAlign: "center",
                            }}
                        >
                            <span
                                style={{
                                    fontWeight: "500",
                                }}
                            >
                                June
                            </span>

                            <span
                                style={{
                                    color:
                                        "var(--text-secondary)",

                                    marginLeft: "6px",
                                }}
                            >
                                2026
                            </span>
                        </div>
                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns:
                                    "repeat(7, 1fr)",

                                marginBottom: "12px",

                                gap: "6px",
                            }}
                        >
                            {[
                                "M",
                                "T",
                                "W",
                                "T",
                                "F",
                                "S",
                                "S",
                            ].map((day) => (
                                <div
                                    key={day}
                                    style={{
                                        textAlign: "center",

                                        fontSize: "0.75rem",

                                        color:
                                            "var(--text-secondary)",
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns: "repeat(7, 1fr)",

                                gap: "8px",
                            }}
                        >
                            {[9, 10, 11, 12, 13, 14, 15].map(
                                (day) => (
                                    <button
                                        key={day}
                                        onClick={() => {
                                            setSelectedDate(
                                                `June ${day}, 2026`
                                            );

                                            setShowCalendar(
                                                false
                                            );
                                        }}
                                        style={{
                                            width: "34px",

                                            height: "34px",

                                            borderRadius: "50%",

                                            background:
                                                selectedDate ===
                                                    `June ${day}, 2026`
                                                    ? "#52677d"
                                                    : "transparent",

                                            border: "none",

                                            color:
                                                selectedDate ===
                                                    `June ${day}, 2026`
                                                    ? "#fff"
                                                    : "var(--text-primary)",

                                            cursor: "pointer",

                                            margin: "0 auto",

                                            transition:
                                                "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (
                                                selectedDate !==
                                                `June ${day}, 2026`
                                            ) {
                                                e.currentTarget.style.background =
                                                    "rgba(255,255,255,0.05)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (
                                                selectedDate !==
                                                `June ${day}, 2026`
                                            ) {
                                                e.currentTarget.style.background =
                                                    "transparent";
                                            }
                                        }}
                                    >
                                        {day}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}

                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "flex-end",

                        gap: "12px",
                    }}
                >
                    <button
                        onClick={onClose}
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
                        Cancel
                    </button>

                    <button
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
                                "var(--text-secondary)",

                            cursor:
                                "pointer",
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
                        {mode === "edit"
                            ? "Save Changes"
                            : "Create Project"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;