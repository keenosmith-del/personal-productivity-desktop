const API_URL = "http://localhost:5050/api/auth";

export async function getUsers() {
    const response = await fetch(
        `${API_URL}/users`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}