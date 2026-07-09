// create and edit goal

import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  Calendar,
  Ellipsis,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import MiniCalendarModal from "../MiniCalendarModal";
import DeleteConfirmModal from "../DeleteConfirmModal";

function GoalModal({
  onClose,
  mode = "create",
  goal = null,
  onSave,
  onCompleteGoal,
  onDelete,
  initialDate,
}) {
  const goalInputRef = useRef(null);

  const categoryRef = useRef(null);

  const priorityRef = useRef(null);

  const statusRef = useRef(null);

  const [goalName,
    setGoalName] =
    useState(
      goal?.title || ""
    );

  const [description,
    setDescription] =
    useState(
      goal?.description || ""
    );

  const [priority, setPriority] =
    useState(
      goal?.priority ||
      "Medium"
    );

  const [category, setCategory] =
    useState(
      goal?.category ||
      "Personal"
    );

  const [status, setStatus] =
    useState(
      goal?.status ||
      "Active"
    );

  const [completed, setCompleted] =
    useState(
      goal?.completed ||
      false
    );

  const [activeSelector, setActiveSelector] =
    useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showCalendarModal, setShowCalendarModal] =
    useState(false);

  const [titleFocused,
    setTitleFocused] =
    useState(false);

  const [descriptionFocused,
    setDescriptionFocused] =
    useState(false);

  const [titleError, setTitleError] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState(
      goal?.dueDate ||
      initialDate ||
      new Date().toISOString()
    );

  const [linkedItems, setLinkedItems] =
    useState(
      goal?.linkedItems?.length
        ? goal.linkedItems
        : ["NL"]
    );

  const [showCloseButton, setShowCloseButton] =
    useState(false);

  useEffect(() => {
    goalInputRef.current?.focus();
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
    goal?.createdAt
      ? new Date(
        goal.createdAt
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
    goal?.completedDate
      ? new Date(goal.completedDate)
        .toLocaleDateString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )
      : null;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(selectedDate);

  dueDate.setHours(0, 0, 0, 0);

  const isOverdue =
    dueDate < today;

  const displayStatus =
    completed
      ? "Completed"
      : status === "Paused"
        ? "Paused"
        : isOverdue
          ? "Overdue"
          : status;

  const handleModalOverlayClick = () => {
    if (showCalendarModal) {
      return;
    }

    onClose();
  };

  const associationOptions = [
    "G", // goal
    "P", // project
    "N", // note
    "R", // reminder
    "T", // task 
    "A", // alarm
    "NL", //none
  ];

  const handleSave = () => {
    if (!goalName.trim()) {
      setTitleError(true);

      goalInputRef.current?.focus();

      setTimeout(() => {
        setTitleError(false);
      }, 400);

      return;
    }

    onSave({
      id:
        goal?.id ||
        Date.now(),

      title: goalName,

      description,

      priority,

      category,

      status,

      dueDate: selectedDate,

      linkedItems,

      completed,

      pendingCompletion:
        false,

      completedDate:
        completed
          ? (
            goal?.completedDate ||
            new Date()
          )
          : null,
    });

    onClose();
  };

  const toggleStyle = (
    active
  ) => ({
    width: "46px",
    height: "26px",

    borderRadius: "999px",

    background: active
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.03)",

    border: active
      ? "1px solid rgba(255,255,255,0.12)"
      : "1px solid rgba(255,255,255,0.06)",

    position: "relative",

    cursor: "pointer",

    transition:
      "all 0.25s ease",

    backdropFilter:
      "blur(20px)",
  });

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
      {!showDeleteConfirm && (
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
          {/*TOP ROW*/}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              marginBottom: "24px",
            }}
          >

            {/* meatball and x pill - changed to only x */}
            {/* close x */}
            <div
              style={{
                position: "relative",
              }}
              onMouseEnter={() =>
                setShowCloseButton(true)
              }
              onMouseLeave={() =>
                setShowCloseButton(false)
              }
            >
              <button
                onClick={() => {
                  onClose();
                }}
                style={{
                  width: "30px",
                  height: "30px",

                  borderRadius: "999px",

                  border: "none",

                  background:
                    "rgba(255,255,255,0.04)",

                  color:
                    "var(--text-secondary)",

                  cursor: "pointer",

                  fontSize: "0.8rem",

                  transition: "all 0.2s ease",

                  opacity: showCloseButton ? 1 : 0,

                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgb(33, 33, 33)";

                  e.currentTarget.style.transform =
                    "translateY(-1px)";

                  e.currentTarget.style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgb(33, 33, 33)";

                  e.currentTarget.style.transform =
                    "translateY(0)";

                  e.currentTarget.style.color =
                    "var(--text-secondary)";
                }}
              >
                x
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >

            {/* TITLE */}
            <input
              ref={goalInputRef}
              value={goalName}
              onChange={(e) =>
                setGoalName(e.target.value)
              }

              placeholder="Goal"

              style={{
                background: "transparent",

                border: "none",

                outline: "none",

                textAlign: "center",

                color:
                  "var(--text-primary)",

                fontSize: "2rem",

                fontWeight: "300",

                letterSpacing: "-0.04em",

                marginBottom: "16px",
              }}
            />

            {/* DESCRITION */}
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              placeholder="Add description..."

              rows={2}

              style={{
                background: "transparent",

                border: "none",

                outline: "none",

                resize: "none",

                textAlign: "center",

                color:
                  "var(--text-secondary)",

                fontSize: "0.9rem",

                fontWeight: "300",

                lineHeight: 1.5,

                marginBottom: "28px",
              }}
            />

            {/* ASSOCIATIONS */}
            <div
              style={{
                display: "flex",

                justifyContent: "center",

                gap: "8px",

                marginBottom: "28px",
              }}
            >
              {associationOptions.map(
                (item) => {
                  const selected =
                    linkedItems.includes(
                      item
                    );

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === "NL") {
                          setLinkedItems(["NL"]);
                          return;
                        }

                        setLinkedItems((prev) => {
                          const withoutNL =
                            prev.filter(
                              (i) => i !== "NL"
                            );

                          if (
                            withoutNL.includes(item)
                          ) {
                            const next =
                              withoutNL.filter(
                                (i) => i !== item
                              );

                            return next.length
                              ? next
                              : ["NL"];
                          }

                          return [
                            ...withoutNL,
                            item,
                          ];
                        });
                      }}
                      style={{
                        width: "34px",
                        height: "34px",

                        borderRadius: "999px",

                        border: "1px solid rgba(255,255,255,0.06)",

                        background:
                          selected
                            ? "rgba(87, 112, 122, 0.35)"
                            : "rgba(87, 112, 112, 0.1)",

                        color:
                          "var(--text-secondary)",

                        cursor: "pointer",

                        fontSize: "0.68rem",

                        fontWeight: "300",

                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected) {
                          e.currentTarget.style.background =
                            "rgba(87, 112, 122, 0.35)";
                        }

                        e.currentTarget.style.transform =
                          "translateY(-1px) scale(1.08)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.12)";

                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.25)";

                        e.currentTarget.style.color =
                          "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) {
                          e.currentTarget.style.background =
                            "rgba(87, 112, 112, 0.1)";
                        }

                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.06)";

                        e.currentTarget.style.boxShadow =
                          "none";

                        e.currentTarget.style.color =
                          "var(--text-secondary)";
                      }}
                    >
                      {item}
                    </button>
                  );
                }
              )}
            </div>

            {/* DETAILS */}
            <div
              onClick={() =>
                setShowDetails(!showDetails)
              }
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                cursor: "pointer",

                padding: "10px 0",

                marginBottom: "2px",
              }}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "300",

                  color:
                    "var(--text-secondary)",
                }}
              >
                Details
              </span>

              {showDetails ? (
                <ChevronUp
                  size={16}
                  strokeWidth={1.5}
                />
              ) : (
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                />
              )}
            </div>

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
              {showDetails && (
                <>
                  {/* CATEGORY */}
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
                        padding: "8px 12px",

                        borderRadius: "999px",

                        background:
                          "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                        border: "1px solid rgba(255,255,255,0.06)",

                        color:
                          "var(--text-secondary)",

                        fontSize: "0.75rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-1px) scale(1.06)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.12)";

                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.25)";

                        e.currentTarget.style.color =
                          "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.06)";

                        e.currentTarget.style.boxShadow =
                          "none";

                        e.currentTarget.style.color =
                          "var(--text-secondary)";
                      }}
                    >
                      {category}
                    </button>

                    {activeSelector === "category" && (
                      <div
                        style={{
                          width: "150px",

                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: 0,

                          background:
                            "rgba(20, 20, 20, 0)",

                          // needs to blur content behind drop down
                          backdropFilter: "blur(20px)",

                          border:
                            "1px solid rgba(255,255,255,0.10)",

                          boxShadow:
                            "0 20px 50px rgba(0,0,0,0.35)",

                          borderRadius: "18px",

                          padding: "8px",

                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",

                          zIndex: 2001,
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
                                  ? "rgba(255,255,255,0.05)"
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
                              e.currentTarget.style.background =
                                option === category
                                  ? "rgba(255,255,255,0.05)"
                                  : "transparent",

                                e.currentTarget.style.transform =
                                "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                option === category
                                  ? "rgba(255,255,255,0.05)"
                                  : "transparent",

                                e.currentTarget.style.transform =
                                "translateX(0)";
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PRIORITY */}
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
                        padding: "8px 14px",

                        borderRadius: "999px",

                        background:
                          "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        color:
                          "var(--text-secondary)",

                        fontSize: "0.75rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-1px) scale(1.06)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.12)";

                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.25)";

                        e.currentTarget.style.color =
                          "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.06)";

                        e.currentTarget.style.boxShadow =
                          "none";

                        e.currentTarget.style.color =
                          "var(--text-secondary)";
                      }}
                    >
                      {priority}
                    </button>

                    {activeSelector === "priority" && (
                      <div
                        style={{
                          width: "150px",

                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: 0,

                          background:
                            "rgba(20, 20, 20, 0)",

                          // needs to blur content behind drop down
                          backdropFilter:
                            "blur(20px)",

                          border:
                            "1px solid rgba(255,255,255,0.10)",

                          boxShadow:
                            "0 20px 50px rgba(0,0,0,0.35)",

                          borderRadius: "18px",

                          padding: "8px",

                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",

                          zIndex: 2001,
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
                                  ? "rgba(255,255,255,0.05)"
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
                              e.currentTarget.style.background =
                                option === priority
                                  ? "rgba(255,255,255,0.05)"
                                  : "transparent",

                                e.currentTarget.style.transform =
                                "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                option === priority
                                  ? "rgba(255,255,255,0.05)"
                                  : "transparent",

                                e.currentTarget.style.transform =
                                "translateX(0)";
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* STATUS */}
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
                        padding: "8px 12px",

                        borderRadius: "999px",

                        background:
                          "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        color:
                          "var(--text-secondary)",

                        fontSize: "0.75rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-1px) scale(1.06)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.12)";

                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(0,0,0,0.25)";

                        e.currentTarget.style.color =
                          "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";

                        e.currentTarget.style.border =
                          "1px solid rgba(255,255,255,0.06)";

                        e.currentTarget.style.boxShadow =
                          "none";

                        e.currentTarget.style.color =
                          "var(--text-secondary)";
                      }}
                    >
                      {displayStatus}
                    </button>

                    {activeSelector === "status" && (
                      <div
                        style={{
                          width: "150px",

                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: 0,

                          background:
                            "rgba(20, 20, 20, 0)",

                          // needs to blur content behind drop down
                          backdropFilter:
                            "blur(20px)",

                          border:
                            "1px solid rgba(255,255,255,0.10)",

                          boxShadow:
                            "0 20px 50px rgba(0,0,0,0.35)",

                          borderRadius: "18px",

                          padding: "8px",

                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",

                          zIndex: 2001,
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

                              if (
                                option !==
                                "Completed"
                              ) {
                                setCompleted(false);
                              }

                              setActiveSelector(null);
                            }}
                            style={{
                              background:
                                option === status
                                  ? "rgba(255,255,255,0.05)"
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
                              e.currentTarget.style.background =
                                option === status
                                  ? "rgba(255,255,255,0.05)"
                                  : "transparent",

                                e.currentTarget.style.transform =
                                "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                option === status
                                  ? "rgba(255,255,255,0.05)"
                                  : "transparent",

                                e.currentTarget.style.transform =
                                "translateX(0)";
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* completed */}
            <div
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                marginTop: "0px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "300",

                  color:
                    "var(--text-secondary)",
                }}
              >
                Completed
              </span>

              <div
                onClick={() => {
                  const nextCompleted =
                    !completed;

                  setCompleted(
                    nextCompleted
                  );

                  if (nextCompleted) {
                    setStatus(
                      "Completed"
                    );
                  } else {
                    setStatus(
                      "Active"
                    );
                  }
                }}
                style={toggleStyle(
                  completed
                )}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",

                    borderRadius: "50%",

                    background:
                      "rgba(255,255,255,0.9)",

                    position: "absolute",

                    top: "3px",

                    left: completed
                      ? "23px"
                      : "3px",

                    transition:
                      "all 0.25s ease",

                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.25)",
                  }}
                />
              </div>
            </div>

            {/* DATE */}
            <div
              style={{
                marginBottom: 0,
              }}
            >

              <div
                onClick={() =>
                  setShowCalendarModal(true)
                }
                style={{
                  display: "flex",

                  justifyContent:
                    "center",

                  alignItems: "center",

                  fontSize: "0.78rem",
                  opacity: 0.55,
                  fontWeight: "300",

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
                  Due{" "}

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
              </div>
            </div>

            {formattedCreatedDate && (
              <p
                style={{
                  fontSize: "0.72rem",

                  opacity: 0.35,

                  marginBottom: "8px",

                  textAlign: "center",
                }}
              >
                Created
                {" "}
                {formattedCreatedDate}
              </p>
            )}
          </div>

          {completed && (
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
              Completed on{" "}
              {formattedCompletedDate ||
                new Date().toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "24px",
            }}
          >
            {mode === "edit" && (
              <button
                onClick={() =>
                  setShowDeleteConfirm(true)
                }
                style={{
                  padding: "8px 14px",

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
                Delete
              </button>
            )}

            <button
              onClick={handleSave}
              style={{
                padding: "8px 14px",

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
      )}
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
      )}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          title="Delete goal?"
          message="This action cannot be undone."

          onCancel={() => {
            setShowDeleteConfirm(false);
          }}

          onConfirm={async () => {
            await onDelete(goal._id);

            setShowDeleteConfirm(false);

            onClose();
          }}
        />
      )}
    </div >
  );
}

export default GoalModal;