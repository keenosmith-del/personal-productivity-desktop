const API_URL =
    "http://localhost:5050/api/auth";


export async function registerUser(
    userData
) {
    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(
                userData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Registration failed"
        );
    }

    return data;
}

export async function loginUser(
    email,
    password
) {
    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Login failed"
        );
    }

    return data;
}

export async function getUsers() {
    const response = await fetch(
        `${API_URL}/users`
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch users"
        );
    }

    return data;
}