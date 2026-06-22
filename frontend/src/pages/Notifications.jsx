import MainLayout from "../layouts/MainLayout";

import NotificationFeed from "../components/Notifications/NotificationFeed";
import Toast from "../components/Toast";

import { useEffect, useState } from "react";

import {
  getNotifications,
  clearAllNotifications,
} from "../services/notificationService";

function Notifications() {
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
      <NotificationFeed
        notifications={notifications}
        setNotifications={setNotifications}
        toast={toast}
        setToast={setToast}
        onClearAll={() =>
          setShowClearAll(true)
        }
      />

      <Toast message={toast} />
      {showClearAll && (
        <div
          onClick={() =>
            setShowClearAll(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            backdropFilter:
              "blur(12px)",
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
              borderRadius: "24px",
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
              Clear all notifications?
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
                  setShowClearAll(false)
                }
                style={{
                  background:
                    "transparent",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius:
                    "999px",
                  padding: "8px 14px",
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleClearAllNotifications();

                  setShowClearAll(false);
                }}
                style={{
                  background:
                    "transparent",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius:
                    "999px",
                  padding: "8px 14px",
                  color:
                    "var(--text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Notifications;