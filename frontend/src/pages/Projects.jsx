import MainLayout from "../layouts/MainLayout";

import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  Sparkles,
  Shapes,
  ChartLine,
  Plus,
  Folder,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";

import Toast from "../components/Toast";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

function Projects() {
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  // COMPONENT STATES
  const [showProjectModal, setShowProjectModal] =
    useState(false);

  const [openProjectMenu, setOpenProjectMenu] =
    useState(null);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [editingProject, setEditingProject] =
    useState(null);

  const [projects, setProjects] =
    useState([]);

  const [toast, setToast] =
    useState("");

  const [completionTimeout, setCompletionTimeout] =
    useState(null);

  const [showClearCompleted, setShowClearCompleted] =
    useState(false);

  const [showClearActive, setShowClearActive] =
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

  const matchesFilters = (project) => {
    const categoryMatch =
      selectedCategory === "All" ||
      project.category ===
      selectedCategory;

    const priorityMatch =
      selectedPriority === "All" ||
      project.priority ===
      selectedPriority;

    return (
      categoryMatch &&
      priorityMatch
    );
  };

  const matchesSearch = (project) =>
    project.title
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||

    (project.description || "")
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase());

  const sortProjects = (projectsToSort) => {
    return [...projectsToSort].sort(
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


  {/* ALL PROJECTS */ }
  {/* NO COLS */ }
  const allProjects = sortProjects(
    projects.filter(
      (project) =>
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const activeProjects = sortProjects(
    projects.filter(
      (project) =>
        !project.completed &&
        project.status === "Active" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const inProgressProjects = sortProjects(
    projects.filter(
      (project) =>
        !project.completed &&
        project.status ===
        "In Progress" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const pausedProjects = sortProjects(
    projects.filter(
      (project) =>
        !project.completed &&
        project.status === "Paused" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const completedProjects = sortProjects(
    projects.filter(
      (project) =>
        project.status ===
        "Completed" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  {/* FOCUS TAB PROJECT SORT */ }
  const urgentProjects = sortProjects(
    projects.filter(
      (project) =>
        project.priority === "High" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const flaggedProjects = sortProjects(
    projects.filter(
      (project) =>
        project.flagged &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const likedProjects = sortProjects(
    projects.filter(
      (project) =>
        project.liked &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const discussionProjects = sortProjects(
    projects.filter(
      (project) =>
        project.commentCount > 0 &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  )

  {/* CATEGORIES TAB*/ }
  {/* WORK */ }
  const workProjects = sortProjects(
    projects.filter(
      (project) =>
        project.category === "Work" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  {/* STUDY */ }
  const studyProjects = sortProjects(
    projects.filter(
      (project) =>
        project.category === "Study" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  {/* PERSONAL */ }
  const personalProjects = sortProjects(
    projects.filter(
      (project) =>
        project.category === "Personal" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  {/* HEALTH */ }
  const healthProjects = sortProjects(
    projects.filter(
      (project) =>
        project.category === "Health" &&
        matchesSearch(project) &&
        matchesFilters(project)
    )
  );

  const hasFilters =
    selectedCategory !== "All" ||
    selectedPriority !== "All";

  const totalProjects = projects.length;

  // FUNCTIONS
  const loadProjects = async () => {
    try {
      const data =
        await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProjects();
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
  const handleDeleteProject =
    async (projectId) => {
      try {
        await deleteProject(projectId);

        setProjects((prev) =>
          prev.filter(
            (project) =>
              project._id !== projectId
          )
        );

        setToast(
          "Project deleted"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);

        setToast(
          "Failed to delete project"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleCompleteProject =
    async (project) => {
      try {
        const updatedProject =
          await updateProject(
            project._id,
            {
              completed: true,
              status: "Completed",
              completedDate:
                new Date().toLocaleDateString(),
            }
          );

        setProjects((prev) =>
          prev.map((t) =>
            t._id === updatedProject._id
              ? updatedProject
              : t
          )
        );

        setSelectedProject((prev) =>
          prev?._id === updatedProject._id
            ? updatedProject
            : prev
        );

        setEditingProject((prev) =>
          prev?._id === updatedProject._id
            ? updatedProject
            : prev
        );

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to complete project"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleRestoreProject =
    async (project) => {
      try {
        const updatedProject =
          await updateProject(
            project._id,
            {
              completed: false,
              completedDate: null,
              status: "Active",
            }
          );

        setProjects((prev) =>
          prev.map((t) =>
            t._id === updatedProject._id
              ? updatedProject
              : t
          )
        );

        setSelectedProject((prev) =>
          prev?._id === updatedProject._id
            ? updatedProject
            : prev
        );

        setEditingProject((prev) =>
          prev?._id === updatedProject._id
            ? updatedProject
            : prev
        );

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to restore project"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleClearCompletedProjects =
    async () => {
      try {
        await clearCompletedProjects();

        setProjects((prev) =>
          prev.filter(
            (project) =>
              !project.completed
          )
        );

        setToast(
          "Completed projects cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear completed projects"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    };

  const handleToggleFlag =
    async (project) => {
      await updateProject(
        project._id,
        {
          ...project,

          flagged:
            !project.flagged,
        }
      );

      loadProjects();
    };

  const handleToggleLike =
    async (project) => {
      await updateProject(
        project._id,
        {
          ...project,

          liked:
            !project.liked,
        }
      );

      loadProjects();
    };

  const handleAddComment =
    async (project) => {
      await updateProject(
        project._id,
        {
          ...project,

          commentCount:
            (project.commentCount || 0) +
            1,
        }
      );

      loadProjects();
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
          gap: "20px",
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
                  Projects
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your projects.
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
                    setShowProjectModal(true);
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
                            ? "330px"
                            : "200px"
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
                              placeholder="Search projects..."
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
                                "dueDate",
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
                                  {option === "dueDate"
                                    ? "Due Date"
                                    : option === "alphabetical"
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
                            strokeWidth={1.6}
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
                                setShowProjectModal(true);
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
                              Create Project
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearCompleted(true);
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
                              Clear Completed
                            </button>

                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                setShowClearActive(true);
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
              {totalProjects + " Projects" || "No Projects yet"}
            </p>
          </div> {/* END HEADER */}

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* ALL PROJECTS */}
          <div
            style={{
              borderRadius:
                "var(--radius-large)",

              backdropFilter: "blur(20px)",

              WebkitBackdropFilter: "blur(20px)",

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

                gridTemplateColumns: "repeat(4, 1fr)",

                gap: "18px",

                alignContent: "start",
              }}
            >

              {allProjects.length === 0 ? (
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
                    No Projects
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
                allProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onClick={() => {
                      setEditingProject(project);

                      setShowProjectModal(true);
                    }}

                    openProjectMenu={openProjectMenu}
                    setOpenProjectMenu={setOpenProjectMenu}

                    onView={(project) => {
                      setEditingProject(project);

                      setShowProjectModal(true);
                    }}

                    onEdit={setEditingProject}

                    onDelete={handleDeleteProject}

                    onComplete={handleCompleteProject}
                    onRestore={handleRestoreProject}

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
          </div> {/* ALL END */}

        </div>
      </div>
      {(showProjectModal || editingProject) && (
        <ProjectModal
          mode={
            editingProject
              ? "edit"
              : "create"
          }
          project={editingProject || null}
          onCompleteProject={
            handleCompleteProject
          }
          onClose={() => {
            setEditingProject(null);

            setShowProjectModal(false);
          }}
          onSave={(projectData) => {
            const action = editingProject
              ? updateProject(
                editingProject._id,
                projectData
              )
              : createProject(projectData);

            action
              .then((savedProject) => {
                if (editingProject) {
                  setProjects((prev) =>
                    prev.map((project) =>
                      project._id === savedProject._id
                        ? savedProject
                        : project
                    )
                  );

                  setToast("Project updated");
                } else {
                  setProjects((prev) => [
                    savedProject,
                    ...prev,
                  ]);

                  setToast("Project created");
                }

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingProject(null);

                setShowProjectModal(false);
              })
              .catch(() => {
                setToast(
                  editingProject
                    ? "Failed to update project"
                    : "Failed to create project"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
          onDelete={handleDeleteProject}
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
              Clear completed projects?
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
                  await handleClearCompletedProjects();

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
      <Toast
        message={toast}
      />
    </MainLayout>
  );
}

export default Projects;