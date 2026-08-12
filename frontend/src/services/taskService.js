/* const API_URL = "http://localhost:5050/api/tasks"; */

const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/api/tasks`;

const getToken = () =>
    localStorage.getItem("token");

export async function getTasks() {
    const response = await fetch(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load tasks"
        );
    }

    return response.json();
}

export async function createTask(
    taskData
) {
    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization: `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                taskData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create task"
        );
    }

    return response.json();
}

export async function updateTask(
    taskId,
    taskData
) {
    const response = await fetch(
        `${API_URL}/${taskId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                taskData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update task"
        );
    }

    return data;
}

export async function deleteTask(
    taskId
) {
    const response = await fetch(
        `${API_URL}/${taskId}`,
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
            "Failed to delete task"
        );
    }

    return data;
}

export async function clearAllTasks() {
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

export async function clearCompletedTasks() {
    const response = await fetch(
        `${API_URL}/completed`,
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

export async function clearActiveTasks() {
    const response = await fetch(
        `${API_URL}/active`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to clear active tasks"
        );
    }

    return data;
}