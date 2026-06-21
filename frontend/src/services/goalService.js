const API_URL =
    "http://localhost:5050/api/goals";

const getToken = () =>
    localStorage.getItem("token");

export async function getGoals() {
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
            "Failed to load goals"
        );
    }

    return response.json();
}

export async function createGoal(
    goalData
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
                goalData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create goal"
        );
    }

    return response.json();
}

export async function updateGoal(
    goalId,
    goalData
) {
    const response = await fetch(
        `${API_URL}/${goalId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                goalData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update goal"
        );
    }

    return data;
}

export async function deleteGoal(
    goalId
) {
    const response = await fetch(
        `${API_URL}/${goalId}`,
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
            "Failed to delete goal"
        );
    }

    return data;
}

export async function clearAllGoals() {
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

export async function clearCompletedGoals() {
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

export async function clearActiveGoals() {
    const response = await fetch(
        `${API_URL}/active`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return response.json();
}