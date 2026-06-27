import MainLayout from "../layouts/MainLayout";

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
              <input
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                placeholder="Search notifications..."
                style={{
                  width: "240px",

                  padding: "12px 18px",

                  borderRadius: "999px",

                  border: searchTerm
                    ? "1px solid rgba(87,112,122,0.55)"
                    : "1px solid rgba(255,255,255,0.08)",

                  background: searchTerm
                    ? "rgba(87,112,122,0.14)"
                    : "rgba(255,255,255,0.03)",

                  boxShadow: searchTerm
                    ? "0 0 0 1px rgba(87,112,122,0.15)"
                    : "none",

                  color:
                    "var(--text-primary)",

                  fontSize: "0.82rem",

                  fontWeight: "300",

                  outline: "none",

                  transition:
                    "all 0.2s ease",
                }}
              />

              <button
                onClick={() =>
                  setSortBy(
                    sortBy === "newest"
                      ? "oldest"
                      : "newest"
                  )
                }
                style={{
                  padding: "12px 18px",

                  borderRadius: "999px",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.03)",

                  color:
                    "var(--text-secondary)",

                  cursor: "pointer",

                  fontWeight: "300",
                }}
              >
                Sort
              </button>

              <button
                onClick={() =>
                  setSortBy(
                    sortBy === "newest"
                      ? "oldest"
                      : "newest"
                  )
                }
                style={{
                  padding: "12px 18px",

                  borderRadius: "999px",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.03)",

                  color:
                    "var(--text-secondary)",

                  cursor: "pointer",

                  fontWeight: "300",
                }}
              >
                Filter
              </button>
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