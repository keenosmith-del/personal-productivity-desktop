/* const API_URL = "http://localhost:5050/api/folders"; */

const API_URL =
    `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/api/folders`;

const getToken = () =>
    localStorage.getItem("token");

export async function getFolders() {
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
            "Failed to load folders"
        );
    }

    return response.json();
}

export async function createFolder(
    folderData
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
                folderData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create folder"
        );
    }

    return response.json();
}

export async function updateFolder(
    folderId,
    folderData
) {
    const response = await fetch(
        `${API_URL}/${folderId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                folderData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update folder"
        );
    }

    return data;
}

export async function deleteFolder(
    folderId
) {
    const response = await fetch(
        `${API_URL}/${folderId}`,
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
            "Failed to delete folder"
        );
    }

    return data;
}

export async function addNoteToFolder(
    folderId,
    noteId
) {
    const response = await fetch(
        `${API_URL}/${folderId}/notes/${noteId}`,
        {
            method: "PUT",

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
            "Failed to add note to folder"
        );
    }

    return data;
}

export async function removeNoteFromFolder(
    folderId,
    noteId
) {
    const response = await fetch(
        `${API_URL}/${folderId}/notes/${noteId}`,
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
            "Failed to remove note from folder"
        );
    }

    return data;
}

export async function clearFolder(folderId) {
    const response = await fetch(
        `${API_URL}/${folderId}/notes`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to clear folder"
        );
    }

    return data;
}