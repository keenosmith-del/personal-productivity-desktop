import MainLayout from "../layouts/MainLayout";

import NotificationFeed from "../components/Notifications/NotificationFeed";
import Toast from "../components/Toast";

import { useState } from "react";
import { initialNotifications } from "../data/notifications";

function Notifications() {
  const [toast, setToast] =
    useState("");

  const [
    lastDeletedNotification,
    setLastDeletedNotification,
  ] = useState(null);

  const [
    notifications,
    setNotifications,
  ] = useState(initialNotifications);

  return (
    <MainLayout>
      <NotificationFeed
        notifications={notifications}
        setNotifications={setNotifications}
        toast={toast}
        setToast={setToast}
        lastDeletedNotification={
          lastDeletedNotification
        }
        setLastDeletedNotification={
          setLastDeletedNotification
        }
      />
      <Toast
        message={toast}
        actionLabel={
          lastDeletedNotification
            ? "Undo"
            : null
        }
        onAction={() => {
          if (!lastDeletedNotification)
            return;

          const {
            wasStarred,
            ...notificationToRestore
          } = lastDeletedNotification;

          setNotifications((prev) => [
            notificationToRestore,
            ...prev,
          ]);

          setLastDeletedNotification(
            null
          );

          setToast("");
        }}
      />
    </MainLayout>
  );
}

export default Notifications;