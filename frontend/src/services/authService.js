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

export async function getCurrentUser() {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/me`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch user"
        );
    }

    return data;
}

export async function updatePreferences(
    preferences
) {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/preferences`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify(
                preferences
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update preferences"
        );
    }

    return data;
}

export async function updateProfile(
    profileData
) {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/profile`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify(
                profileData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update profile"
        );
    }

    return data;
}

export async function updatePassword(
    currentPassword,
    newPassword
) {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/password`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update password"
        );
    }

    return data;
}

export async function changePassword(
    passwordData
) {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/change-password`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify(
                passwordData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to change password"
        );
    }

    return data;
}

export async function clearAllData(
    password
) {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/clear-data`,
        {
            method: "DELETE",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify({
                password,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to clear data"
        );
    }

    return data;
}

export async function deleteAccount(
    password
) {
    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/delete-account`,
        {
            method: "DELETE",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify({
                password,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to delete account"
        );
    }

    return data;
}

export async function exportData() {

    const token =
        localStorage.getItem(
            "token"
        );

    const response = await fetch(
        `${API_URL}/export-data`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to export data"
        );
    }

    return data;
}

export async function resetPassword(
    email,
    newPassword
) {
    const response = await fetch(
        `${API_URL}/reset-password`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                email,
                newPassword,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to reset password"
        );
    }

    return data;
}

export async function deleteUser(
    email,
    password
) {
    const response = await fetch(
        `${API_URL}/delete-user`,
        {
            method: "DELETE",

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
            "Failed to delete user"
        );
    }

    return data;
}




