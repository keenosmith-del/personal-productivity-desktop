import React from "react";

function FloatingTabs({
    activeTab,
    setActiveTab,
    tabs,
}) {
    const activeIndex = tabs.findIndex(
        (tab) => tab.key === activeTab
    );
    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2px",
                position: "relative",
            }}
        >
            {/* ambient */}
            <div
                style={{
                    position: "absolute",

                    width: "340px",
                    height: "110px",

                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.045), transparent 75%)",

                    filter: "blur(60px)",

                    opacity: 0.8,

                    borderRadius: "999px",

                    pointerEvents: "none",
                }}
            />

            {/* pill container */}
            <div
                style={{
                    position: "relative",

                    display: "flex",
                    alignItems: "center",

                    gap: "20px",

                    padding: "2px",

                    borderRadius: "999px",

                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.01))",

                    boxShadow:
                        "inset 0 1px 1px rgba(255,255,255,0.04), 0 6px 18px rgba(0,0,0,0.22)",

                    border: "none",

                    backdropFilter: "blur(20px)",

                    WebkitBackdropFilter:
                        "blur(20px)",
                }}
            >
                {/* ACTIVE GLASS PILL */}
                <div
                    style={{
                        position: "absolute",

                        left: `${2 + activeIndex * 55}px`,

                        width: "35px",
                        height: "35px",

                        borderRadius: "999px",

                        background:
                            "rgba(255,255,255,0.018)",

                        boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.02), inset 0 -1px 0 rgba(0,0,0,0.12), 0 8px 18px rgba(0,0,0,0.30)",

                        transition:
                            "left 320ms cubic-bezier(0.22, 1, 0.36, 1)",

                        pointerEvents: "none",

                        zIndex: 1,
                    }}
                />
                {tabs.map((tab) => {
                    const Icon = tab.icon;

                    const active =
                        activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            onClick={() =>
                                setActiveTab(tab.key)
                            }
                            style={{
                                position: "relative",
                                zIndex: 2,

                                width: "35px",
                                height: "35px",

                                borderRadius: "999px",

                                border: "none",

                                background:
                                    "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))",

                                boxShadow:
                                    "0 2px 6px rgba(0,0,0,0.14)",

                                color: active
                                    ? "rgba(255,255,255,0.85)"
                                    : "rgba(255,255,255,0.22)",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                cursor: "pointer",

                                transition:
                                    "all 260ms cubic-bezier(0.22, 1, 0.36, 1)",

                                backdropFilter: active
                                    ? "blur(20px)"
                                    : "none",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px)";

                                if (active) {
                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.95)";
                                } else {
                                    e.currentTarget.style.background =
                                        "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.018))";

                                    e.currentTarget.style.boxShadow =
                                        "0 6px 14px rgba(0,0,0,0.22)";

                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.55)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                if (active) {
                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.85)";
                                } else {

                                    e.currentTarget.style.color =
                                        "rgba(255,255,255,0.32)";
                                }
                            }}
                        >
                            <Icon
                                size={18}
                                strokeWidth={1.5}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default FloatingTabs;