import MainLayout from "../layouts/MainLayout";

import {
    useState,
    useEffect,
    useRef,
} from "react";

import Toast from "../components/Toast";

// imports to get tasks, reminders, goals, projects from auth


function QuickAdd() {

    return (
        <MainLayout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    {/* HEADER */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <h1
                                    style={{
                                        margin: 0,
                                        fontWeight: "400",
                                        letterSpacing:
                                            "-0.03em",
                                    }}
                                >
                                    Quick Add
                                </h1>

                                <p
                                    style={{
                                        marginTop: "8px",
                                        color:
                                            "var(--text-secondary)",
                                        fontWeight: "300",
                                    }}
                                >
                                    Quickly add tasks, reminders, notes, projects, or goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toast
                message={toast}
            />
        </MainLayout>
    );
}

export default QuickAdd;