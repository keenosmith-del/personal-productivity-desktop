import {
    useEffect,
    useState,
} from "react";

import { useAuth } from "../../context/AuthContext";

import {
    getNotifications,
    markSlideoutShown,
} from "../../services/notificationService";

import { useNavigate } from "react-router-dom";

import NotificationSlideout from "./NotificationSlideout";

function NotificationWatcher() {
    const [activeNotification, setActiveNotification] =
        useState(null);

    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const checkNotifications = async () => {
            try {

                const notifications =
                    await getNotifications();

                const notification =
                    notifications.find((item) => {
                        if (
                            item.slideoutShown ||
                            item.archived
                        ) {
                            return false;
                        }

                        if (!user?.pushNotifications) {
                            return false;
                        }

                        switch (item.type) {
                            case "task":
                                return user.taskAlerts;

                            case "project":
                                return user.projectAlerts;

                            case "reminder":
                                return user.reminderAlerts;

                            default:
                                return false;
                        }
                    });

                if (
                    notification &&
                    !activeNotification
                ) {
                    setActiveNotification(
                        notification
                    );

                    await markSlideoutShown(
                        notification._id
                    );
                }

            } catch (error) {

                console.error(
                    "Failed to load notifications",
                    error
                );
            }
        };

        checkNotifications();

        const interval =
            setInterval(
                checkNotifications,
                5000
            );

        return () =>
            clearInterval(interval);

    }, [
        activeNotification,
    ]);

    return (
        <>
            {activeNotification && (
                <NotificationSlideout
                    notification={activeNotification}
                    onClose={() =>
                        setActiveNotification(null)
                    }
                    onView={() => {
                        setActiveNotification(null);

                        navigate("/notifications");
                    }}
                />
            )}
        </>
    );
}

export default NotificationWatcher;