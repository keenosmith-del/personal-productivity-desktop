/* const API_URL = "http://localhost:5050/api/notes"; */

const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/api/notes`;

const getToken = () =>
    localStorage.getItem("token");

export async function getNotes() {
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
            "Failed to load notes"
        );
    }

    return response.json();
}

export async function createNote(
    noteData
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
                noteData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create note"
        );
    }

    return response.json();
}

export async function updateNote(
    noteId,
    noteData
) {
    const response = await fetch(
        `${API_URL}/${noteId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                noteData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update note"
        );
    }

    return data;
}

export async function archiveNote(noteId) {
    const response = await fetch(
        `${API_URL}/${noteId}/archive`,
        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to archive note"
        );
    }

    return data;
}

export async function unarchiveNote(noteId) {
    const response = await fetch(
        `${API_URL}/${noteId}/unarchive`,
        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to unarchive note"
        );
    }

    return data;
}

export async function deleteNote(
    noteId
) {
    const response = await fetch(
        `${API_URL}/${noteId}`,
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
            "Failed to delete note"
        );
    }

    return data;
}

export async function clearAllNotes() {
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

export async function clearPinnedNotes() {
    const response = await fetch(
        `${API_URL}/pinned`,
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