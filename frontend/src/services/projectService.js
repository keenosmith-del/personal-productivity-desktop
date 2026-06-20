const API_URL =
    "http://localhost:5050/api/projects";

const getToken = () =>
    localStorage.getItem("token");

export async function getProjects() {
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
            "Failed to load projects"
        );
    }

    return response.json();
}

export async function createProject(
    projectData
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
                projectData
            ),
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to create project"
        );
    }

    return response.json();
}

export async function deleteProject(
    projectId
) {
    const response = await fetch(
        `${API_URL}/${projectId}`,
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
            "Failed to delete project"
        );
    }

    return data;
}

export async function updateProject(
    projectId,
    projectData
) {
    const response = await fetch(
        `${API_URL}/${projectId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${getToken()}`,
            },

            body: JSON.stringify(
                projectData
            ),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update project"
        );
    }

    return data;
}

export async function clearAllProjects() {
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

export async function clearCompletedProjects() {
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

export async function unpinAllProjects() {
    const response = await fetch(
        `${API_URL}/unpin-all`,
        {
            method: "PUT",

            headers: {
                Authorization:
                    `Bearer ${getToken()}`,
            },
        }
    );

    return response.json();
}