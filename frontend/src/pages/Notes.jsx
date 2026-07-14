import MainLayout from "../layouts/MainLayout";

// MAKING CHANGES

import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowLeft,
  ArrowRight,
  Folder,
  SquarePen,
  FolderPlus,
  NotebookPen,
  Infinity,
  Archive,
  Trash,
  EyeOff,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import NoteModal from "../components/Notes/NoteModal";
import NoteCard from "../components/Notes/NoteCard";

import NoteFolderCard from "../components/NoteFolder/NoteFolderCard";
import NoteFolderCreateModal from "../components/NoteFolder/NoteFolderCreateModal";
import NoteFolderViewModal from "../components/NoteFolder/NoteFolderViewModal";

import FloatingLayer from "../components/FloatingLayer";

import {
  getNotes,
  createNote,
  updateNote,
  clearAllNotes,
  clearPinnedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../services/noteService";

import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  removeNoteFromFolder,
  addNoteToFolder,
  clearFolder,
} from "../services/folderService";

import Toast from "../components/Toast";

function Notes() {
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  const noteFolders = 1; // placeholder until real data

  //COMPONENT STATES
  const [showNoteModal, setShowNoteModal] =
    useState(false);

  const [showNoteFolderCreateModal, setShowNoteFolderCreateModal] =
    useState(false);

  const [openNoteMenu, setOpenNoteMenu] =
    useState(null);

  const [openFolderMenu, setOpenFolderMenu] =
    useState(null);

  const [editingNote, setEditingNote] =
    useState(null);

  const [editingFolder, setEditingFolder] =
    useState(null);

  const [viewingFolder, setViewingFolder] =
    useState(null);

  const [notes, setNotes] =
    useState([]);

  const [folders, setFolders] =
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

  const [selectedType, setSelectedType] =
    useState("All");

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

  const [showSortMenu, setShowSortMenu] =
    useState(false);

  const [showFilterMenu, setShowFilterMenu] =
    useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const [selectedFolder, setSelectedFolder] = useState(null);

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

  const [showHidden, setShowHidden] = useState(false);

  {/* BEGIN NOTES SORT VARIABLES */ }
  const allNotes = sortNotes(
    notes.filter(
      (note) =>
        matchesSearch(note) &&
        matchesFilters(note) &&
        (showHidden || !note.hidden)
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

  const loadFolders = async () => {
    try {
      const data = await getFolders();

      setFolders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const noteTabs = [
    {
      key: "notes",
      icon: NotebookPen,
    },
    {
      key: "folders",
      icon: Folder,
    },
  ];

  const navigation =
    performance.getEntriesByType("navigation")[0];

  const wasReload =
    sessionStorage.getItem("notes-page-reload") === "true";

  const isReload =
    navigation?.type === "reload";

  const [activeTab, setActiveTab] =
    useState(() => {
      const saved =
        localStorage.getItem("notes-active-tab");

      return wasReload
        ? saved || "notes"
        : "notes";
    });

  useEffect(() => {
    localStorage.setItem(
      "notes-active-tab",
      activeTab
    );
  }, [activeTab]);

  useEffect(() => {
    sessionStorage.removeItem("notes-page-reload");

    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        "notes-page-reload",
        "true"
      );
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, []);

  useEffect(() => {
    loadNotes();
    loadFolders();
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
  const handleCreateFolder = async (
    folderData
  ) => {
    try {
      const newFolder =
        await createFolder(
          folderData
        );

      setFolders((prev) => [
        newFolder,
        ...prev,
      ]);

      setShowNoteFolderCreateModal(false);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFolder = async (
    folderId
  ) => {
    try {

      await deleteFolder(folderId);

      setNotes((prev) =>
        prev.map((note) =>
          note.folder === folderId
            ? {
              ...note,
              folder: null,
            }
            : note
        )
      );

      setFolders((prev) =>
        prev.filter(
          (folder) =>
            folder._id !== folderId
        )
      );

      setEditingFolder(null);

      setToast(
        "Folder deleted"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {

      console.error(error);

      setToast(
        "Failed to delete folder"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);
    }
  };

  const handleClearFolder = async (folder) => {
    try {
      const updatedFolder =
        await clearFolder(folder._id);

      setFolders((prev) =>
        prev.map((item) =>
          item._id === updatedFolder._id
            ? updatedFolder
            : item
        )
      );

      setViewingFolder(updatedFolder);

      setNotes((prev) =>
        prev.map((note) =>
          note.folder === folder._id
            ? {
              ...note,
              folder: null,
            }
            : note
        )
      );

      setToast("Folder cleared");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);

      console.log(error.response?.data);
    }
  };

  const handleToggleHide = async (note) => {
    try {
      const updatedNote = await updateNote(
        note._id,
        {
          hidden: !note.hidden,
        }
      );

      setNotes((prev) =>
        prev.map((item) =>
          item._id === updatedNote._id
            ? updatedNote
            : item
        )
      );

      setFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          notes: folder.notes?.map((item) =>
            item._id === updatedNote._id
              ? updatedNote
              : item
          ),
        }))
      );

      setViewingFolder((prev) =>
        prev
          ? {
            ...prev,
            notes: prev.notes?.map((item) =>
              item._id === updatedNote._id
                ? updatedNote
                : item
            ),
          }
          : prev
      );

      setToast(
        updatedNote.hidden
          ? "Note hidden"
          : "Note visible"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleArchive = async (note) => {
    try {
      const updatedNote = note.archived
        ? await unarchiveNote(note._id)
        : await archiveNote(note._id);

      await loadFolders();

      setNotes((prev) =>
        prev.map((item) =>
          item._id === updatedNote._id
            ? updatedNote
            : item
        )
      );

      setFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          notes: folder.notes?.map((item) =>
            item._id === updatedNote._id
              ? updatedNote
              : item
          ),
        }))
      );

      setViewingFolder((prev) => {
        if (!prev) return prev;

        // Note has left the folder currently being viewed.
        if (
          (prev.isSystem && !updatedNote.archived) ||
          (!prev.isSystem && updatedNote.archived)
        ) {
          return {
            ...prev,
            notes: prev.notes.filter(
              (item) => item._id !== updatedNote._id
            ),
          };
        }

        // Otherwise just update the note in place.
        return {
          ...prev,
          notes: prev.notes.map((item) =>
            item._id === updatedNote._id
              ? updatedNote
              : item
          ),
        };
      });

      setToast(
        updatedNote.archived
          ? "Note archived"
          : "Note unarchived"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFolderPin = async (
    folder
  ) => {
    try {

      const updatedFolder =
        await updateFolder(
          folder._id,
          {
            pinned:
              !folder.pinned,
          }
        );

      setFolders((prev) =>
        prev.map((item) =>
          item._id ===
            updatedFolder._id
            ? updatedFolder
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFolderFlag = async (
    folder
  ) => {
    try {

      const updatedFolder =
        await updateFolder(
          folder._id,
          {
            flagged:
              !folder.flagged,
          }
        );

      setFolders((prev) =>
        prev.map((item) =>
          item._id ===
            updatedFolder._id
            ? updatedFolder
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFolderLike = async (
    folder
  ) => {
    try {

      const updatedFolder =
        await updateFolder(
          folder._id,
          {
            liked:
              !folder.liked,
          }
        );

      setFolders((prev) =>
        prev.map((item) =>
          item._id ===
            updatedFolder._id
            ? updatedFolder
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveNoteFromFolder = async (folder, note) => {
    try {
      const updatedFolder =
        await removeNoteFromFolder(
          folder._id,
          note._id
        );

      let updatedNote = note;

      // If removing from the system Archived folder,
      // automatically unarchive the note.
      if (folder.isSystem) {
        updatedNote = await unarchiveNote(note._id);
      }

      setNotes((prev) =>
        prev.map((item) =>
          item._id === updatedNote._id
            ? {
              ...updatedNote,
              folder: null,
            }
            : item
        )
      );

      await loadFolders();

      setViewingFolder((prev) =>
        prev && prev._id === updatedFolder._id
          ? updatedFolder
          : prev
      );

      setToast(
        folder.isSystem
          ? "Note unarchived"
          : "Note removed from folder"
      );

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExistingNoteToFolder = async (
    folder,
    note
  ) => {
    try {

      const updatedFolder =
        await addNoteToFolder(
          folder._id,
          note._id
        );

      setNotes((prev) =>
        prev.map((item) =>
          item._id === note._id
            ? {
              ...item,
              folder: folder._id,
            }
            : item
        )
      );

      setFolders((prev) =>
        prev.map((item) =>
          item._id === updatedFolder._id
            ? updatedFolder
            : {
              ...item,
              notes: item.notes?.filter(
                (n) => n._id !== note._id
              ),
            }
        )
      );

      setViewingFolder((prev) =>
        prev && prev._id === updatedFolder._id
          ? updatedFolder
          : prev
      );

      setToast("Note added to folder");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

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

        setFolders((prev) =>
          prev.map((folder) => ({
            ...folder,
            notes: folder.notes?.filter(
              (note) => note._id !== noteId
            ),
          }))
        );

        setViewingFolder((prev) =>
          prev
            ? {
              ...prev,
              notes: prev.notes?.filter(
                (note) => note._id !== noteId
              ),
            }
            : prev
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

  const handleToggleFlag = async (note) => {
    const updatedNote = await updateNote(
      note._id,
      {
        ...note,
        flagged: !note.flagged,
      }
    );

    setNotes((prev) =>
      prev.map((n) =>
        n._id === updatedNote._id
          ? updatedNote
          : n
      )
    );

    setFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        notes: folder.notes?.map((n) =>
          n._id === updatedNote._id
            ? updatedNote
            : n
        ),
      }))
    );

    setViewingFolder((prev) =>
      prev
        ? {
          ...prev,
          notes: prev.notes?.map((n) =>
            n._id === updatedNote._id
              ? updatedNote
              : n
          ),
        }
        : prev
    );
  };

  const handleToggleLike = async (note) => {
    const updatedNote = await updateNote(
      note._id,
      {
        ...note,
        liked: !note.liked,
      }
    );

    setNotes((prev) =>
      prev.map((n) =>
        n._id === updatedNote._id
          ? updatedNote
          : n
      )
    );

    setFolders((prev) =>
      prev.map((folder) => ({
        ...folder,
        notes: folder.notes?.map((n) =>
          n._id === updatedNote._id
            ? updatedNote
            : n
        ),
      }))
    );

    setViewingFolder((prev) =>
      prev
        ? {
          ...prev,
          notes: prev.notes?.map((n) =>
            n._id === updatedNote._id
              ? updatedNote
              : n
          ),
        }
        : prev
    );
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

  const isNotesTab = activeTab === "notes";

  const headerTitle = isNotesTab
    ? "Notes"
    : "Folders";

  const headerDescription = isNotesTab
    ? "Manage and organize your notes."
    : "Manage and organize your folders.";

  const itemCount = isNotesTab
    ? totalNotes
    : folders.length;

  const itemLabel = isNotesTab
    ? "Note"
    : "Folder";

  const headerCount =
    itemCount === 0
      ? `No ${itemLabel}s`
      : itemCount === 1
        ? `1 ${itemLabel}`
        : `${itemCount} ${itemLabel}s`;

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",

    background: "transparent",

    border: "none",

    color: "var(--text-primary)",

    padding: "10px 14px",

    borderRadius: "999px",

    cursor: "pointer",

    textAlign: "left",

    fontSize: "0.7rem",

    fontWeight: "300",

    transition: "all 0.2s ease",

    width: "100%",
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
                  {headerTitle}
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  {headerDescription}
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
                {/* NEW NOTE */}
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
                  <SquarePen
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                {/* NEW FOLDER */}
                <button
                  onClick={() => {
                    setShowNoteFolderCreateModal(true);
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
                  <FolderPlus
                    size={16}
                    strokeWidth={1.5}
                  />
                </button>

                {/* ARROW */}
                <div
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
                      if (showActions) {
                        setShowActions(false);

                        setActionsPinned(false);

                        setShowSearchBar(false);

                        setSearchTerm("");

                        setShowSortMenu(false);

                        setShowFilterMenu(false);

                        setShowMoreMenu(false);
                      } else {
                        setShowActions(true);

                        setActionsPinned(true);
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
                    {showActions ? (
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
                            : "275px"
                          : "15px",

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
                            : "15px",

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
                            <FloatingLayer
                              anchorRef={sortRef}
                              open={true}
                              placement="bottom"
                              offset={8}
                            >
                              <div
                                style={{
                                  width: "170px",

                                  background:
                                    "rgba(20,20,20,0)",

                                  backdropFilter:
                                    "blur(8px)",

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
                                      ...menuItemStyle,

                                      color:
                                        sortBy === option
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)",

                                      opacity:
                                        sortBy === option
                                          ? 1
                                          : 0.55,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                      e.currentTarget.style.color =
                                        "#F5F5F5";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background =
                                        "transparent";

                                      e.currentTarget.style.color =
                                        sortBy === option
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)";

                                      e.currentTarget.style.opacity =
                                        sortBy === option
                                          ? "1"
                                          : "0.55";
                                    }}
                                  >
                                    {option === "alphabetical"
                                      ? "A → Z"
                                      : option.charAt(0).toUpperCase() +
                                      option.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </FloatingLayer>
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
                            <FloatingLayer
                              anchorRef={sortRef}
                              open={true}
                              placement="bottom"
                              offset={8}
                            >
                              <div
                                style={{
                                  width: "170px",

                                  background:
                                    "rgba(20,20,20,0)",

                                  backdropFilter:
                                    "blur(8px)",

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
                                    ...menuItemStyle,
                                    fontSize: "0.72rem",
                                    opacity: 0.45,
                                    margin: 0,
                                  }}
                                >
                                  Type
                                </p>

                                {[
                                  "All",
                                  "Flagged",
                                  "Liked",
                                  "Pinned",
                                  "Archived",
                                  "Hidden",
                                ].map((type) => (
                                  <button
                                    key={type}
                                    onClick={() => {
                                      setSelectedType(type);

                                      setShowSortMenu(false);

                                      setShowFilterMenu(false);
                                    }}
                                    style={{
                                      ...menuItemStyle,

                                      color:
                                        selectedType === type
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)",

                                      opacity:
                                        selectedType === type
                                          ? 1
                                          : 0.55,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background =
                                        "rgba(255,255,255,0.04)";

                                      e.currentTarget.style.color =
                                        "#F5F5F5";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background =
                                        "transparent";

                                      e.currentTarget.style.color =
                                        selectedType === type
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)";

                                      e.currentTarget.style.opacity =
                                        selectedType === type
                                          ? "1"
                                          : "0.55";
                                    }}
                                  >
                                    {type}
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
                                    setSelectedType("All");
                                    setShowFilterMenu(false);
                                  }}
                                  style={menuItemStyle}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "rgba(255,255,255,0.04)";

                                    e.currentTarget.style.color =
                                      "#f5f5f5";
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
                            </FloatingLayer>
                          )}
                        </div>
                      </div>

                      {/* NOTES TAB / FOLDERS TAB */}
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

                            setShowSortMenu(false);

                            setShowFilterMenu(false);

                            setActionsPinned(true);

                            setShowActions(true);
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
                          <FloatingLayer
                            anchorRef={moreRef}
                            open={true}
                            placement="bottom"
                            offset={8}
                          >
                            <div
                              style={{
                                width: "180px",

                                background:
                                  "rgba(20,20,20,0)",

                                backdropFilter:
                                  "blur(8px)",

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
                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowNoteModal(true);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <NotebookPen
                                  size={13}
                                  strokeWidth={1}
                                />
                                New Note
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowNoteFolderCreateModal(true);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <FolderPlus
                                  size={13}
                                  strokeWidth={1}
                                />

                                New Folder
                              </button>

                              <div
                                style={{
                                  height: "1px",
                                  background:
                                    "rgba(255,255,255,0.05)",
                                  margin: "4px 0",
                                }}
                              />

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowHidden((prev) => !prev);
                                }}
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <EyeOff
                                  size={13}
                                  strokeWidth={1}
                                />

                                {showHidden ? "Hide Hidden" : "Show Hidden"}
                              </button>

                              <button
                                style={menuItemStyle}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#F5F5F5";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "var(--text-primary)";
                                }}
                              >
                                <Archive
                                  size={13}
                                  strokeWidth={1}
                                />
                                {/* needs to change {showArchived ? "Hide Archived" : "Show Archived"}*/}
                                Show Archived
                              </button>

                              <div
                                style={{
                                  height: "1px",
                                  background:
                                    "rgba(255,255,255,0.05)",
                                  margin: "4px 0",
                                }}
                              />

                              <button
                                style={{
                                  ...menuItemStyle,
                                  color: "#ffb36b",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";

                                  e.currentTarget.style.color =
                                    "#ffb36b";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";

                                  e.currentTarget.style.color =
                                    "#ffb36b";
                                }}
                              >
                                <Archive
                                  size={13}
                                  strokeWidth={1}
                                />

                                Delete Archived
                              </button>

                              <button
                                style={{
                                  ...menuItemStyle,
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
                                <Trash
                                  size={13}
                                  strokeWidth={1}
                                />
                                Clear All
                              </button>
                            </div>
                          </FloatingLayer>
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
              {headerCount}
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
          {activeTab === "notes" && (
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

                      folders={folders}
                      onAddExistingNote={
                        handleAddExistingNoteToFolder
                      }

                      openNoteMenu={openNoteMenu}
                      setOpenNoteMenu={setOpenNoteMenu}

                      onView={(folder) => {
                        // console.log("onView called", folder.title);
                        setViewingFolder(folder);
                      }}

                      onRemoveFromFolder={
                        handleRemoveNoteFromFolder
                      }

                      onEdit={setEditingNote}

                      onDelete={handleDeleteNote}

                      onCreateFolder={(note) => {
                        setSelectedNote(note);
                        setShowNoteFolderCreateModal(true);
                      }}

                      onToggleHide={handleToggleHide}
                      onToggleArchive={handleToggleArchive}

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
                    "repeat(3, 1fr)",

                  gap: "18px",

                  alignContent: "start",
                }}
              >

                {folders.length === 0 ? (
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
                  folders.map((folder) => (
                    <NoteFolderCard
                      key={folder._id}
                      folder={folder}

                      onEdit={setEditingFolder}

                      onView={setViewingFolder}

                      onCreateNote={(folder) => {
                        setSelectedFolder(folder);

                        setShowNoteModal(true);
                      }}

                      onEditNote={(note) =>
                        setEditingNote(note)
                      }

                      onRemoveNote={
                        handleRemoveNoteFromFolder
                      }

                      onDelete={handleDeleteFolder}

                      notes={notes}

                      onAddExistingNote={
                        handleAddExistingNoteToFolder
                      }

                      // added
                      showHidden={showHidden}

                      onToggleFolderPin={handleToggleFolderPin}
                      onToggleFolderLike={handleToggleFolderLike}
                      onToggleFolderFlag={handleToggleFolderFlag}

                      openFolderMenu={openFolderMenu}
                      setOpenFolderMenu={setOpenFolderMenu}
                    />
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
      {showNoteModal && (
        <NoteModal
          folder={selectedFolder}
          onClose={() =>
            setShowNoteModal(false)
          }
          onSave={(noteData) => {
            createNote(noteData)

              .then(async (newNote) => {

                let updatedFolder = null;

                if (selectedFolder) {
                  updatedFolder =
                    await addNoteToFolder(
                      selectedFolder._id,
                      newNote._id
                    );
                }

                setNotes((prev) => [
                  newNote,
                  ...prev,
                ]);

                if (updatedFolder) {
                  setFolders((prev) =>
                    prev.map((folder) =>
                      folder._id === updatedFolder._id
                        ? updatedFolder
                        : folder
                    )
                  );

                  setViewingFolder((prev) =>
                    prev?._id === updatedFolder._id
                      ? updatedFolder
                      : prev
                  );
                }

                setToast("Note created");

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setShowNoteModal(false);

                setSelectedFolder(null);

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
                    note._id === updatedNote._id
                      ? updatedNote
                      : note
                  )
                );

                setFolders((prev) =>
                  prev.map((folder) => ({
                    ...folder,
                    notes: folder.notes?.map((note) =>
                      note._id === updatedNote._id
                        ? updatedNote
                        : note
                    ),
                  }))
                );

                setViewingFolder((prev) =>
                  prev
                    ? {
                      ...prev,
                      notes: prev.notes?.map((note) =>
                        note._id === updatedNote._id
                          ? updatedNote
                          : note
                      ),
                    }
                    : prev
                );

                setToast("Note updated");

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
      {showNoteFolderCreateModal && (
        <NoteFolderCreateModal
          mode="create"

          onCreate={async (folderData) => {
            try {
              const newFolder =
                await createFolder(folderData);

              let updatedFolder = newFolder;

              if (selectedNote) {
                updatedFolder =
                  await addNoteToFolder(
                    newFolder._id,
                    selectedNote._id
                  );

                setNotes((prev) =>
                  prev.map((note) =>
                    note._id === selectedNote._id
                      ? {
                        ...note,
                        folder: newFolder._id,
                      }
                      : note
                  )
                );
              }

              setFolders((prev) => [
                updatedFolder,
                ...prev,
              ]);

              setToast(
                selectedNote
                  ? "Note added to new folder"
                  : "Folder created"
              );

              setTimeout(() => {
                setToast("");
              }, 3000);

              setSelectedNote(null);

              setShowNoteFolderCreateModal(false);

            } catch (error) {
              console.error(error);
            }
          }}

          onClose={() =>
            setShowNoteFolderCreateModal(false)
          }
        />
      )}
      {editingFolder && (
        <NoteFolderCreateModal
          mode="edit"
          folder={editingFolder}
          onClose={() =>
            setEditingFolder(null)
          }
          onUpdate={async (
            folderId,
            folderData
          ) => {
            updateFolder(
              folderId,
              folderData
            )
              .then((updatedFolder) => {
                setFolders((prev) =>
                  prev.map((folder) =>
                    folder._id ===
                      updatedFolder._id
                      ? updatedFolder
                      : folder
                  )
                );

                setToast(
                  "Folder updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingFolder(null);
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
          onDelete={handleDeleteFolder}
        />
      )}
      {viewingFolder && (
        <NoteFolderViewModal
          folder={viewingFolder}

          onClose={() =>
            setViewingFolder(null)
          }

          onRemoveNote={
            handleRemoveNoteFromFolder
          }

          onToggleLike={handleToggleLike}

          onToggleFlag={handleToggleFlag}

          onToggleHide={handleToggleHide}

          onToggleArchive={handleToggleArchive}

          onDeleteNote={handleDeleteNote}

          onEditFolder={setEditingFolder}

          onUpdateFolder={async (folderId, folderData) => {
            const updatedFolder =
              await updateFolder(folderId, folderData);

            setFolders((prev) =>
              prev.map((folder) =>
                folder._id === updatedFolder._id
                  ? updatedFolder
                  : folder
              )
            );

            setViewingFolder(updatedFolder);

            setToast("Folder updated");

            setTimeout(() => {
              setToast("");
            }, 3000);

            return updatedFolder;
          }}

          onDeleteFolder={handleDeleteFolder}

          showHidden={showHidden}

          onClearFolder={handleClearFolder}

          onCreateNote={async (folder, noteData) => {
            const newNote =
              await createNote(noteData);

            const updatedFolder =
              await addNoteToFolder(
                folder._id,
                newNote._id
              );

            setNotes((prev) => [
              newNote,
              ...prev,
            ]);

            setFolders((prev) =>
              prev.map((item) =>
                item._id === updatedFolder._id
                  ? updatedFolder
                  : item
              )
            );

            setViewingFolder(updatedFolder);

            setToast("Note created");

            setTimeout(() => {
              setToast("");
            }, 3000);
          }}

          onAddExistingNote={
            handleAddExistingNoteToFolder
          }

          notes={notes}

          onUpdateNote={async (
            noteId,
            noteData
          ) => {
            const updatedNote =
              await updateNote(
                noteId,
                noteData
              );

            setNotes((prev) =>
              prev.map((note) =>
                note._id === updatedNote._id
                  ? updatedNote
                  : note
              )
            );

            setFolders((prev) =>
              prev.map((folder) => ({
                ...folder,
                notes: folder.notes?.map((note) =>
                  note._id === updatedNote._id
                    ? updatedNote
                    : note
                ),
              }))
            );

            setViewingFolder((prev) =>
              prev
                ? {
                  ...prev,
                  notes: prev.notes?.map((note) =>
                    note._id === updatedNote._id
                      ? updatedNote
                      : note
                  ),
                }
                : prev
            );

            return updatedNote;
          }}
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