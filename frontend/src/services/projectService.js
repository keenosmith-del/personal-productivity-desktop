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