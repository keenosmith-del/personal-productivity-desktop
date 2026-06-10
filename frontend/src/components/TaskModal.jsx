import {
  useState,
  useRef,
  useEffect
} from "react";

import SegmentedControl from "./SegmentedControl";

import {
  X,
  Calendar,
} from "lucide-react";

function TaskModal({
  onClose,
  mode = "create",
  task = null,
}) {
  const taskInputRef = useRef(null);

  const [priority, setPriority] =
    useState("Medium");

  const [showCalendar, setShowCalendar] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("Choose a date");

  useEffect(() => {
    taskInputRef.current?.focus();
  }, []);

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

            justifyContent:
              "space-between",

            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "400",
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
          ref={taskInputRef}
          placeholder="Task name"
          style={inputStyle}
        />

        <textarea
          rows={4}
          placeholder="Notes (optional)"
          style={{
            ...inputStyle,

            resize: "none",

            fontFamily:
              "inherit",
          }}
        />

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
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "Low",
                color: "#5e4348",
              },
              {
                name: "Medium",
                color: "#774e4a",
              },
              {
                name: "High",
                color: "#592f30",
              },
            ].map((item) => (
              <div
                key={item.name}
                onClick={() =>
                  setPriority(item.name)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",

                  cursor: "pointer",

                  opacity:
                    priority === item.name
                      ? 1
                      : 0.55,

                  transition:
                    "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (
                    priority !== item.name
                  ) {
                    e.currentTarget.style.opacity =
                      "0.85";

                    e.currentTarget.style.transform =
                      "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    priority !== item.name
                  ) {
                    e.currentTarget.style.opacity =
                      "0.55";

                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",

                    borderRadius: "50%",

                    background:
                      item.color,

                    opacity:
                      priority === item.name
                        ? 1
                        : 0.65,
                  }}
                />

                <span
                  style={{
                    fontWeight: "300",

                    fontSize: "0.9rem",

                    color:
                      priority === item.name
                        ? "var(--text-primary)"
                        : "rgba(255,255,255,0.65)",

                    transition:
                      "all 0.2s ease",
                  }}
                >
                  {item.name}
                </span>
              </div>
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

            padding: "14px 18px",

            background:
              "rgba(255,255,255,0.05)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "16px",

            cursor: "pointer",

            transition:
              "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.05)";
          }}
        >
          <span
            style={{
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
              background:
                "rgba(255,255,255,0.04)",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: "20px",

              padding: "20px",

              marginTop: "-8px",
            }}
          >
            <p
              style={{
                marginBottom: "16px",

                fontWeight: "400",

                textAlign: "center",
              }}
            >
              June 2026
            </p>

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(7, 1fr)",

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
                      background:
                        "transparent",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      borderRadius: "10px",

                      padding: "10px",

                      color:
                        "var(--text-primary)",

                      cursor: "pointer",

                      transition:
                        "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "transparent";
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
              padding: "14px 18px",

              background: "transparent",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: "16px",

              color: "#ff6b6b",

              cursor: "pointer",

              fontWeight: "400",

              transition:
                "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,107,107,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "transparent";
            }}
          >
            Cancel
          </button>

          <button
            style={{
              padding: "14px 18px",

              background:
                "var(--glass-bg)",

              border:
                "1px solid var(--glass-border)",

              borderRadius: "16px",

              color:
                "var(--text-primary)",

              cursor: "pointer",

              fontWeight: "400",

              transition:
                "var(--transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "var(--glass-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "var(--glass-bg)";
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