import MainLayout from "../layouts/MainLayout";

import {
  Search,
  ArrowUpDown,
  Filter,
  Ellipsis,
  ArrowLeft,
  ArrowRight,
  Megaphone,
  Trash,
  Star,
  NotebookPen,
  CheckSquare,
  Bell,
  Sprout,
  Folder,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import NotificationCard from "../components/Notifications/NotificationCard";

import FloatingLayer from "../components/FloatingLayer";

import Toast from "../components/Toast";

import {
  getNotifications,
  clearAllNotifications,
  deleteNotification,
  toggleStarNotification,
  toggleReadNotification,
  toggleArchiveNotification,
} from "../services/notificationService";

function Notifications() {
  // REFS
  const sortRef = useRef(null);

  const filterRef = useRef(null);

  const searchInputRef = useRef(null);

  const moreRef = useRef(null);

  // COMPONENT STATES
  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [openNotificationMenu, setOpenNotificationMenu] = useState(null);

  const [toast, setToast] = useState("");

  const [showClearAll, setShowClearAll] = useState(false);

  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    loadNotifications();
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

  async function loadNotifications() {
    try {
      const data =
        await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error(error);

      setToast(
        "Failed to load notifications"
      );
    }
  }

  const matchesSearch = (notification) =>
    notification.title
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      ) ||

    notification.description
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  const sortNotifications = (items) =>
    [...items].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt) -
            new Date(b.createdAt)
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
    });

  const allNotifications =
    sortNotifications(
      notifications.filter(
        matchesSearch
      )
    );

  const starredNotifications =
    sortNotifications(
      notifications.filter(
        (n) =>
          n.starred &&
          matchesSearch(n)
      )
    );

  // HANDLERS
  async function handleToggleStar(
    notification
  ) {
    try {
      const updated =
        await toggleStarNotification(
          notification._id
        );

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === updated._id
            ? updated
            : item
        )
      );

      setToast(
        updated.starred
          ? "Notification starred"
          : "Removed star"
      );

      setTimeout(
        () => setToast(""),
        3000
      );
    } catch (error) {
      console.error(error);

      setToast(
        "Failed to update notification"
      );
    }
  }

  function handleDeleteNotification(
    id
  ) {
    setNotifications((prev) =>
      prev.filter(
        (item) =>
          item._id !== id
      )
    );

    setToast(
      "Notification deleted"
    );

    setTimeout(
      () => setToast(""),
      3000
    );
  }

  const handleClearAllNotifications =
    async () => {
      try {
        await clearAllNotifications();

        setNotifications([]);

        setToast(
          "All notifications cleared"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      } catch (error) {
        console.error(error);

        setToast(
          "Failed to clear notifications"
        );

        setTimeout(() => {
          setToast("");
        }, 3000);
      }
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
                  Notifications
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "var(--text-secondary)",
                    fontWeight: "300",
                  }}
                >
                  Manage and organize your notifications.
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
                            ? "320px"
                            : "180px"
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
                              placeholder="Search notifications..."
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

                                      setShowSortMenu(false);

                                      setShowFilterMenu(false);
                                    }}
                                    style={{
                                      ...menuItemStyle,

                                      color:
                                        selectedCategory === category
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)",

                                      opacity:
                                        selectedCategory === category
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
                                        selectedCategory === category
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)";

                                      e.currentTarget.style.opacity =
                                        selectedCategory === category
                                          ? "1"
                                          : "0.55";
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
                                    ...menuItemStyle,
                                    fontSize: "0.72rem",
                                    opacity: 0.45,
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
                                      ...menuItemStyle,

                                      color:
                                        selectedPriority === priority
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)",

                                      opacity:
                                        selectedPriority === priority
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
                                        selectedPriority === priority
                                          ? "var(--text-primary)"
                                          : "var(--text-secondary)";

                                      e.currentTarget.style.opacity =
                                        selectedPriority === priority
                                          ? "1"
                                          : "0.55";
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
                                  setShowTaskModal(true);
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
                                <CheckSquare
                                  size={13}
                                  strokeWidth={1}
                                />
                                Clear Tasks
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowTaskModal(true);
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
                                <Sprout
                                  size={13}
                                  strokeWidth={1}
                                />
                                Clear Goals
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowTaskModal(true);
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
                                <Folder
                                  size={13}
                                  strokeWidth={1}
                                />
                                Clear Projects
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowTaskModal(true);
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
                                <Bell
                                  size={13}
                                  strokeWidth={1}
                                />
                                Clear Reminders
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  setShowTaskModal(true);
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
                                Clear Notes
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
                                  // setShowClearActive(true);
                                }}
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
                                <Star
                                  size={13}
                                  strokeWidth={1}
                                />
                                Clear Starred
                              </button>

                              <button
                                onClick={() => {
                                  setShowMoreMenu(false);
                                  // setShowClearActive(true);
                                }}
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

                fontSize: "0.8rem",

                color: "var(--text-secondary)",

                opacity: 0.65,
              }}
            >
              {allNotifications.length} notifications
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

          {/* ALL NOTIFICATIONS */}
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

              {allNotifications.length === 0 ? (
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
                    <Megaphone
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
                    No Notifications
                  </p>

                  <p
                    style={{
                      marginTop: "2px",
                      fontSize: "0.75rem",
                    }}
                  >
                    Your notification feed will appear here
                    {/* or try searching a different term */}
                  </p>
                </div>
              ) : (
                allNotifications.map((notification) => (
                  <NotificationCard
                    key={notification._id}
                    notification={notification}

                    openNotificationMenu={openNotificationMenu}
                    setOpenNotificationMenu={setOpenNotificationMenu}

                    onDelete={handleDeleteNotification}

                    onToggleStar={
                      handleToggleStar
                    }
                  />
                ))
              )}
            </div>
          </div> {/* ALL END */}
        </div>
      </div>
      <Toast message={toast} />
    </MainLayout>
  );
}

export default Notifications;