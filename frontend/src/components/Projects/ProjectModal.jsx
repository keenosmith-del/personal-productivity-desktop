// create and edit project

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

function ProjectModal({
  onClose,
  mode = "create",
  project = null,
  onSave,
  onCompleteProject,
  onDelete,
  initialDate,
}) {
  const projectInputRef = useRef(null);

  const categoryRef = useRef(null);

  const priorityRef = useRef(null);

  const statusRef = useRef(null);

  const [projectName,
    setProjectName] =
    useState(
      project?.title || ""
    );

  const [description,
    setDescription] =
    useState(
      project?.description || ""
    );

  const [priority, setPriority] =
    useState(
      project?.priority ||
      "Medium"
    );

  const [category, setCategory] =
    useState(
      project?.category ||
      "Personal"
    );

  const [status, setStatus] =
    useState(
      project?.status ||
      "Active"
    );

  const [completed, setCompleted] =
    useState(
      project?.completed ||
      false
    );

  const [activeSelector, setActiveSelector] =
    useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
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
      project?.dueDate ||
      initialDate ||
      new Date().toISOString()
    );

  const [linkedItems, setLinkedItems] =
    useState(
      project?.linkedItems?.length
        ? project.linkedItems
        : ["NL"]
    );

  useEffect(() => {
    projectInputRef.current?.focus();
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
    project?.createdAt
      ? new Date(
        project.createdAt
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
    project?.completedDate
      ? new Date(project.completedDate)
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
    "NL", //none
  ];

  const handleSave = () => {
    if (!projectName.trim()) {
      setTitleError(true);

      projectInputRef.current?.focus();

      setTimeout(() => {
        setTitleError(false);
      }, 400);

      return;
    }

    onSave({
      id:
        project?.id ||
        Date.now(),

      title: projectName,

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
            project?.completedDate ||
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

            {/* meatball and x pill*/}
            <div
              style={{
                display: "flex",
                alignItems: "center",

                gap: "6px",

                padding: "2px",

                borderRadius: "999px",

                background: "rgb(36, 36, 36)",

                backdropFilter: "blur(28px)",

                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* meatball */}
              <div
                style={{
                  position: "relative",
                }}
                onClick={() =>
                  setShowMoreMenu(
                    !showMoreMenu
                  )
                }
              >
                <button
                  style={{
                    width: "32px",

                    height: "32px",

                    borderRadius: "999px",

                    border: "none",

                    background: "transparent",

                    color: "var(--text-secondary)",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    cursor: "pointer",

                    transition:
                      "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-1px)";

                    e.currentTarget.style.color =
                      "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.color =
                      "var(--text-secondary)";
                  }}
                >
                  <Ellipsis
                    size={16}
                  />
                </button>
              </div>
              {/* meatball drop down */}
              {showMoreMenu && (
                <div
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                  style={{
                    position: "absolute",

                    top: "24px",
                    right: 0,

                    minWidth: "140px",

                    background:
                      "rgba(20,20,20,0.95)",

                    backdropFilter:
                      "blur(20px)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    borderRadius: "16px",

                    overflow: "hidden",

                    zIndex: 100,
                  }}
                >
                  {mode === "edit" ? (
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true)
                        setShowMoreMenu(false);
                      }}
                      style={{
                        width: "100%",

                        padding: "10px 12px",

                        background: "transparent",

                        border: "none",

                        borderRadius: "10px",

                        color: "var(--text-primary)",

                        textAlign: "left",

                        fontSize: "0.8rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",

                        color: "#ff6b6b",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";

                        e.currentTarget.style.color =
                          "#ff6b6b";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "transparent";

                        e.currentTarget.style.color =
                          "#ff6b6b";
                      }}
                    >
                      Delete Project
                    </button>
                  ) : (
                    <div
                      style={{
                        width: "100%",

                        padding: "10px 12px",

                        background: "transparent",

                        border: "none",

                        borderRadius: "10px",

                        color: "var(--text-secondary)",

                        textAlign: "left",

                        fontSize: "0.8rem",

                        fontWeight: "300",

                        opacity: 0.45,

                        cursor: "default",

                        userSelect: "none",

                        transition: "all 0.2s ease",

                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.04)";

                        e.currentTarget.style.color =
                          "var(--text-secondary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "transparent";

                        e.currentTarget.style.color =
                          "var(--text-secondary)";
                      }}
                    >
                      No actions
                    </div>
                  )}
                </div>
              )}
              {/* close x */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    width: "32px",
                    height: "32px",

                    borderRadius: "999px",

                    border: "rgb(33, 33, 33)",

                    background:
                      "rgb(33, 33, 33)",

                    color:
                      "var(--text-secondary)",

                    cursor: "pointer",

                    fontSize: "0.85rem",

                    transition: "all 0.2s ease",
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
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >

            {/* TITLE */}
            <input
              ref={projectInputRef}
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }

              placeholder="Project"

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

                        border: selected
                          ? "1px solid rgba(255,255,255,0.12)"
                          : "1px solid rgba(255,255,255,0.06)",

                        background:
                          selected
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(255,255,255,0.03)",

                        color:
                          "var(--text-secondary)",

                        cursor: "pointer",

                        fontSize: "0.7rem",

                        fontWeight: "300",
                      }}
                    >
                      {item}
                    </button>
                  );
                }
              )}
            </div>

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

                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        background:
                          "rgba(255,255,255,0.03)",

                        color:
                          "var(--text-secondary)",

                        fontSize: "0.75rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",
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
                        padding: "8px 12px",

                        borderRadius: "999px",

                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        background:
                          "rgba(255,255,255,0.03)",

                        color:
                          "var(--text-secondary)",

                        fontSize: "0.75rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",
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

                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        background:
                          "rgba(255,255,255,0.03)",

                        color:
                          "var(--text-secondary)",

                        fontSize: "0.75rem",

                        fontWeight: "300",

                        cursor: "pointer",

                        transition: "all 0.2s ease",
                      }}
                    >
                      {displayStatus}
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
          title="Delete project?"
          message="This action cannot be undone."

          onCancel={() => {
            setShowDeleteConfirm(false);
          }}

          onConfirm={() => {
            onDelete(project._id);

            setShowDeleteConfirm(false);

            onClose();
          }}
        />
      )}
    </div >
  );
}

export default ProjectModal;