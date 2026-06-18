import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { Calendar } from "lucide-react";

function ProjectModal({
    onClose,
    onSave,
    mode = "create",
}) {
    const projectInputRef = useRef(null);

    const [category, setCategory] = useState("Work");

    const [priority, setPriority] =
        useState("Medium");

    const [showCalendar, setShowCalendar] = useState(false);

    const [selectedDate, setSelectedDate] = useState("Choose a date");

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [status, setStatus] =
        useState("Active");

    const [selectedTasks, setSelectedTasks] = useState([]);

    const [selectedGoals, setSelectedGoals] =
        useState([]);

    const [selectedReminders, setSelectedReminders] =
        useState([]);

    const [selectedNotes, setSelectedNotes] =
        useState([]);

    useEffect(() => {
        projectInputRef.current?.focus();
    }, []);

    // dummy data
    const dummyTasks = [
        "Build Dashboard",
        "Fix Login Page",
        "Deploy Backend",
    ];

    const dummyGoals = [
        "Get First Developer Job",
        "Launch Portfolio",
        "Complete AI Course",
    ];

    const dummyReminders = [
        "Apply for Jobs",
        "Submit Assignment",
    ];

    const dummyNotes = [
        "Meeting Notes",
        "Frontend Ideas",
        "Backend Architecture",
        "UI Improvements",
        "Deployment Checklist",
        "API Research",
    ];

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
                    // bigger modal
                    width: "700px",
                    maxHeight: "90vh",
                    overflowY: "auto",

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
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
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
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
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
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Tasks
                    </p>

                    {/* TASK CHIPS BEGIN */}
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {[
                            "None",
                            ...dummyTasks,
                        ].map((task) => (
                            <button
                                key={task}
                                onClick={() => {
                                    if (task === "None") {
                                        setSelectedTasks([]);
                                        return;
                                    }

                                    setSelectedTasks((prev) =>
                                        prev.includes(task)
                                            ? prev.filter(
                                                (t) =>
                                                    t !== task
                                            )
                                            : [
                                                ...prev,
                                                task,
                                            ]
                                    );
                                }}
                                style={{
                                    padding: "6px 12px",

                                    borderRadius: "999px",

                                    flexShrink: 0,

                                    fontSize: "0.75rem",

                                    cursor: "pointer",

                                    transition: "all 0.2s ease",

                                    background:
                                        task === "None"
                                            ? selectedTasks.length ===
                                                0
                                                ? "#013e3733"
                                                : "transparent"
                                            : selectedTasks.includes(
                                                task
                                            )
                                                ? "#72715c33"
                                                : "transparent",

                                    border:
                                        task === "None"
                                            ? selectedTasks.length ===
                                                0
                                                ? "1px solid #013e3766"
                                                : "1px solid rgba(255,255,255,0.08)"
                                            : selectedTasks.includes(
                                                task
                                            )
                                                ? "1px solid #72715c66"
                                                : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        task === "None"
                                            ? selectedTasks.length ===
                                                0
                                                ? "var(--text-primary)"
                                                : "var(--text-secondary)"
                                            : selectedTasks.includes(
                                                task
                                            )
                                                ? "var(--text-primary)"
                                                : "var(--text-secondary)",
                                }}
                            >
                                {task}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "10px",
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Goals
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {["None", ...dummyGoals].map((goal) => (
                            <button
                                key={goal}
                                onClick={() => {
                                    if (goal === "None") {
                                        setSelectedGoals([]);
                                        return;
                                    }

                                    setSelectedGoals((prev) =>
                                        prev.includes(goal)
                                            ? prev.filter(
                                                (g) => g !== goal
                                            )
                                            : [...prev, goal]
                                    );
                                }}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "999px",
                                    flexShrink: 0,
                                    fontSize: "0.75rem",
                                    cursor: "pointer",

                                    background:
                                        goal === "None"
                                            ? selectedGoals.length === 0
                                                ? "#013e3733"
                                                : "transparent"
                                            : selectedGoals.includes(goal)
                                                ? "#c59c7033"
                                                : "transparent",

                                    border:
                                        goal === "None"
                                            ? selectedGoals.length === 0
                                                ? "1px solid #013e3766"
                                                : "1px solid rgba(255,255,255,0.08)"
                                            : selectedGoals.includes(goal)
                                                ? "1px solid #c59c7066"
                                                : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        selectedGoals.includes(goal) ||
                                            (goal === "None" &&
                                                selectedGoals.length === 0)
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "10px",
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Reminder
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {["None", ...dummyReminders].map((reminder) => (
                            <button
                                key={reminder}
                                onClick={() => {
                                    if (reminder === "None") {
                                        setSelectedReminders([]);
                                        return;
                                    }

                                    setSelectedReminders((prev) =>
                                        prev.includes(reminder)
                                            ? prev.filter(
                                                (r) => r !== reminder
                                            )
                                            : [...prev, reminder]
                                    );
                                }}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "999px",
                                    flexShrink: 0,
                                    fontSize: "0.75rem",
                                    cursor: "pointer",

                                    background:
                                        reminder === "None"
                                            ? selectedReminders.length === 0
                                                ? "#013e3733"
                                                : "transparent"
                                            : selectedReminders.includes(reminder)
                                                ? "#83545c66"
                                                : "transparent",

                                    border:
                                        reminder === "None"
                                            ? selectedReminders.length === 0
                                                ? "1px solid #013e3766"
                                                : "1px solid rgba(255,255,255,0.08)"
                                            : selectedReminders.includes(reminder)
                                                ? "1px solid #83545c66"
                                                : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        selectedReminders.includes(reminder) ||
                                            (reminder === "None" &&
                                                selectedReminders.length === 0)
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {reminder}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "10px",
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Notes
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {["None", ...dummyNotes].map((note) => (
                            <button
                                key={note}
                                onClick={() => {
                                    if (note === "None") {
                                        setSelectedNotes([]);
                                        return;
                                    }

                                    setSelectedNotes((prev) =>
                                        prev.includes(note)
                                            ? prev.filter(
                                                (n) => n !== note
                                            )
                                            : [...prev, note]
                                    );
                                }}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "999px",
                                    flexShrink: 0,
                                    fontSize: "0.75rem",
                                    cursor: "pointer",

                                    background:
                                        note === "None"
                                            ? selectedNotes.length === 0
                                                ? "#013e3733"
                                                : "transparent"
                                            : selectedNotes.includes(note)
                                                ? "#52677d33"
                                                : "transparent",

                                    border:
                                        note === "None"
                                            ? selectedNotes.length === 0
                                                ? "1px solid #013e3766"
                                                : "1px solid rgba(255,255,255,0.08)"
                                            : selectedNotes.includes(note)
                                                ? "1px solid #52677d66"
                                                : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        selectedNotes.includes(note) ||
                                            (note === "None" &&
                                                selectedNotes.length === 0)
                                            ? "var(--text-primary)"
                                            : "var(--text-secondary)",
                                }}
                            >
                                {note}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p
                        style={{
                            marginBottom: "10px",
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Category
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {[
                            {
                                name: "Work",
                                color: "#063f47",
                            },
                            {
                                name: "Study",
                                color: "#297376",
                            },
                            {
                                name: "Personal",
                                color: "#5c9396",
                            },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() =>
                                    setCategory(item.name)
                                }
                                style={{
                                    padding: "6px 12px",

                                    borderRadius: "999px",

                                    flexShrink: 0,

                                    fontSize: "0.75rem",

                                    cursor: "pointer",

                                    background:
                                        category === item.name
                                            ? `${item.color}33`
                                            : "transparent",

                                    border:
                                        category === item.name
                                            ? `1px solid ${item.color}66`
                                            : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        category === item.name
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
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Priority
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {[
                            {
                                name: "None",
                                color: "#013e37",
                            },
                            {
                                name: "Low",
                                color: "#ffdb58",
                            },
                            {
                                name: "Medium",
                                color: "#62929e",
                            },
                            {
                                name: "High",
                                color: "#ab3130",
                            },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() =>
                                    setPriority(item.name)
                                }
                                style={{
                                    padding: "6px 12px",

                                    borderRadius: "999px",

                                    flexShrink: 0,

                                    fontSize: "0.75rem",

                                    cursor: "pointer",

                                    background:
                                        priority === item.name
                                            ? `${item.color}33`
                                            : "transparent",

                                    border:
                                        priority === item.name
                                            ? `1px solid ${item.color}66`
                                            : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        priority === item.name
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
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                        }}
                    >
                        Status
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",

                            overflowX: "auto",
                            overflowY: "hidden",

                            flexWrap: "nowrap",

                            paddingBottom: "4px",

                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {[
                            {
                                name: "Active",
                                color: "#4d6893",
                            },
                            {
                                name: "In Progress",
                                color: "#e9b957",
                            },
                            {
                                name: "Overdue",
                                color: "#85222f",
                            },
                            {
                                name: "Complete",
                                color: "#728a6e",
                            },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() =>
                                    setStatus(item.name)
                                }
                                style={{
                                    padding: "6px 12px",

                                    borderRadius: "999px",

                                    flexShrink: 0,

                                    fontSize: "0.75rem",

                                    cursor: "pointer",

                                    background:
                                        status === item.name
                                            ? `${item.color}33`
                                            : "transparent",

                                    border:
                                        status === item.name
                                            ? `1px solid ${item.color}66`
                                            : "1px solid rgba(255,255,255,0.08)",

                                    color:
                                        status === item.name
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
                        onClick={() => {
                            onSave({
                                title,

                                description,

                                category,

                                priority,

                                status,

                                dueDate: selectedDate,

                                selectedTasks,

                                selectedGoals,

                                selectedNotes,

                                selectedReminders,

                                tasks: selectedTasks.length,

                                goals: selectedGoals.length,

                                notes: selectedNotes.length,

                                reminders: selectedReminders.length,

                                progress: 0,
                            });
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
        </div >
    );
}

export default ProjectModal;