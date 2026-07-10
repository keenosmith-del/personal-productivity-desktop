import MainLayout from "../layouts/MainLayout";
// test 
import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowLeft,
  ArrowRight,
  Folder,
  Plus,
  NotebookPen,
  Infinity,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import NoteModal from "../components/Notes/NoteModal";
import NoteCard from "../components/Notes/NoteCard";

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
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  const noteFolders = []; // placeholder until real data

  //COMPONENT STATES
  const [showNoteModal, setShowNoteModal] =
    useState(false);

  const [openNoteMenu, setOpenNoteMenu] =
    useState(null);

  const [editingNote,
    setEditingNote] =
    useState(null);

  const [notes, setNotes] =
    useState([]);

  const [toast, setToast] =
    useState("");

  const [showClearAll,
    setShowClearAll] =
    useState(false);

  const [showClearArchived,
    setShowClearArchived] =
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

  const [showActions, setShowActions] =
    useState(false);

  const [showSearchBar, setShowSearchBar] =
    useState(false);

  const [actionsPinned, setActionsPinned] =
    useState(false);

  const [showMoreMenu, setShowMoreMenu] =
    useState(false);

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


  {/* BEGIN NOTES SORT VARIABLES */ }
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
        note.status === "Active" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const inProgressNotes = sortNotes(
    notes.filter(
      (note) =>
        note.status ===
        "In Progress" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  const archivedNotes = sortNotes(
    notes.filter(
      (note) =>
        note.status === "Archived" &&
        matchesSearch(note) &&
        matchesFilters(note)
    )
  );

  {/* URGENT NOTES SORT */ }
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

  const noteTabs = [
    {
      key: "all",
      icon: Infinity,
    },
    {
      key: "folders",
      icon: Folder,
    },
  ];

  const [activeTab, setActiveTab] =
    useState("all");

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        showSortMenu &&
        sortRef.current &&
        !sortRef.current.contains(
          event.target
        )
      ) {
        setShowSortMenu(false);
      }

      if (
        showFilterMenu &&
        filterRef.current &&
        !filterRef.current.contains(
          event.target
        )
      ) {
        setShowFilterMenu(false);
      }

      if (
        showMoreMenu &&
        moreRef.current &&
        !moreRef.current.contains(
          event.target
        )
      ) {
        setShowMoreMenu(false);
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

        setEditingNote(null);

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

  const handleClearArchivedNotes =
    async () => {
      try {
        setNotes((prev) =>
          prev.filter(
            (note) =>
              note.status !==
              "Archived"
          )
        );

        setToast(
          "Archived notes cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    };

  const handleClearAllNotes =
    async () => {
      try {
        await clearAllNotes();

        setNotes([]);

        setToast(
          "All notes cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);
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

  const actionIconStyle = {
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
          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* WITHIN HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontWeight: "400",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Notes
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your notes.
                </p>
              </div>

              {/* TOP RIGHT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* CREATE */}
                <button
                  onClick={() => {
                    setShowNoteModal(true);
                  }}
                  style={{
                    width: "36px",
                    height: "36px",

                    borderRadius: "999px",

                    border: "none",

                    background:
                      "rgba(255,255,255,0.025)",

                    color:
                      "var(--text-secondary)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    cursor: "pointer",

                    backdropFilter: "blur(28px)",

                    boxShadow:
                      "0 6px 20px rgba(0,0,0,0.28)",

                    transition:
                      "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",

                    transform: "translateX(0)",
                  }}
                >
                  <Plus
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                {/* ALL */}
                <div
                  onMouseEnter={() =>
                    setShowActions(true)
                  }
                  onMouseLeave={() => {
                    if (
                      !actionsPinned &&
                      !showSortMenu &&
                      !showFilterMenu &&
                      !showMoreMenu
                    ) {
                      setShowActions(false);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",

                    justifyContent: "flex-end",

                    position: "relative",
                  }}
                >
                  {/* EXPAND ARROW */}
                  <button
                    onClick={() => {
                      if (showActions && actionsPinned) {
                        setShowActions(false);

                        setActionsPinned(false);

                        setShowSearchBar(false);

                        setSearchTerm("");

                        setShowSortMenu(false);

                        setShowFilterMenu(false);
                      }
                    }}
                    style={{
                      width: "36px",
                      height: "36px",

                      borderRadius: "999px",

                      border: "none",

                      background:
                        "rgba(255,255,255,0.025)",

                      color:
                        "var(--text-secondary)",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      cursor: "pointer",

                      backdropFilter: "blur(28px)",

                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.28)",

                      transition:
                        "all 320ms cubic-bezier(0.22, 1, 0.36, 1)",

                      transform: showActions
                        ? "translateX(2px)"
                        : "translateX(0)",
                    }}
                  >
                    {actionsPinned ? (
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <ArrowLeft
                        size={16}
                        strokeWidth={1.5}
                      />
                    )}
                  </button>

                  {/* ACTIONS */}
                  <div
                    style={{
                      width:
                        showActions
                          ? showSearchBar
                            ? "420px"
                            : "280px"
                          : "0px",

                      overflow: "visible",

                      transition: "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",

                        gap: "8px",

                        overflow: "visible",

                        width:
                          showActions
                            ? showSearchBar
                              ? "500px"
                              : "360px"
                            : "0px",

                        opacity: showActions
                          ? 1
                          : 0,

                        transform: showActions
                          ? "translateX(0)"
                          : "translateX(12px)",

                        transition:
                          "all 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      {/* SEARCH / SORT / FILTER */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          gap: "6px",

                          padding: "4px",

                          borderRadius: "999px",

                          background: "rgba(255,255,255,0.025)",

                          backdropFilter: "blur(28px)",

                          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* search wrapper */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",

                            overflow: "hidden",

                            width: showSearchBar
                              ? "170px"
                              : "32px",

                            minWidth: "32px",

                            borderRadius: "999px",

                            transition: "width 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        >
                          {/* SEARCH ICON */}
                          <button
                            onClick={() => {
                              if (!showSearchBar) {
                                setShowSearchBar(true);

                                setActionsPinned(true);

                                setTimeout(() => {
                                  searchInputRef.current?.focus();
                                }, 50);
                              }
                            }}
                            style={actionIconStyle}
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
                            <Search
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {/* INPUT */}
                          {showSearchBar && (
                            <input
                              ref={searchInputRef}
                              onFocus={() => {
                                setActionsPinned(true);

                                setShowSortMenu(false);

                                setShowFilterMenu(false);

                                setShowMoreMenu(false);
                              }}
                              value={searchTerm}
                              onChange={(e) =>
                                setSearchTerm(e.target.value)
                              }
                              placeholder="Search notes..."
                              style={{
                                background: "none",

                                border: "none",

                                outline: "none",

                                color:
                                  "var(--text-primary)",

                                fontSize: "0.82rem",

                                fontWeight: "300",

                                width: "100%",

                                paddingRight: "12px",
                              }}
                            />
                          )}
                        </div>

                        {/* SORT BUTTON */}
                        <div
                          ref={sortRef}
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowSortMenu(!showSortMenu);

                              setShowFilterMenu(false);

                              setActionsPinned(true);

                              setShowActions(true);

                              setShowMoreMenu(false);
                            }}
                            style={actionIconStyle}
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
                            <ArrowUpDown
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {showSortMenu && (
                            <div
                              style={{
                                position: "fixed",

                                top: "42px",
                                right: 0,

                                width: "170px",

                                background:
                                  "rgba(20,20,20,0.92)",

                                backdropFilter:
                                  "blur(24px)",

                                border:
                                  "1px solid rgba(255,255,255,0.10)",

                                boxShadow:
                                  "0 20px 50px rgba(0,0,0,0.35)",

                                borderRadius: "18px",

                                padding: "8px",

                                display: "flex",

                                flexDirection: "column",

                                gap: "4px",

                                zIndex: 9999999,
                              }}
                            >
                              {[
                                "newest",
                                "oldest",
                                "priority",
                                "alphabetical",
                              ].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    setSortBy(option);

                                    setShowSortMenu(false);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      sortBy === option
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {option === "alphabetical"
                                    ? "A → Z"
                                    : option.charAt(0).toUpperCase() +
                                    option.slice(1)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* FILTER BUTTON */}
                        <div
                          ref={filterRef}
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowFilterMenu(!showFilterMenu);

                              setShowSortMenu(false);

                              setActionsPinned(true);

                              setShowActions(true);

                              setShowMoreMenu(false);
                            }}
                            style={actionIconStyle}
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
                            <Filter
                              size={15}
                              strokeWidth={1.6}
                            />
                          </button>

                          {showFilterMenu && (
                            <div
                              style={{
                                position: "absolute",

                                top: "42px",
                                right: 0,

                                width: "200px",

                                background:
                                  "rgba(20,20,20,0.92)",

                                backdropFilter:
                                  "blur(24px)",

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
                              <p
                                style={{
                                  fontSize: "0.72rem",
                                  opacity: 0.45,
                                  padding: "8px 12px 4px",
                                  margin: 0,
                                }}
                              >
                                Category
                              </p>

                              {[
                                "All",
                                "Work",
                                "Study",
                                "Personal",
                                "Health",
                              ].map((category) => (
                                <button
                                  key={category}
                                  onClick={() => {
                                    setSelectedCategory(category);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      selectedCategory === category
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  {category}
                                </button>
                              ))}

                              <div
                                style={{
                                  height: "1px",
                                  background: "rgba(255,255,255,0.06)",
                                  margin: "8px 0",
                                }}
                              />

                              <p
                                style={{
                                  fontSize: "0.72rem",
                                  opacity: 0.45,
                                  padding: "8px 12px 4px",
                                  margin: 0,
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
                                  onClick={() => {
                                    setSelectedPriority(priority);

                                    setShowFilterMenu(false);
                                  }}
                                  style={{
                                    background: "transparent",

                                    border: "none",

                                    color:
                                      selectedPriority === priority
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                    padding: "10px 14px",

                                    borderRadius: "12px",

                                    cursor: "pointer",

                                    textAlign: "left",

                                    fontSize: "0.78rem",

                                    fontWeight: "300",

                                    transition:
                                      "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.06)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
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

                                  margin: "8px 0",
                                }}
                              />

                              <button
                                onClick={() => {
                                  setSelectedCategory("All");
                                  setSelectedPriority("All");
                                  setShowFilterMenu(false);
                                }}
                                style={{
                                  background: "transparent",

                                  border: "none",

                                  color:
                                    "var(--text-secondary)",

                                  padding: "10px 14px",

                                  borderRadius: "12px",

                                  cursor: "pointer",

                                  textAlign: "left",

                                  fontSize: "0.78rem",

                                  fontWeight: "300",

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
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-secondary)";
                                }}
                              >
                                Clear Filters
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ALL / FOLDERS */}
                      {/* TABS */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",

                          gap: "6px",

                          padding: "4px",

                          borderRadius: "999px",

                          background:
                            "rgba(255,255,255,0.025)",

                          backdropFilter: "blur(28px)",

                          boxShadow:
                            "0 6px 20px rgba(0,0,0,0.2)",
                        }}
                      >
                        {noteTabs.map((tab) => {
                          const Icon = tab.icon;

                          const active =
                            activeTab === tab.key;

                          return (
                            <button
                              key={tab.key}
                              onClick={() => {
                                setActiveTab(tab.key);

                                setShowSortMenu(false);

                                setShowFilterMenu(false);

                                setShowMoreMenu(false);
                              }}
                              style={{
                                ...actionIconStyle,

                                background: active
                                  ? "rgba(255,255,255,0.025)"
                                  : "transparent",

                                boxShadow: active
                                  ? "0 4px 10px rgba(0,0,0,0.18)"
                                  : "none",

                                color: active
                                  ? "rgba(255,255,255,0.85)"
                                  : "var(--text-secondary)",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-1px)";

                                if (!active) {
                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";

                                if (!active) {
                                  e.currentTarget.style.color =
                                    "var(--text-secondary)";
                                }
                              }}
                            >
                              <Icon
                                size={15}
                                strokeWidth={1.6}
                              />
                            </button>
                          );
                        })}
                      </div>


                      {/* MORE */}
                      <div
                        ref={moreRef}
                        style={{
                          position: "relative",
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowMoreMenu(!showMoreMenu);

                            setActionsPinned(true);

                            setShowActions(true);

                            setShowSortMenu(false);

                            setShowFilterMenu(false);
                          }}
                          style={actionIconStyle}
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

                        {showMoreMenu && (
                          <div
                            style={{
                              position: "fixed",

                              top: "42px",
                              right: 0,

                              width: "180px",

                              background: "rgba(20,20,20,0.92)",

                              backdropFilter: "blur(24px)",
                              WebkitBackdropFilter: "blur(24px)",

                              border: "1px solid rgba(255,255,255,0.10)",

                              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",

                              borderRadius: "18px",

                              overflow: "hidden",

                              padding: "8px",

                              display: "flex",
                              flexDirection: "column",

                              gap: "4px",

                              zIndex: 2001,
                            }}
                          >
                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowNoteModal(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Create Note
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearArchived(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Clear Archived
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearAll(true);
                              }}
                              style={{
                                background: "transparent",

                                border: "none",

                                color: "var(--text-secondary)",

                                padding: "10px 14px",

                                borderRadius: "12px",

                                cursor: "pointer",

                                textAlign: "left",

                                fontSize: "0.78rem",

                                fontWeight: "300",

                                transition: "all 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                  "var(--text-primary)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";

                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                              }}
                            >
                              Clear All
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> {/* END ACTIONS CONTAINER */}
                </div>
              </div> {/* END TOP RIGHT */}
            </div> {/* END WITHIN HEADER */}

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

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALL NOTES ACTIVE TAB */}
          {activeTab === "all" && (
            <div
              style={{

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
              {/* HEADER REMOVED */}

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

                      opacity: 0.85,
                    }}
                  >

                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <NotebookPen
                        size={60}
                        strokeWidth={1.8}
                        opacity={0.85}
                      />
                    </div>

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
                        marginTop: "2px",
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
                      onClick={setEditingNote}

                      openNoteMenu={openNoteMenu}
                      setOpenNoteMenu={setOpenNoteMenu}

                      onView={setEditingNote}
                      onEdit={setEditingNote}

                      onDelete={handleDeleteNote}

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
          )}

          {/* FOLDERS TAB */}
          {activeTab === "folders" && (
            <div
              style={{

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
              {/* HEADER REMOVED */}

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

                {noteFolders.length === 0 ? (
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

                      opacity: 0.85,
                    }}
                  >

                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      <Folder
                        size={60}
                        strokeWidth={1.8}
                        opacity={0.85}
                      />
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.9rem",
                      }}
                    >
                      No Folders
                    </p>

                    <p
                      style={{
                        marginTop: "2px",
                        fontSize: "0.75rem",
                      }}
                    >
                      Click + to create one
                      {/* or try searching a different term */}
                    </p>
                  </div>
                ) : (
                  <p>
                    mapped folders
                  </p>
                )}
              </div>
            </div>
          )}

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
      {editingNote && (
        <NoteModal
          mode="edit"
          note={editingNote}
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
          onDelete={handleDeleteNote}
        />
      )}
      {/* show clear all */}
      {showClearAll && (
        <div
          onClick={() =>
            setShowClearAll(
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
              await handleClearAllNotes();

              setShowClearAll(
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
              Clear all notes?
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
                  setShowClearAll(
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

                  setToast("All notes cleared");

                  setTimeout(() => {
                    setToast("");
                  }, 3000);

                  setShowClearAll(
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