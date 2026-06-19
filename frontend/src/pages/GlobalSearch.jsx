import MainLayout from "../layouts/MainLayout";
import GlassCard from "../components/GlassCard";
import { Search } from "lucide-react";

import { useState } from "react";

function GlobalSearch() {
    const filterChips = [
        {
            label: "Projects",
            bg: "#063f4733",
            border: "#063f4766",
        },
        {
            label: "Tasks",
            bg: "#72715c33",
            border: "#72715c66",
        },
        {
            label: "Goals",
            bg: "#c59c7033",
            border: "#c59c7066",
        },
        {
            label: "Notes",
            bg: "#52677d33",
            border: "#52677d66",
        },
        {
            label: "Reminders",
            bg: "#83545c33",
            border: "#83545c66",
        },
    ];

    const [selectedFilter, setSelectedFilter] =
        useState("All");
    return (
        <MainLayout>
            <GlassCard minHeight="700px">
                {/* HEADER */}
                <div
                    style={{
                        marginBottom: "32px",
                    }}
                >
                    {/* SEARCH BAR */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                maxWidth: "700px",

                                display: "flex",
                                alignItems: "center",
                                gap: "12px",

                                padding: "18px 22px",

                                borderRadius: "999px",

                                background:
                                    "rgba(255,255,255,0.04)",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                backdropFilter: "blur(20px)",

                                boxShadow:
                                    "0 8px 32px rgba(0,0,0,0.18)",
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
                </div>

                {/* FILTER CHIPS */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",

                        gap: "8px",

                        flexWrap: "wrap",

                        marginBottom: "32px",
                    }}
                >
                    {[
                        {
                            label: "All",
                            bg: "rgba(255,255,255,0.08)",
                            border: "rgba(255,255,255,0.08)",
                        },
                        ...filterChips,
                    ].map((chip) => (
                        <button
                            key={chip.label}
                            onClick={() =>
                                setSelectedFilter(chip.label)
                            }
                            style={{
                                padding: "6px 12px",

                                borderRadius:
                                    "999px",

                                border:
                                    "1px solid rgba(255,255,255,0.08)",

                                background:
                                    selectedFilter === chip.label
                                        ? chip.bg
                                        : "transparent",

                                border:
                                    selectedFilter === chip.label
                                        ? `1px solid ${chip.border}`
                                        : "1px solid rgba(255,255,255,0.08)",

                                color:
                                    selectedFilter === chip.label
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                cursor:
                                    "pointer",

                                fontSize:
                                    "0.8rem",

                                fontWeight:
                                    "300",
                            }}
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>

                {/* RESULTS COUNT */}
                <p
                    style={{
                        fontSize: "0.8rem",
                        fontWeight: "300",
                        color: "var(--text-secondary)",
                        marginBottom: "16px",
                    }}
                >
                    5 Results Found
                </p>

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
                                borderRadius: "12px",
                                padding: "18px",

                                background: "transparent",

                                border: "none",

                                cursor:
                                    "pointer",

                                transition:
                                    "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.05)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";

                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                    marginBottom: "6px",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "300",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    {item.title}
                                </div>

                                <span
                                    style={{
                                        padding: "4px 8px",
                                        borderRadius: "999px",
                                        fontSize: "0.68rem",

                                        background:
                                            item.type === "Project"
                                                ? "#063f4733"
                                                : item.type === "Task"
                                                    ? "#72715c33"
                                                    : item.type === "Goal"
                                                        ? "#c59c7033"
                                                        : item.type === "Note"
                                                            ? "#52677d33"
                                                            : "#83545c33",

                                        border:
                                            item.type === "Project"
                                                ? "1px solid #063f4766"
                                                : item.type === "Task"
                                                    ? "1px solid #72715c66"
                                                    : item.type === "Goal"
                                                        ? "1px solid #c59c7066"
                                                        : item.type === "Note"
                                                            ? "1px solid #52677d66"
                                                            : "1px solid #83545c66",
                                    }}
                                >
                                    {item.type}
                                </span>
                            </div>

                            <div
                                style={{
                                    fontSize:
                                        "0.8rem",

                                    color:
                                        "var(--text-secondary)",
                                }}
                            >
                                {item.subtitle}
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </MainLayout>
    );
}

export default GlobalSearch;