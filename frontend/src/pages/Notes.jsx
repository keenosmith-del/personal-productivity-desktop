import MainLayout from "../layouts/MainLayout";

import { ArrowUpDown, Filter, Trash, Search } from "lucide-react";

import NoteModal from "../components/Notes/NoteModal";
import NoteCard from "../components/Notes/NoteCard";
import NoteDetailsModal from "../components/Notes/NoteDetailsModal";

import { useState, useEffect, useRef } from "react";

import {
  getNotes,
  createNote,
  updateNote,
  clearAllNotes,
  clearPinnedNotes,
  deleteNote,
} from "../services/noteService";

import Toast from "../components/Toast";

function Notes() {
  //COMPONENT STATES
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const [showNoteModal, setShowNoteModal] =
    useState(false);

  const [openNoteMenu, setOpenNoteMenu] =
    useState(null);

  const [selectedNote, setSelectedNote] =
    useState(null);

  const [editingNote,
    setEditingNote] =
    useState(null);

  const [notes, setNotes] =
    useState([]);

  const [toast, setToast] =
    useState("");

  const [completionTimeout,
    setCompletionTimeout] =
    useState(null);

  const [showClearCompleted,
    setShowClearCompleted] =
    useState(false);

  const [showClearActive,
    setShowClearActive] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [showFilterMenu, setShowFilterMenu] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedPriority, setSelectedPriority] =
    useState("All");

  const matchesFilters = (note) => {
    const categoryMatch =
      selectedCategory === "All" ||
      note.category ===
      selectedCategory;

    const priorityMatch =
      selectedPriority === "All" ||
      note.priority ===
      selectedPriority;

    return (
      categoryMatch &&
      priorityMatch
    );
  };

  const matchesSearch = (note) =>
    note.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||

    (note.content || "")
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase());

  const sortNotes = (notesToSort) => {
    return [...notesToSort].sort(
      (a, b) => {
        switch (sortBy) {
          case "oldest":
            return (
              new Date(a.createdAt) -
              new Date(b.createdAt)
            );

          case "priority": {
            const order = {
              High: 0,
              Medium: 1,
              Low: 2,
            };

            return (
              order[a.priority] -
              order[b.priority]
            );
          }

          case "dueDate":
            return (
              new Date(a.dueDate || 0) -
              new Date(b.dueDate || 0)
            );

          case "alphabetical":
            return a.title.localeCompare(
              b.title
            );

          case "newest":
          default:
            return (
              new Date(b.createdAt) -
              new Date(a.createdAt)
            );
        }
      }
    );
  };


  {/* BEGIN NoteS SORT VARIABLES */ }

  const allNotes = sortNotes(
    notes.filter(
      (note) =>
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const activeNotes = sortNotes(
    notes.filter(
      (note) =>
        !note.completed &&
        note.status === "Active" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const inProgressNotes = sortNotes(
    notes.filter(
      (note) =>
        !note.completed &&
        note.status ===
        "In Progress" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const pausedNotes = sortNotes(
    notes.filter(
      (note) =>
        !note.completed &&
        note.status === "Paused" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const completedNotes = sortNotes(
    notes.filter(
      (note) =>
        note.status ===
        "Completed" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  {/* FOCUS TAB Note SORT */ }
  const urgentNotes = sortNotes(
    notes.filter(
      (note) =>
        note.priority === "High" && //
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const flaggedNotes = sortNotes(
    notes.filter(
      (note) =>
        note.flagged &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const likedNotes = sortNotes(
    notes.filter(
      (note) =>
        note.liked &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const discussionNotes = sortNotes(
    notes.filter(
      (note) =>
        note.commentCount > 0 &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  )

  {/* CATEGORIES TAB*/ }
  {/* WORK */ }
  const workNotes = sortNotes(
    notes.filter(
      (note) =>
        note.category === "Work" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  {/* STUDY */ }
  const studyNotes = sortNotes(
    notes.filter(
      (note) =>
        note.category === "Study" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  {/* PERSONAL */ }
  const personalNotes = sortNotes(
    notes.filter(
      (note) =>
        note.category === "Personal" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  {/* HEALTH */ }
  const healthNotes = sortNotes(
    notes.filter(
      (note) =>
        note.category === "Health" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const hasFilters =
    selectedCategory !== "All" ||
    selectedPriority !== "All";

  const totalNotes =
    notes.length;

  // FUNCTIONS
  const loadNotes = async () => {
    try {
      const data =
        await getNotes();

      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(
          event.target
        )
      ) {
        setShowSortMenu(false);
      }

      if (
        filterRef.current &&
        !filterRef.current.contains(
          event.target
        )
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // HANDLERS
  const handleDeleteNote =
    async (noteId) => {
      try {
        await deleteNote(noteId);

        setNotes((prev) =>
          prev.filter(
            (note) =>
              note._id !== noteId
          )
        );

        setToast(
          "Note deleted"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);

        setToast(
          "Failed to delete note"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleCompleteNote =
    async (note) => {
      try {
        const updatedNote =
          await updateNote(
            note._id,
            {
              completed: true,
              status: "Completed",
              completedDate:
                new Date().toLocaleDateString(),
            }
          );

        setNotes((prev) =>
          prev.map((t) =>
            t._id === updatedNote._id
              ? updatedNote
              : t
          )
        );

        setSelectedNote((prev) =>
          prev?._id === updatedNote._id
            ? updatedNote
            : prev
        );

        setEditingNote((prev) =>
          prev?._id === updatedNote._id
            ? updatedNote
            : prev
        );

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to complete note"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleRestoreNote =
    async (note) => {
      try {
        const updatedNote =
          await updateNote(
            note._id,
            {
              completed: false,
              completedDate: null,
              status: "Active",
            }
          );

        setNotes((prev) =>
          prev.map((t) =>
            t._id === updatedNote._id
              ? updatedNote
              : t
          )
        );

        setSelectedNote((prev) =>
          prev?._id === updatedNote._id
            ? updatedNote
            : prev
        );

        setEditingNote((prev) =>
          prev?._id === updatedNote._id
            ? updatedNote
            : prev
        );

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to restore note"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleClearCompletedNotes =
    async () => {
      try {
        await clearCompletedNotes();

        setNotes((prev) =>
          prev.filter(
            (note) =>
              !note.completed
          )
        );

        setToast(
          "Completed notes cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear completed notes"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleToggleFlag =
    async (note) => {
      await updateNote(
        note._id,
        {
          ...note,

          flagged:
            !note.flagged,
        }
      );

      loadNotes();
    };

  const handleToggleLike =
    async (note) => {
      await updateNote(
        note._id,
        {
          ...note,

          liked:
            !note.liked,
        }
      );

      loadNotes();
    };

  const handleAddComment =
    async (note) => {
      await updateNote(
        note._id,
        {
          ...note,

          commentCount:
            (note.commentCount || 0) +
            1,
        }
      );

      loadNotes();
    };

  const handleClearActiveNotes =
    async () => {
      try {
        await clearActiveNotes();

        setNotes((prev) =>
          prev.filter(
            (note) =>
              note.completed
          )
        );

        setToast(
          "Active notes cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear active notes"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const dropdownItemStyle = {
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
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* HEADER */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontWeight: "400",
                    letterSpacing:
                      "-0.03em",
                  }}
                >
                  Notes
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color:
                      "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your notes.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* SEARCH */}
                <div
                  style={{
                    position: "relative",
                    width: "240px",
                  }}
                >
                  <Search
                    size={15}
                    opacity={0.6}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      pointerEvents: "none",
                      color: "var(--text-secondary)",
                    }}
                  />

                  <input
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    placeholder="Search notes..."
                    style={{
                      width: "100%",

                      padding: "10px 16px 12px 42px",

                      borderRadius: "999px",

                      border: searchTerm
                        ? "1px solid rgba(87,112,122,0.55)"
                        : "1px solid rgba(255,255,255,0.06)",

                      background: searchTerm
                        ? "rgba(87,112,122,0.14)"
                        : "rgba(255,255,255,0.04)",

                      boxShadow: searchTerm
                        ? "0 0 0 1px rgba(87,112,122,0.15)"
                        : "none",

                      color: "var(--text-primary)",

                      fontSize: "0.82rem",

                      fontWeight: "300",

                      outline: "none",

                      backdropFilter: "blur(20px)",

                      transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.border =
                        "1px solid rgba(255,255,255,0.18)";

                      e.target.style.background =
                        "rgba(255,255,255,0.06)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border =
                        searchTerm
                          ? "1px solid rgba(87,112,122,0.55)"
                          : "1px solid rgba(255,255,255,0.06)";

                      e.target.style.background =
                        searchTerm
                          ? "rgba(87,112,122,0.14)"
                          : "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>

                {/* SORT */}
                <div
                  ref={sortRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowFilterMenu(false);

                      setShowSortMenu(
                        !showSortMenu
                      );
                    }}
                    style={{
                      padding: "10px 16px",

                      borderRadius: "999px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "rgba(87,112,122,0.10)"
                          : "rgba(255,255,255,0.03)",

                      color:
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",

                      fontSize: "0.82rem",

                      fontWeight: "300",

                      cursor: "pointer",

                      transition:
                        "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)";

                      e.currentTarget.style.color =
                        "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "rgba(87,112,122,0.10)"
                          : "rgba(255,255,255,0.03)";

                      e.currentTarget.style.color =
                        showSortMenu ||
                          sortBy !== "newest"
                          ? "var(--text-primary)"
                          : "var(--text-secondary)";
                    }}
                  >
                    <ArrowUpDown size={15} opacity={0.6} />
                  </button>

                  {showSortMenu && (
                    <div
                      style={{
                        position: "absolute",

                        top: "52px",
                        right: 0,

                        background:
                          "rgba(20,20,20,0.95)",

                        backdropFilter:
                          "blur(20px)",

                        border:
                          "1px solid rgba(255,255,255,0.08)",

                        minWidth: "140px",

                        borderRadius: "16px",

                        overflow: "hidden",

                        zIndex: 100,
                      }}
                    >
                      {[
                        "newest",
                        "oldest",
                        "priority",
                        "dueDate",
                        "alphabetical",
                      ].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortMenu(false);
                          }}
                          style={{
                            ...dropdownItemStyle,

                            background:
                              sortBy === option
                                ? "rgba(255,255,255,0.04)"
                                : "transparent",

                            color:
                              sortBy === option
                                ? "#F5F5F5"
                                : "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                              "#F5F5F5";
                          }}

                          onMouseLeave={(e) => {
                            if (sortBy !== option) {
                              e.currentTarget.style.background =
                                "transparent";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }
                          }}
                        >
                          {option === "dueDate"
                            ? "Due Date"
                            : option ===
                              "alphabetical"
                              ? "A → Z"
                              : option.charAt(0).toUpperCase() +
                              option.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* FILTER */}
                <div
                  ref={filterRef}
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowSortMenu(false);

                      setShowFilterMenu(
                        !showFilterMenu
                      );
                    }}
                    style={{
                      padding: "10px 16px",

                      borderRadius: "999px",

                      border:
                        showFilterMenu ||
                          hasFilters
                          ? "1px solid rgba(87,112,122,0.45)"
                          : "1px solid rgba(255,255,255,0.08)",

                      background:
                        showFilterMenu ||
                          hasFilters
                          ? "rgba(87,112,122,0.16)"
                          : "rgba(255,255,255,0.03)",

                      color:
                        showFilterMenu ||
                          hasFilters
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",

                      fontSize: "0.82rem",

                      fontWeight: "300",

                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)";

                      e.currentTarget.style.color =
                        "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        showFilterMenu ||
                          hasFilters
                          ? "rgba(87,112,122,0.10)"
                          : "rgba(255,255,255,0.03)";

                      e.currentTarget.style.color =
                        showFilterMenu ||
                          hasFilters
                          ? "var(--text-primary)"
                          : "var(--text-secondary)";
                    }}
                  >
                    <Filter size={15} opacity={0.6} />
                  </button>

                  {showFilterMenu && (
                    <div
                      style={{
                        position: "absolute",

                        top: "52px",
                        right: 0,

                        width: "220px",

                        background:
                          "rgba(20,20,20,0.95)",

                        backdropFilter:
                          "blur(20px)",

                        border:
                          "1px solid rgba(255,255,255,0.08)",

                        borderRadius: "16px",

                        padding: "12px",

                        zIndex: 100,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.75rem",
                          opacity: 0.5,
                          marginBottom: "10px",
                        }}
                      >
                        Category
                      </p>

                      {/* CATEGORY OPTIONS */}
                      {[
                        "All",
                        "Work",
                        "Study",
                        "Personal",
                        "Health",
                      ].map((category) => (
                        <button
                          key={category}
                          onClick={() =>
                            setSelectedCategory(category)
                          }
                          style={{
                            ...dropdownItemStyle,

                            background:
                              selectedCategory === category
                                ? "rgba(255,255,255,0.04)"
                                : "transparent",

                            color:
                              selectedCategory === category
                                ? "#F5F5F5"
                                : "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                              "#F5F5F5";
                          }}

                          onMouseLeave={(e) => {
                            if (
                              selectedCategory !== category
                            ) {
                              e.currentTarget.style.background =
                                "transparent";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }
                          }}
                        >
                          {category}
                        </button>
                      ))}

                      <div
                        style={{
                          height: "1px",
                          background:
                            "rgba(255,255,255,0.06)",
                          margin: "14px 0",
                        }}
                      />

                      <p
                        style={{
                          fontSize: "0.75rem",
                          opacity: 0.5,
                          marginBottom: "10px",
                        }}
                      >
                        Priority
                      </p>

                      {[
                        "All",
                        "High",
                        "Medium",
                        "Low",
                      ].map((priority) => (
                        <button
                          key={priority}
                          onClick={() =>
                            setSelectedPriority(
                              priority
                            )
                          }
                          style={{
                            ...dropdownItemStyle,

                            background:
                              selectedPriority === priority
                                ? "rgba(255,255,255,0.04)"
                                : "transparent",

                            color:
                              selectedPriority === priority
                                ? "#F5F5F5"
                                : "var(--text-primary)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";

                            e.currentTarget.style.color =
                              "#F5F5F5";
                          }}

                          onMouseLeave={(e) => {
                            if (
                              selectedPriority !== priority
                            ) {
                              e.currentTarget.style.background =
                                "transparent";

                              e.currentTarget.style.color =
                                "var(--text-primary)";
                            }
                          }}
                        >
                          {priority}
                        </button>
                      ))}
                      <div
                        style={{
                          height: "1px",
                          background:
                            "rgba(255,255,255,0.06)",

                          margin: "14px 0",
                        }}
                      />

                      <button
                        onClick={() => {
                          setSelectedCategory(
                            "All"
                          );

                          setSelectedPriority(
                            "All"
                          );

                          setShowFilterMenu(false);
                        }}
                        style={{
                          width: "100%",

                          background: "none",

                          border: "none",

                          color:
                            "var(--text-secondary)",

                          fontSize: "0.8rem",

                          fontWeight: "300",

                          cursor: "pointer",

                          paddingTop: "6px",

                          transition:
                            "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color =
                            "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color =
                            "var(--text-secondary)";
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
                {/* clear all */}
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    style={{
                      padding: "10px 16px",

                      borderRadius: "999px",

                      border: "1px solid rgba(255, 77, 77, 0.25)",

                      background: "rgba(255, 77, 77, 0.12)",

                      color: "var(--danger)",

                      fontSize: "0.82rem",

                      fontWeight: "300",

                      cursor: "pointer",

                      transition:
                        "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 77, 77, 0.20)";

                      e.currentTarget.style.transform =
                        "translateY(-1px)";
                    }}

                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255, 77, 77, 0.12)";

                      e.currentTarget.style.transform =
                        "translateY(0)";
                    }}
                  >
                    <Trash
                      size={15}
                      opacity={0.6}
                    />
                  </button>
                </div>
              </div>
            </div>

            <p
              style={{
                marginTop: "6px",
                marginBottom: 0,

                fontSize: "0.8rem",

                color: "var(--text-secondary)",

                opacity: 0.65,

                fontWeight: "300",
              }}
            >
              {totalNotes + " Notes" || "No notes yet"}
            </p>
          </div>

          {/* AVATAR */}

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALL NoteS */}
          <div
            style={{
              background: "var(--glass-bg)",

              border:
                "1px solid var(--glass-border)",

              borderRadius:
                "var(--radius-large)",

              backdropFilter:
                "blur(20px)",

              WebkitBackdropFilter:
                "blur(20px)",

              height: "700px",

              display: "flex",

              flexDirection: "column",

              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: "20px 24px",

                borderBottom:
                  "1px solid rgba(255,255,255,0.06)",

                display: "flex",

                justifyContent:
                  "space-between",

                alignItems: "center",

                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "400",
                  }}
                >
                  All Notes
                </div>

                <div
                  style={{
                    fontSize: "0.75rem",

                    opacity: 0.45,

                    marginTop: "4px",
                  }}
                >
                  {notes.length} notes
                </div>
              </div>

              <button
                onClick={() =>
                  setShowNoteModal(
                    true
                  )
                }
                style={{
                  width: "32px",
                  height: "32px",

                  borderRadius:
                    "999px",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.04)",

                  color:
                    "var(--text-primary)",

                  cursor: "pointer",

                  fontSize: "1rem",
                }}
              >
                +
              </button>
            </div>

            {/* GRID */}
            <div
              style={{
                flex: 1,

                overflowY: "auto",

                padding: "24px",

                display: "grid",

                gridTemplateColumns:
                  "repeat(4, 1fr)",

                gap: "18px",

                alignContent: "start",
              }}
            >

              {allNotes.length === 0 ? (
                <div
                  style={{
                    gridColumn: "1 / -1",

                    display: "flex",
                    flexDirection: "column",

                    justifyContent: "center",
                    alignItems: "center",

                    minHeight: "500px",

                    textAlign: "center",

                    color: "var(--text-secondary)",

                    opacity: 0.45,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                    }}
                  >
                    No notes
                  </p>

                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Click + to create one
                    {/* or try searching a different term */}
                  </p>
                </div>
              ) : (
                allNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onClick={setSelectedNote}

                    openNoteMenu={openNoteMenu}
                    setOpenNoteMenu={setOpenNoteMenu}

                    onView={setSelectedNote}
                    onEdit={setEditingNote}

                    onDelete={handleDeleteNote}

                    onComplete={handleCompleteNote}
                    onRestore={handleRestoreNote}

                    onToggleFlag={
                      handleToggleFlag
                    }

                    onToggleLike={
                      handleToggleLike
                    }

                    onAddComment={
                      handleAddComment
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {showNoteModal && (
        <NoteModal
          onClose={() =>
            setShowNoteModal(false)
          }
          onSave={(noteData) => {
            createNote(noteData)
              .then((newNote) => {
                setNotes((prev) => [
                  newNote,
                  ...prev,
                ]);

                setToast(
                  "Note created"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create note"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}

      {selectedNote && (
        <NoteDetailsModal
          note={selectedNote}
          onClose={() =>
            setSelectedNote(null)
          }
          onDeleteNote={handleDeleteNote}
          setToast={setToast}
          onEditNote={setEditingNote}
          onCompleteNote={
            handleCompleteNote
          }
          onRestoreNote={
            handleRestoreNote
          }
        />
      )}
      {editingNote && (
        <NoteModal
          mode="edit"
          note={editingNote}
          onCompleteNote={
            handleCompleteNote
          }
          onClose={() =>
            setEditingNote(null)
          }
          onSave={(noteData) => {
            updateNote(
              editingNote._id,
              noteData
            )
              .then((updatedNote) => {
                setNotes((prev) =>
                  prev.map((note) =>
                    note._id ===
                      updatedNote._id
                      ? updatedNote
                      : note
                  )
                );

                setToast(
                  "Note updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingNote(null);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update note"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}

      {showClearCompleted && (
        <div
          onClick={() =>
            setShowClearCompleted(
              false
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "400px",
              padding: "28px",
              borderRadius:
                "24px",
              background:
                "rgba(20,20,20,0.85)",
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear completed notes?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClearCompleted(
                    false
                  )
                }
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
                onClick={async () => {
                  await handleClearCompletedNotes();

                  setShowClearCompleted(
                    false
                  );
                }}

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
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      {/* showClearActive */}
      {showClearActive && (
        <div
          onClick={() =>
            setShowClearActive(
              false
            )
          }
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            onClick={async () => {
              await handleClearActiveNotes();

              setShowClearActive(
                false
              );
            }}
            style={{
              width: "400px",
              padding: "28px",
              borderRadius: "24px",
              background: "rgba(20,20,20,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                marginBottom: "12px",
                fontWeight: "400",
              }}
            >
              Clear active notes?
            </h3>

            <p
              style={{
                color:
                  "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() =>
                  setShowClearActive(
                    false
                  )
                }
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
                onClick={() => {
                  setNotes((prev) =>
                    prev.filter(
                      (note) =>
                        note.completed
                    )
                  );

                  setToast("Active notes cleared");

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

                  setShowClearActive(
                    false
                  );
                }}

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
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Notes;