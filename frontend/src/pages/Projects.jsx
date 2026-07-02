import MainLayout from "../layouts/MainLayout";

import { ArrowUpDown, Filter, Search, Trash } from "lucide-react";

import {
  LayoutGrid,
  Sparkles,
  Shapes,
  ChartLine,
} from "lucide-react";

import AllProjectsCard from "../components/Projects/AllProjectsCard";
import ViewProjectModal from "../components/Projects/ViewProjectModal";
import CompletedProjectsCard from "../components/Projects/CompletedProjectsCard";
import PinnedProjectsCard from "../components/Projects/PinnedProjectsCard";

import ProjectDetailsModal from "../components/Projects/ProjectDetailsModal";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";

import FloatingTabs from "../components/FloatingTabs";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  clearAllProjects,
  clearCompletedProjects,
  unpinAllProjects,
} from "../services/projectService";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import Toast from "../components/Toast";

function Projects() {
  //COMPONENT STATES
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const [showProjectModal, setShowProjectModal] =
    useState(false);

  const [openProjectMenu, setOpenProjectMenu] =
    useState(null);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [editingProject,
    setEditingProject] =
    useState(null);

  const [projects, setProjects] =
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


  {/* BEGIN PROJECT SORT VARIABLES */ }
  {/* OVERVIEW TAB PROJECT SORT */ }
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

  {/* CATEGORIES TAB */ }
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

  const projectTabs = [
    {
      key: "overview",
      icon: LayoutGrid,
    },
    {
      key: "focus",
      icon: Sparkles,
    },
    {
      key: "categories",
      icon: Shapes,
    },
    {
      key: "insights",
      icon: ChartLine,
    },
  ];

  const [activeTab, setActiveTab] =
    useState("overview");

  useEffect(() => {
    loadProjects();
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
          prev.map((p) =>
            p._id === updatedProject._id
              ? updatedProject
              : p
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
          prev.map((p) =>
            p._id === updatedProject._id
              ? updatedProject
              : p
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

  const handleClearActiveProjects =
    async () => {
      try {
        await clearActiveProjects();

        setProjects((prev) =>
          prev.filter(
            (project) =>
              project.completed
          )
        );

        setToast(
          "Active projects cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);

      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear active projects"
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
                  Projects
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color:
                      "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your projects.
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
                    placeholder="Search projects..."
                    style={{
                      width: "100%",

                      padding: "12px 18px 12px 42px",

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
                    <ArrowUpDown
                      size={15}
                      opacity={0.6}
                    />
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
                    <Filter size={16} opacity={0.6} />
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
              {totalProjects + " Projects" || "No projects yet"}
            </p>
          </div>

          {/* TABS SECTION */}
          <FloatingTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={projectTabs}
          />

          {/* DIVIDER */}
          <div
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.06)",
            }}
          />

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN ACTIVE */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Active
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {activeProjects.length}{" "}
                      {activeProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setShowProjectModal(true)
                    }
                    style={{
                      width: "32px",
                      height: "32px",

                      borderRadius: "999px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        "rgba(255,255,255,0.04)",

                      color:
                        "var(--text-primary)",

                      cursor: "pointer",

                      fontSize: "0.85rem",

                      transition:
                        "all 0.2s ease",
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
                    +
                  </button>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL ACTIVE PROJECT CARDS */}
                  {activeProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        No active projects
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Click + to create one
                      </p>
                    </div>
                  ) : (
                    activeProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN IN PROGRESS */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      In Progress
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {inProgressProjects.length}{" "}
                      {inProgressProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL IN PROGRESS PROJECT CARDS */}
                  {inProgressProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing in progress
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Change the status of a project to get started
                      </p>
                    </div>
                  ) : (
                    inProgressProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN PAUSED */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Paused
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {pausedProjects.length}{" "}
                      {pausedProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL PAUSED PROJECT CARDS */}
                  {pausedProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        No paused projects
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Paused items will appear here
                      </p>
                    </div>
                  ) : (
                    pausedProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN COMPLETED */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Completed
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {completedProjects.length}{" "}
                      {completedProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL COMPLETED PROJECT CARDS */}
                  {completedProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        No completed projects
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Complete a project to see it here
                      </p>
                    </div>
                  ) : (
                    completedProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>
            </div>
          )}

          {/* FOCUS TAB */}
          {activeTab === "focus" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN URGENT */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Urgent
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {urgentProjects.length}{" "}
                      {urgentProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setShowProjectModal(true)
                    }
                    style={{
                      width: "32px",
                      height: "32px",

                      borderRadius: "999px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        "rgba(255,255,255,0.04)",

                      color:
                        "var(--text-primary)",

                      cursor: "pointer",

                      fontSize: "0.85rem",

                      transition:
                        "all 0.2s ease",
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
                    +
                  </button>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL URGENT PROJECT CARDS */}
                  {urgentProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Urgent projects will appear here
                      </p>
                    </div>
                  ) : (
                    urgentProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN FLAGGED */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Flagged
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {flaggedProjects.length}{" "}
                      {flaggedProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL FLAGGED PROJECT CARDS */}
                  {flaggedProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Flagged projects will appear here
                      </p>
                    </div>
                  ) : (
                    flaggedProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN FAVOURITES */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Favourites
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {likedProjects.length}{" "}
                      {likedProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL FAVOURITED Project CARDS */}
                  {likedProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Projects that have be favourited will appear here
                      </p>
                    </div>
                  ) : (
                    likedProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN DISCUSSIONS */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Discussions
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {discussionProjects.length}{" "}
                      {discussionProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL DISCUSSION Project CARDS */}
                  {discussionProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Projects that have been commented on appear here
                      </p>
                    </div>
                  ) : (
                    discussionProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>
            </div>
          )}


          {/* CATEGORIES TAB */}
          {activeTab === "categories" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              {/* COLUMN WORK */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Work
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {workProjects.length}{" "}
                      {workProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL ACTIVE Project CARDS */}
                  {workProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Projects in the Work category will appear here
                      </p>
                    </div>
                  ) : (
                    workProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN STUDY */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Study
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {studyProjects.length}{" "}
                      {studyProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL IN PROGRESS Project CARDS */}
                  {studyProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Projects in the Study category will appear here
                      </p>
                    </div>
                  ) : (
                    studyProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN PERSONAL */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Personal
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {personalProjects.length}{" "}
                      {personalProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL PAUSED Project CARDS */}
                  {personalProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Projects in the Personal categoy will appear here.
                      </p>
                    </div>
                  ) : (
                    personalProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>

              {/* COLUMN HEALTH */}
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

                  height: "600px",

                  display: "flex",

                  flexDirection: "column",

                  overflow: "hidden",
                }}
              >

                {/* STICKY HEADER */}
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

                  {/* TITLE */}
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      Health
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {healthProjects.length}{" "}
                      {healthProjects.length === 1 ? ("Project") : ("Projects")}
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA UNDER HEADER */}
                <div
                  style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "16px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",
                  }}
                >

                  {/* INDIVIDUAL COMPLETED Project CARDS */}
                  {healthProjects.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100%",

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
                        Nothing here
                      </p>

                      <p
                        style={{
                          marginTop: "6px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Projects in the Health category will appear here
                      </p>
                    </div>
                  ) : (
                    healthProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={setSelectedProject}

                        openProjectMenu={openProjectMenu}
                        setOpenProjectMenu={setOpenProjectMenu}

                        onView={setSelectedProject}
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
              </div>
            </div>
          )}

          {/* INSIGHTS TAB */}
          {activeTab === "insights" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                minHeight: "300px",

                borderRadius: "32px",

                backdropFilter:
                  "blur(20px)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  opacity: 0.85,
                  color: "var(--text-secondary)",
                }}
              >
                <h3
                  style={{
                    marginBottom: "8px",
                    fontWeight: "300",
                    fontSize: "1rem",

                  }}
                >
                  Insights
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontWeight: "300",
                    fontSize: "0.75rem",
                  }}
                >
                  Analytics and trends coming soon.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
      {showProjectModal && (
        <ProjectModal
          onClose={() =>
            setShowProjectModal(false)
          }
          onSave={(projectData) => {
            createProject(projectData)
              .then((newProject) => {
                setProjects((prev) => [
                  newProject,
                  ...prev,
                ]);

                setToast(
                  "Project created"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to create project"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);
              });
          }}
        />
      )}

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() =>
            setSelectedProject(null)
          }
          onDeleteProject={handleDeleteProject}
          setToast={setToast}
          onEditProject={setEditingProject}
          onCompleteProject={
            handleCompleteProject
          }
          onRestoreProject={
            handleRestoreProject
          }
        />
      )}
      {editingProject && (
        <ProjectModal
          mode="edit"
          project={editingProject}
          onCompleteProject={
            handleCompleteProject
          }
          onClose={() =>
            setEditingProject(null)
          }
          onSave={(projectData) => {
            updateProject(
              editingProject._id,
              projectData
            )
              .then((updatedProject) => {
                setProjects((prev) =>
                  prev.map((project) =>
                    project._id ===
                      updatedProject._id
                      ? updatedProject
                      : project
                  )
                );

                setToast(
                  "Project updated"
                );

                setTimeout(() => {
                  setToast("");
                }, 3000);

                setEditingProject(null);
              })
              .catch((error) => {
                console.error(error);

                setToast(
                  "Failed to update project"
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
              await handleClearActiveProjects();

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
              Clear active projects?
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
                  setProjects((prev) =>
                    prev.filter(
                      (project) =>
                        project.completed
                    )
                  );

                  setToast("Active projects cleared");

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

export default Projects;