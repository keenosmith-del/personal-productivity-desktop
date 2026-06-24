import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  X,
  Calendar,
} from "lucide-react";

import MiniCalendarModal from "../MiniCalendarModal";

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

  const [activeSelector, setActiveSelector] =
    useState(null);

  const [showCalendarModal, setShowCalendarModal] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState(
      task?.dueDate || null
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

      dueDate: selectedDate,

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
      "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

    border:
      "1px solid rgba(255,255,255,0.12)",

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
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "0.95rem",
                fontWeight: "400",
              }}
            >
              {mode === "edit"
                ? "Edit Task"
                : "New Task"}
            </h2>

            <p
              style={{
                marginTop: "4px",
                marginBottom: 0,
                fontSize: "0.8rem",
                fontWeight: "300",
                opacity: 0.55,
              }}
            >
              {mode === "edit"
                ? "Update task information"
                : "Create a new task"}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",

              borderRadius: "999px",

              border:
                "1px solid rgba(255,255,255,0.08)",

              background:
                "rgba(255,255,255,0.04)",

              color:
                "var(--text-secondary)",

              cursor: "pointer",

              fontSize: "0.85rem",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.10)";

              e.currentTarget.style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.04)";

              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            x
          </button>
        </div>

        {/* AVATAR */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",

              borderRadius: "50%",

              background:
                "rgba(255,255,255,0.05)",

              border:
                "1px solid rgba(255,255,255,0.08)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "1.4rem",
              fontWeight: "300",
            }}
          >
            ✓
          </div>
        </div>

        {/* CHIPS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "22px",
            position: "relative",
            fontWeight: "300",
          }}
        >
          <button
            onClick={() =>
              setActiveSelector(
                activeSelector === "category"
                  ? null
                  : "category"
              )
            }
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.7rem",
              cursor: "pointer",

              background:
                category === "Work"
                  ? "#063f4733"
                  : category === "Study"
                    ? "#29737633"
                    : category === "Personal"
                      ? "#5c939633"
                      : "#10343933",

              border:
                category === "Work"
                  ? "1px solid #063f4766"
                  : category === "Study"
                    ? "1px solid #29737666"
                    : category === "Personal"
                      ? "1px solid #5c939666"
                      : "1px solid #10343966",

              color: "var(--text-primary)",
            }}
          >
            {category}
          </button>

          {activeSelector === "category" && (
            <div
              style={{
                position: "absolute",
                top: "34px",

                background:
                  "rgba(20,20,20,0.95)",

                backdropFilter: "blur(20px)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius: "16px",

                padding: "8px",

                display: "flex",
                flexDirection: "column",
                gap: "4px",

                zIndex: 20,
              }}
            >
              {[
                "Work",
                "Study",
                "Personal",
                "Health",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setCategory(option);
                    setActiveSelector(null);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",

                    color:
                      "var(--text-primary)",

                    padding: "8px 12px",

                    borderRadius: "10px",

                    cursor: "pointer",

                    textAlign: "left",

                    fontSize: "0.8rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() =>
              setActiveSelector(
                activeSelector === "priority"
                  ? null
                  : "priority"
              )
            }
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.7rem",
              cursor: "pointer",

              background:
                priority === "High"
                  ? "#ab313033"
                  : priority === "Medium"
                    ? "#62929e33"
                    : "#ffdb5833",

              border:
                priority === "High"
                  ? "1px solid #ab313066"
                  : priority === "Medium"
                    ? "1px solid #62929e66"
                    : "1px solid #ffdb5866",

              color: "var(--text-primary)",
            }}
          >
            {priority}
          </button>

          {activeSelector === "priority" && (
            <div
              style={{
                position: "absolute",

                top: "34px",

                background:
                  "rgba(20,20,20,0.95)",

                backdropFilter: "blur(20px)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius: "16px",

                padding: "8px",

                display: "flex",
                flexDirection: "column",

                gap: "4px",

                zIndex: 20,
              }}
            >
              {[
                "Low",
                "Medium",
                "High",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPriority(option);
                    setActiveSelector(null);
                  }}
                  style={{
                    background: "transparent",

                    border: "none",

                    color:
                      "var(--text-primary)",

                    padding: "8px 12px",

                    borderRadius: "10px",

                    cursor: "pointer",

                    textAlign: "left",

                    fontSize: "0.8rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() =>
              setActiveSelector(
                activeSelector === "status"
                  ? null
                  : "status"
              )
            }
            style={{
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "0.7rem",
              cursor: "pointer",

              background:
                status === "In Progress"
                  ? "#e9b95733"
                  : "#4d689333",

              border:
                status === "In Progress"
                  ? "1px solid #e9b95766"
                  : "1px solid #4d689366",

              color: "var(--text-primary)",
            }}
          >
            {status}
          </button>

          {activeSelector === "status" && (
            <div
              style={{
                position: "absolute",

                top: "34px",

                background: "rgba(20,20,20,0.95)",

                backdropFilter: "blur(20px)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                borderRadius: "16px",

                padding: "8px",

                display: "flex",
                flexDirection: "column",

                gap: "4px",

                zIndex: 20,
              }}
            >
              {[
                "Active",
                "In Progress",
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStatus(option);
                    setActiveSelector(null);
                  }}
                  style={{
                    background: "transparent",

                    border: "none",

                    color:
                      "var(--text-primary)",

                    padding: "8px 12px",

                    borderRadius: "10px",

                    cursor: "pointer",

                    textAlign: "left",

                    fontSize: "0.8rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MARK COMPLETE PILL */}
        {mode === "edit" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {!task.completed ? (
              <button
                style={{
                  alignSelf: "center",

                  padding: "10px 18px",

                  borderRadius: "999px",

                  background:
                    "rgba(114,138,110,0.12)",

                  border:
                    "1px solid rgba(114,138,110,0.25)",

                  color: "#9bc091",

                  fontSize: "0.8rem",

                  fontWeight: "300",

                  cursor: "pointer",

                  marginBottom: "20px",
                }}
              >
                Mark Complete
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",

                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",

                    padding: "12px",

                    borderRadius: "14px",

                    background:
                      "rgba(114,138,110,0.10)",

                    border:
                      "1px solid rgba(114,138,110,0.18)",

                    fontSize: "0.8rem",

                    fontWeight: "300",
                  }}
                >
                  ✓ Completed
                </div>

                <button
                  style={{
                    alignSelf: "center",

                    padding: "10px 18px",

                    borderRadius: "999px",

                    background:
                      "rgba(255,255,255,0.08)",

                    border:
                      "1px solid rgba(255,255,255,0.10)",

                    color:
                      "var(--text-primary)",

                    fontSize: "0.8rem",

                    fontWeight: "300",

                    cursor: "pointer",
                  }}
                >
                  Restore Task
                </button>
              </div>
            )}
          </div>
        )
        }

        {/* TASK NAME */}
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

            color: "var(--text-primary)",

            fontSize: "1.05rem",

            fontWeight: "300",

            letterSpacing: "-0.02em",

            padding: "0 0 12px 0",

            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        {/* DESCRIPTION */}
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",

              opacity: 0.45,

              fontWeight: "300",

              marginBottom: "8px",
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

              background: "transparent",

              border: "none",

              outline: "none",

              resize: "none",

              color: "var(--text-primary)",

              fontFamily: "inherit",

              fontSize: "0.9rem",

              fontWeight: "300",
            }}
          />
        </div>

        {/* DIVIDER */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* DATE */}
        <div
          style={{
            marginBottom: "8px",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              opacity: 0.45,
              fontWeight: "300",
              marginBottom: "8px",
            }}
          >
            Due Date
          </p>

          <div
            onClick={() =>
              setShowCalendarModal(true)
            }
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems: "center",

              cursor: "pointer",

              padding: "8px 0",

              transition:
                "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity =
                "0.75";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity =
                "1";
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: "300",

                color:
                  !selectedDate
                    ? "var(--text-secondary)"
                    : "var(--text-primary)",
              }}
            >
              {selectedDate
                ? new Date(
                  selectedDate
                ).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )
                : "Choose a date"}
            </span>

            <Calendar
              size={16}
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "24px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "11px 18px",

              borderRadius: "999px",

              background:
                "rgba(255,77,77,0.12)",

              border:
                "1px solid rgba(255,77,77,0.25)",

              color: "var(--danger)",

              fontSize: "0.8rem",

              fontWeight: "300",

              cursor: "pointer",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,77,77,0.20)";

              e.currentTarget.style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,77,77,0.12)";

              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: "11px 18px",

              borderRadius: "999px",

              background:
                "rgba(255,255,255,0.08)",

              border:
                "1px solid rgba(255,255,255,0.10)",

              color:
                "var(--text-primary)",

              fontSize: "0.8rem",

              fontWeight: "300",

              cursor: "pointer",

              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.14)";

              e.currentTarget.style.transform =
                "translateY(-1px)";

              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";

              e.currentTarget.style.transform =
                "translateY(0)";

              e.currentTarget.style.border =
                "1px solid rgba(255,255,255,0.10)";
            }}
          >
            {mode === "edit"
              ? "Save"
              : "Create"}
          </button>
        </div>
      </div>
      {showCalendarModal && (
        <MiniCalendarModal
          selectedDate={selectedDate}
          onSelectDate={(date) =>
            setSelectedDate(date)
          }
          onClose={() =>
            setShowCalendarModal(false)
          }
        />
      )
      }
    </div >
  );
}

export default TaskModal;