import MainLayout from "../layouts/MainLayout";
import { Search } from "lucide-react";

function GlobalSearch() {
    return (
        <MainLayout
            style={{
                maxWidth: "900px",
                margin: "0 auto",
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    marginBottom: "32px",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "400",
                        marginBottom: "20px",
                    }}
                >
                    Search
                </h1>

                {/* SEARCH BAR */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",

                        padding: "16px 20px",

                        borderRadius: "999px",

                        background:
                            "rgba(255,255,255,0.04)",

                        border:
                            "1px solid rgba(255,255,255,0.08)",

                        backdropFilter:
                            "blur(20px)",

                        boxShadow:
                            "0 8px 32px rgba(0,0,0,0.15)",
                    }}
                >
                    <Search
                        size={18}
                        strokeWidth={1.5}
                        color="rgba(255,255,255,0.5)"
                    />

                    <input
                        placeholder="Search everything..."
                        style={{
                            flex: 1,

                            background:
                                "transparent",

                            border: "none",

                            outline: "none",

                            color:
                                "var(--text-primary)",

                            fontSize: "0.95rem",

                            fontWeight: "300",
                        }}
                    />
                </div>
            </div>

            {/* FILTER CHIPS */}
            <div
                style={{
                    display: "flex",
                    gap: "8px",

                    flexWrap: "wrap",

                    marginBottom: "28px",
                }}
            >
                {[
                    "All",
                    "Projects",
                    "Tasks",
                    "Goals",
                    "Notes",
                    "Reminders",
                ].map((item) => (
                    <button
                        key={item}
                        style={{
                            padding: "6px 12px",

                            borderRadius:
                                "999px",

                            border:
                                "1px solid rgba(255,255,255,0.08)",

                            background:
                                item === "All"
                                    ? "rgba(255,255,255,0.08)"
                                    : "transparent",

                            color:
                                "var(--text-secondary)",

                            cursor:
                                "pointer",

                            fontSize:
                                "0.8rem",

                            fontWeight:
                                "300",
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* RESULTS */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {[
                    {
                        title:
                            "Portfolio Website",
                        type: "Project",
                        subtitle:
                            "Due 20 June 2026",
                    },

                    {
                        title:
                            "Update CV",
                        type: "Task",
                        subtitle:
                            "Active",
                    },

                    {
                        title:
                            "Find Internship",
                        type: "Goal",
                        subtitle:
                            "68% Complete",
                    },

                    {
                        title:
                            "MongoDB Notes",
                        type: "Note",
                        subtitle:
                            "Updated Today",
                    },

                    {
                        title:
                            "Follow Up Recruiter",
                        type: "Reminder",
                        subtitle:
                            "Tomorrow",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        style={{
                            padding:
                                "16px 18px",

                            borderRadius:
                                "18px",

                            background:
                                "rgba(255,255,255,0.03)",

                            border:
                                "1px solid rgba(255,255,255,0.05)",

                            cursor:
                                "pointer",

                            transition:
                                "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "rgba(255,255,255,0.03)";
                        }}
                    >
                        <div
                            style={{
                                fontWeight:
                                    "400",

                                marginBottom:
                                    "4px",
                            }}
                        >
                            {item.title}
                        </div>

                        <div
                            style={{
                                fontSize:
                                    "0.8rem",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {item.type} •{" "}
                            {item.subtitle}
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}

export default GlobalSearch;