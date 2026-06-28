import MainLayout from "../layouts/MainLayout";

import { ArrowUpDown, Filter, Trash, Search, } from "lucide-react";

import Toast from "../components/Toast";

import { useEffect, useState } from "react";

import {
  getNotifications,
  clearAllNotifications,
  deleteNotification,
  toggleStarNotification,
  toggleReadNotification,
  toggleArchiveNotification,
} from "../services/notificationService";

import NotificationCard from "../components/Notifications/NotificationCard";

function Notifications() {
  // STATES
  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [
    openNotificationMenu,
    setOpenNotificationMenu,
  ] = useState(null);

  const [toast, setToast] =
    useState("");

  const [
    showClearAll,
    setShowClearAll,
  ] = useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {
    loadNotifications();
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

  const readNotifications =
    sortNotifications(
      notifications.filter(
        (n) =>
          n.read &&
          matchesSearch(n)
      )
    );

  const archivedNotifications =
    sortNotifications(
      notifications.filter(
        (n) =>
          n.archived &&
          matchesSearch(n)
      )
    );

  const notificationColumns = [
    {
      title: "All",
      data: allNotifications,
    },

    {
      title: "Starred",
      data: starredNotifications,
    },

    {
      title: "Read",
      data: readNotifications,
    },

    {
      title: "Archived",
      data: archivedNotifications,
    },
  ];

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

  async function handleToggleArchive(
    notification
  ) {
    try {
      const updated =
        await toggleArchiveNotification(
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
        updated.archived
          ? "Notification archived"
          : "Removed from archive"
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

  async function handleToggleRead(
    notification
  ) {
    try {
      const updated =
        await toggleReadNotification(
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
        updated.read
          ? "Marked read"
          : "Marked unread"
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



  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
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
                  letterSpacing: "-0.03em",
                }}
              >
                Notifications
              </h1>

              <p
                style={{
                  marginTop: "8px",
                  color:
                    "var(--text-secondary)",
                  fontWeight: "300",
                }}
              >
                Manage activity across your workspace.
              </p>
            </div>

            <div
              style={{
                display: "flex",
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
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Search notifications..."
                  style={{
                    width: "100%",

                    padding: "10px 16px 12px 42px",

                    borderRadius: "999px",

                    border: "1px solid rgba(255,255,255,0.06)",

                    background: "rgba(255,255,255,0.04)",

                    boxShadow: "0 0 0 1px rgba(87,112,122,0.15)",

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
                      "1px solid rgba(255,255,255,0.06)";

                    e.target.style.background =
                      "rgba(255,255,255,0.04)";
                  }}
                />
              </div>

              {/* SORT */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <button
                  style={{
                    padding: "10px 16px",

                    borderRadius: "999px",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    background:
                      "rgba(255,255,255,0.03)",

                    color:
                      "var(--text-secondary)",

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
                      "rgba(255,255,255,0.03)";

                    e.currentTarget.style.color =
                      "var(--text-secondary)";
                  }}
                >
                  <ArrowUpDown
                    size={15}
                    opacity={0.6}
                  />
                </button>
              </div>

              {/* FILTER */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <button
                  style={{
                    padding: "10px 16px",

                    borderRadius: "999px",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    background:
                      "rgba(255,255,255,0.03)",

                    color:
                      "var(--text-secondary)",

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
                      "rgba(255,255,255,0.03)";

                    e.currentTarget.style.color =
                      "var(--text-secondary)";
                  }}
                >
                  <Filter
                    size={15}
                    opacity={0.6}
                  />
                </button>
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

        {/* GRID */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",

            gap: "24px",
          }}
        >
          {notificationColumns.map(
            (column) => (
              <div
                key={column.title}
                style={{
                  background:
                    "var(--glass-bg)",

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
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                      }}
                    >
                      {column.title}
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",

                        opacity: 0.45,

                        marginTop: "4px",
                      }}
                    >
                      {column.data.length} notifications
                    </div>
                  </div>
                </div>

                {/* SCROLL AREA */}
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
                  {column.data.length === 0 ? (
                    <div
                      style={{
                        flex: 1,

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        color:
                          "var(--text-secondary)",

                        opacity: 0.45,

                        textAlign: "center",

                        fontSize: "0.8rem",
                      }}
                    >
                      No notifications
                    </div>
                  ) : (
                    column.data.map(
                      (notification) => (
                        <NotificationCard
                          key={notification._id}
                          notification={notification}
                          openNotificationMenu={
                            openNotificationMenu
                          }

                          setOpenNotificationMenu={
                            setOpenNotificationMenu
                          }

                          onDelete={
                            handleDeleteNotification
                          }

                          onToggleArchive={
                            handleToggleArchive
                          }

                          onToggleStar={
                            handleToggleStar
                          }

                          onToggleRead={
                            handleToggleRead
                          }
                        />
                      )
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Toast message={toast} />

    </MainLayout>
  );
}

export default Notifications;