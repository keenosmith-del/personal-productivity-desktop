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

function ReminderModal({
  onClose,
  mode = "create",
  reminder = null,
  onSave,
  onCompleteReminder,
}) {
  const reminderInputRef = useRef(null);

  const categoryRef = useRef(null);

  const priorityRef = useRef(null);

  const statusRef = useRef(null);

  const [reminderName,
    setReminderName] =
    useState(
      reminder?.title || ""
    );

  const [description,
    setDescription] =
    useState(
      reminder?.description || ""
    );

  const [priority, setPriority] =
    useState(
      reminder?.priority ||
      "Medium"
    );

  const [category, setCategory] =
    useState(
      reminder?.category ||
      "Personal"
    );

  const [status, setStatus] =
    useState(
      reminder?.status ||
      "Active"
    );

  const [activeSelector, setActiveSelector] =
    useState(null);

  const [showCalendarModal, setShowCalendarModal] =
    useState(false);

  const [titleFocused,
    setTitleFocused] =
    useState(false);

  const [descriptionFocused,
    setDescriptionFocused] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState(
      reminder?.dueDate || new Date().toISOString()
    );

  useEffect(() => {
    reminderInputRef.current?.focus();
  }, []);

  {/* outside-click of chip dropdown */ }
  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        categoryRef.current &&
        categoryRef.current.contains(
          event.target
        )
      ) {
        return;
      }

      if (
        priorityRef.current &&
        priorityRef.current.contains(
          event.target
        )
      ) {
        return;
      }

      if (
        statusRef.current &&
        statusRef.current.contains(
          event.target
        )
      ) {
        return;
      }

      setActiveSelector(null);
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const formattedCreatedDate =
    reminder?.createdAt
      ? new Date(
        reminder.createdAt
      ).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
      : null;

  const formattedCompletedDate =
    reminder?.completedDate
      ? new Date(reminder.completedDate)
        .toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )
      : null;

  const handleModalOverlayClick = () => {
    if (showCalendarModal) {
      return;
    }

    onClose();
  };

  const handleSave = () => {
    if (!reminderName.trim())
      return;

    onSave({
      id:
        reminder?.id ||
        Date.now(),

      title: reminderName,

      description,

      priority,

      category,

      status,

      dueDate: selectedDate,

      completed:
        reminder?.completed ||
        false,

      pendingCompletion:
        false,

      completedDate:
        reminder?.completedDate ||
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
      onClick={handleModalOverlayClick}
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

          borderRadius: "36px",

          backdropFilter: "blur(30px)",

          boxShadow:
            "0 30px 80px rgba(0,0,0,0.45)",

          padding: "36px",

          display: "flex",

          flexDirection: "column",

          // gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
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
                ? "Edit Reminder"
                : "New Reminder"}
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
                ? "Update reminder information"
                : "Create a new reminder"}
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >

          {/* AVATAR */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "18px",
            }}
          >
            {/* AVATAR CIRCLE */}
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

          {mode === "edit" &&
            formattedCreatedDate && (
              <p
                style={{
                  marginTop: "12px",

                  marginBottom: "10px",

                  textAlign: "center",

                  fontSize: "0.72rem",

                  fontWeight: "300",

                  opacity: 0.4,
                }}
              >
                Created on {formattedCreatedDate}
              </p>
            )}

          {formattedCompletedDate && (
            <p
              style={{
                marginTop: 0,

                marginBottom: "20px",

                textAlign: "center",

                fontSize: "0.72rem",

                fontWeight: "300",

                opacity: 0.4,
              }}
            >
              Completed on{formattedCompletedDate}
            </p>
          )}

          {/* CHIPS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "22px",
              fontWeight: "300",
            }}
          >

            {/* Start wrapper category dropdown and button */}
            <div
              ref={categoryRef}
              style={{
                position: "relative",
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
                  padding: "6px 12px",
                  minWidth: "78px",
                  textAlign: "center",

                  fontWeight: "300",
                  fontSize: "0.75rem",

                  borderRadius: "999px",
                  cursor: "pointer",

                  background:
                    category === "Work"
                      ? "#466a6d33"
                      : category === "Study"
                        ? "#536b8333"
                        : category === "Personal"
                          ? "#6f5f7a33"
                          : "#57707a33",

                  border:
                    category === "Work"
                      ? "1px solid #466a6d66"
                      : category === "Study"
                        ? "1px solid #536b8366"
                        : category === "Personal"
                          ? "1px solid #6f5f7a66"
                          : "1px solid #57707a66",

                  color: "var(--text-primary)",
                }}
              >
                {category}
              </button>

              {activeSelector === "category" && (
                <div
                  style={{
                    width: "110px",

                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,

                    background:
                      "rgba(20,20,20,0.92)",

                    backdropFilter:
                      "blur(24px)",

                    border:
                      "1px solid rgba(255,255,255,0.10)",

                    boxShadow:
                      "0 20px 50px rgba(0,0,0,0.35)",

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
                        background:
                          option === category
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",

                        border: "none",

                        color:
                          "var(--text-primary)",

                        padding: "8px 12px",

                        borderRadius: "10px",

                        cursor: "pointer",

                        textAlign: "left",

                        fontSize: "0.75rem",
                      }}
                      onMouseEnter={(e) => {
                        if (
                          (activeSelector === "category" &&
                            option !== category) ||
                          (activeSelector === "priority" &&
                            option !== priority) ||
                          (activeSelector === "status" &&
                            option !== status)
                        ) {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const isSelected =
                          option === category ||
                          option === priority ||
                          option === status;

                        e.currentTarget.style.background =
                          isSelected
                            ? "rgba(255,255,255,0.08)"
                            : "transparent";
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* end category button and dropdown wrapper */}

            {/* start wrapper priority button and dropdown */}
            <div
              ref={priorityRef}
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setActiveSelector(
                    activeSelector === "priority"
                      ? null
                      : "priority"
                  )
                }
                style={{
                  padding: "6px 12px",
                  minWidth: "78px",
                  textAlign: "center",

                  fontSize: "0.75rem",
                  fontWeight: "300",

                  borderRadius: "999px",
                  cursor: "pointer",

                  background:
                    priority === "Low"
                      ? "#273c4133"
                      : priority === "Medium"
                        ? "#5e687433"
                        : "#6b544733",

                  border:
                    priority === "Low"
                      ? "1px solid #273c4166"
                      : priority === "Medium"
                        ? "1px solid #5e687466"
                        : "1px solid #6b544766",

                  color: "var(--text-primary)",
                }}
              >
                {priority}
              </button>

              {activeSelector === "priority" && (
                <div
                  style={{
                    width: "110px",

                    position: "absolute",

                    top: "calc(100% + 8px)",

                    left: 0,

                    background:
                      "rgba(20,20,20,0.92)",

                    backdropFilter:
                      "blur(24px)",

                    border:
                      "1px solid rgba(255,255,255,0.10)",

                    boxShadow:
                      "0 20px 50px rgba(0,0,0,0.35)",

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
                        background:
                          option === priority
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",

                        border: "none",

                        color:
                          "var(--text-primary)",

                        padding: "8px 12px",

                        borderRadius: "10px",

                        cursor: "pointer",

                        textAlign: "left",

                        fontSize: "0.75rem",
                      }}
                      onMouseEnter={(e) => {
                        if (
                          (activeSelector === "category" &&
                            option !== category) ||
                          (activeSelector === "priority" &&
                            option !== priority) ||
                          (activeSelector === "status" &&
                            option !== status)
                        ) {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const isSelected =
                          option === category ||
                          option === priority ||
                          option === status;

                        e.currentTarget.style.background =
                          isSelected
                            ? "rgba(255,255,255,0.08)"
                            : "transparent";
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* end priority button and dropdown */}

            {/* start status button and dropdown wrapper */}
            <div
              ref={statusRef}
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setActiveSelector(
                    activeSelector === "status"
                      ? null
                      : "status"
                  )
                }
                style={{
                  padding: "6px 12px",
                  minWidth: "78px",
                  textAlign: "center",

                  fontSize: "0.75rem",
                  fontWeight: "300", 

                  borderRadius: "999px",
                  cursor: "pointer",

                  background:
                    status === "Active"
                      ? "#4d689333"
                      : status === "Paused"
                        ? "#45575b33"
                        : "#728a6e33",

                  border:
                    status === "Active"
                      ? "1px solid #4d689366"
                      : status === "Paused"
                        ? "1px solid #45575b66"
                        : "1px solid #728a6e66",

                  color: "var(--text-primary)",
                }}
              >
                {status}
              </button>

              {activeSelector === "status" && (
                <div
                  style={{
                    width: "110px",

                    position: "absolute",

                    top: "calc(100% + 8px)",

                    left: 0,

                    background:
                      "rgba(20,20,20,0.92)",

                    backdropFilter:
                      "blur(24px)",

                    border:
                      "1px solid rgba(255,255,255,0.10)",

                    boxShadow:
                      "0 20px 50px rgba(0,0,0,0.35)",

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
                    "Paused",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatus(option);
                        setActiveSelector(null);
                      }}
                      style={{
                        background:
                          option === status
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",

                        border: "none",

                        color:
                          "var(--text-primary)",

                        padding: "8px 12px",

                        borderRadius: "10px",

                        cursor: "pointer",

                        textAlign: "left",

                        fontSize: "0.75rem",
                      }}
                      onMouseEnter={(e) => {
                        if (
                          (activeSelector === "category" &&
                            option !== category) ||
                          (activeSelector === "priority" &&
                            option !== priority) ||
                          (activeSelector === "status" &&
                            option !== status)
                        ) {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const isSelected =
                          option === category ||
                          option === priority ||
                          option === status;

                        e.currentTarget.style.background =
                          isSelected
                            ? "rgba(255,255,255,0.08)"
                            : "transparent";
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* end wrapper status and dropdown */}
          </div>

          {/* MARK COMPLETE PILL */}
          {/* COMPLETION */}

          {mode === "edit" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              {!reminder?.completed ? (
                <button
                  onClick={() =>
                    onCompleteReminder?.(reminder)
                  }
                  style={{
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

                    transition:
                      "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  Mark Complete
                </button>
              ) : (
                <button
                  style={{
                    padding: "10px 18px",

                    borderRadius: "999px",

                    background: "rgba(114,138,110,0.12)",

                    border:
                      "1px solid rgba(114,138,110,0.25)",

                    color: "#9bc091",

                    fontSize: "0.8rem",

                    fontWeight: "300",

                    transition: "all 0.2s ease",
                  }}
                >
                  ✓ Completed
                </button>
              )}
            </div>
          )}


          {/* Reminder NAME */}
          <input
            value={reminderName}

            onChange={(e) =>
              setReminderName(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            onFocus={() =>
              setTitleFocused(true)
            }

            onBlur={() =>
              setTitleFocused(false)
            }
            ref={reminderInputRef}
            placeholder="Reminder name"
            style={{
              width: "100%",

              background: "transparent",

              border: "none",

              outline: "none",

              color: "var(--text-primary)",

              fontSize: "1.05rem",

              fontWeight: "300",

              letterSpacing: "-0.02em",

              padding: "0 0 14px 0",

              borderBottom:
                titleFocused
                  ? "1px solid rgba(255,255,255,0.18)"
                  : "1px solid rgba(255,255,255,0.06)",

              transition:
                "all 0.2s ease",

              marginBottom: "20px",
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

                background:
                  descriptionFocused
                    ? "rgba(255,255,255,0.02)"
                    : "transparent",

                borderRadius: "12px",

                padding: "10px 12px",

                transition:
                  "all 0.2s ease",

                border: "none",

                outline: "none",

                resize: "none",

                color: "var(--text-primary)",

                fontFamily: "inherit",

                fontSize: "0.9rem",

                fontWeight: "300",
              }}
              onFocus={() =>
                setDescriptionFocused(true)
              }

              onBlur={() =>
                setDescriptionFocused(false)
              }
            />
          </div>

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.06)",
              marginBottom: "20px",
            }}
          />

          {/* DATE */}
          <div
            style={{
              marginBottom: 0,
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
      {
        showCalendarModal && (
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

export default ReminderModal;