/* const API_URL = "http://localhost:5050/api/reminders"; */

const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/api/reminders`;

const getToken = () =>
    localStorage.getItem("token");

export async function getReminders() {
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
            "Failed to load reminders"
        );
    }

    return response.json();
}

export async function createReminder(
    reminderData
) {
    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                reminderData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create reminder"
        );
    }

    return response.json();
}

export async function updateReminder(
    reminderId,
    reminderData
) {
    const response = await fetch(
        `${API_URL}/${reminderId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                reminderData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update reminder"
        );
    }

    return data;
}

export async function deleteReminder(
    reminderId
) {
    const response = await fetch(
        `${API_URL}/${reminderId}`,
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
            "Failed to delete reminder"
        );
    }

    return data;
}

export async function clearAllReminders() {
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