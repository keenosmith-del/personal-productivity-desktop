/* const API_URL = "http://localhost:5050/api/alarms"; */

const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/api/alarms`;


const getToken = () =>
    localStorage.getItem("token");


// GET ALL
export const getAlarms =
    async () => {
        const response =
            await fetch(API_URL, {
                headers: {
                    Authorization:
                        `Bearer ${getToken()}`,
                },
            });

        if (!response.ok) {
            throw new Error(
                "Failed to fetch alarms."
            );
        }

        return response.json();
    };


// CREATE
export const createAlarm =
    async (alarmData) => {
        const response =
            await fetch(API_URL, {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${getToken()}`,
                },

                body: JSON.stringify(
                    alarmData
                ),
            });

        if (!response.ok) {
            throw new Error(
                "Failed to create alarm."
            );
        }

        return response.json();
    };


// UPDATE
export const updateAlarm =
    async (id, alarmData) => {
        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${getToken()}`,
                    },

                    body: JSON.stringify(
                        alarmData
                    ),
                }
            );

        if (!response.ok) {
            throw new Error(
                "Failed to update alarm."
            );
        }

        return response.json();
    };


// DELETE
export async function deleteAlarm(
    alarmId
) {
    const response = await fetch(
        `${API_URL}/${alarmId}`,
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
            "Failed to delete alarm"
        );
    }

    return data;
}