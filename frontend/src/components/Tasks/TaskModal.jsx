import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  X,
  Calendar,
} from "lucide-react";

function TaskModal({
  onClose,
  mode = "create",
  task = null,
  onSave,
}) {
  const taskInputRef = useRef(null);

  const [taskName,
    setTaskName] =
    useState(
      task?.title || ""
    );

  const [description,
    setDescription] =
    useState(
      task?.description || ""
    );

  const [priority, setPriority] =
    useState(
      task?.priority ||
      "Medium"
    );

  const [category, setCategory] =
    useState(
      task?.category ||
      "Personal"
    );

  const [status, setStatus] =
    useState(
      task?.status ||
      "Active"
    );

  const [showCalendar, setShowCalendar] =
    useState(false);

  const [selectedDate,
    setSelectedDate] =
    useState(
      task?.dueDate ||
      "Choose a date"
    );

  useEffect(() => {
    taskInputRef.current?.focus();
  }, []);

  const handleSave = () => {
    if (!taskName.trim())
      return;

    onSave({
      id:
        task?.id ||
        Date.now(),

      title: taskName,

      description,

      priority,

      category,

      status,

      dueDate:
        selectedDate ===
          "Choose a date"
          ? "Today"
          : selectedDate,

      completed:
        task?.completed ||
        false,

      pendingCompletion:
        false,

      completedDate:
        task?.completedDate ||
        null,
    });

    onClose();
  };

  const inputStyle = {
    width: "100%",

    padding: "14px 18px",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "16px",

    color:
      "var(--text-primary)",

    fontSize: "0.95rem",

    outline: "none",
  };

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

            justifyContent: "space-between",

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
              ? "Edit Task"
              : "New Task"}
          </h2>

          <X
            size={18}
            strokeWidth={1.5}
            style={{
              cursor: "pointer",

              transition:
                "all 0.2s ease",
            }}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity =
                "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity =
                "1";
            }}
          />
        </div>

        <input
          value={taskName}

          onChange={(e) =>
            setTaskName(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
          ref={taskInputRef}
          placeholder="Task name"
          style={{
            width: "100%",

            background: "transparent",

            border: "none",

            outline: "none",

            color:
              "var(--text-primary)",

            fontSize: "1.2rem",

            fontWeight: "300",

            letterSpacing: "-0.03em",

            padding: "0 0 12px 0",

            borderBottom:
              "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div
          style={{
            padding: "18px 0",

            borderBottom:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              marginBottom: "12px",

              fontSize: "0.85rem",

              color:
                "var(--text-secondary)",
            }}
          >
            Notes
          </p>

          <textarea
            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={3}
            placeholder="Write any additional details..."
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

        {/* CHIPS */}
        <div>
          <p
            style={{
              marginBottom: "10px",

              color: "var(--text-secondary)",

              fontSize: "0.85rem",

              fontWeight: "300",
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
                bg: "#063f4733",
                border: "#063f4766",
              },
              {
                name: "Study",
                bg: "#29737633",
                border: "#29737666",
              },
              {
                name: "Personal",
                bg: "#5c939633",
                border: "#5c939666",
              },
              {
                name: "Health",
                bg: "#10343933",
                border: "#10343966",
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

                  fontSize: "0.75rem",

                  cursor: "pointer",

                  transition:
                    "all 0.2s ease",

                  background:
                    category === item.name
                      ? item.bg
                      : "transparent",

                  border:
                    category === item.name
                      ? `1px solid ${item.border}`
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

              color:
                "var(--text-secondary)",

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
              flexWrap: "wrap",
            }}
          >
            {[
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

                  fontSize: "0.75rem",

                  cursor: "pointer",

                  transition: "all 0.2s ease",

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
                onMouseEnter={(e) => {
                  if (
                    priority !== item.name
                  ) {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    priority !== item.name
                  ) {
                    e.currentTarget.style.background =
                      "transparent";
                  }
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

              fontWeight: "400",
            }}
          >
            Status
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
                name: "Active",
                color: "#4d6893",
              },
              {
                name: "In Progress",
                color: "#e9b957",
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

                  fontSize: "0.75rem",

                  cursor: "pointer",

                  transition:
                    "all 0.2s ease",

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
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",

              border: "1px solid rgba(255,255,255,0.08)",

              borderRadius: "999px",

              padding: "8px 14px",

              color: "#ff6b6b",

              fontSize: "0.85rem",

              fontWeight: "400",

              cursor: "pointer",

              transition: "all 0.2s ease",
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
            // might revert
            onClick={handleSave}
            style={{
              background: "transparent",

              border: "1px solid rgba(255,255,255,0.08)",

              borderRadius: "999px",

              padding: "8px 14px",

              color: "var(--text-secondary)",

              fontSize: "0.85rem",

              fontWeight: "400",

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
            {mode === "edit"
              ? "Save Changes"
              : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;