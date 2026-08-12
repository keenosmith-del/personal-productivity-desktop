/* const API_URL = "http://localhost:5050/api/notifications"; */

const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/api/notifications`;

const getToken = () =>
    localStorage.getItem("token");

export async function getNotifications() {
    const response = await fetch(
        API_URL,
        {
            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load notifications"
        );
    }

    return response.json();
}

export async function toggleStarNotification(
    notificationId
) {
    const response = await fetch(
        `${API_URL}/${notificationId}/star`,
        {
            method: "PUT",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update notification"
        );
    }

    return data;
}

export async function deleteNotification(
    notificationId
) {
    const response = await fetch(
        `${API_URL}/${notificationId}`,
        {
            method: "DELETE",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to delete notification"
        );
    }

    return data;
}

export async function clearAllNotifications() {
    const response = await fetch(
        `${API_URL}/all`,
        {
            method: "DELETE",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    return response.json();
}

export async function toggleReadNotification(
    notificationId
) {
    const response = await fetch(
        `${API_URL}/${notificationId}/read`,
        {
            method: "PUT",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update notification"
        );
    }

    return data;
}

export async function toggleArchiveNotification(
    notificationId
) {
    const response = await fetch(
        `${API_URL}/${notificationId}/archive`,
        {
            method: "PUT",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update notification"
        );
    }

    return data;
}

export async function markSlideoutShown(
    notificationId
) {
    const response = await fetch(
        `${API_URL}/${notificationId}/slideout`,
        {
            method: "PUT",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update notification"
        );
    }

    return data;
}