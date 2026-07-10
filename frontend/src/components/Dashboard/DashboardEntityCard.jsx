import FloatingLayer from "../FloatingLayer";

import {
    useState,
    useRef,
} from "react";

function DashboardEntityCard({
    title,
    items = [],
    placeholderTitle,
    placeholderFooter,
    chips,
    subtitle,
    onClick,
}) {
    const chipOrder = [
        "T",
        "P",
        "G",
        "R",
    ];

    const [showTooltip, setShowTooltip] =
        useState(null);

    const [tooltipText, setTooltipText] =
        useState("");

    const chipRef = useRef(null);

    const isUrgentCard =
        title === "Urgent";

    const priorityOrder = [
        "L",
        "M",
        "H",
    ];

    return (
        <div
            onClick={onClick}
            style={{
                background: "var(--glass-bg)",

                border:
                    "1px solid var(--glass-border)",

                borderRadius:
                    "var(--radius-large)",

                backdropFilter: "blur(20px)",

                WebkitBackdropFilter:
                    "blur(20px)",

                minHeight: "240px",

                padding: "24px",

                cursor:
                    onClick
                        ? "pointer"
                        : "default",

                transition:
                    "all 0.2s ease",

                display: "flex",

                flexDirection: "column",

                justifyContent:
                    "space-between",
            }}
            onMouseEnter={(e) => {
                if (!onClick) return;

                e.currentTarget.style.transform =
                    "translateY(-1px)";

                e.currentTarget.style.background =
                    "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
                if (!onClick) return;

                e.currentTarget.style.transform =
                    "translateY(0)";

                e.currentTarget.style.background =
                    "var(--glass-bg)";
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: "0.82rem",

                        fontWeight: "300",

                        opacity: 0.55,

                        marginBottom: "10px",
                    }}
                >
                    {title}
                </div>

                {items.length > 0 ? (
                    <>
                        <div
                            style={{
                                fontSize: "2rem",

                                fontWeight: "300",

                                letterSpacing: "-0.04em",
                            }}
                        >
                            {items.length}
                        </div>

                        {subtitle && (
                            <div
                                style={{
                                    marginTop: "6px",

                                    marginBottom: "10px",

                                    fontSize: "0.74rem",

                                    opacity: 0.45,
                                }}
                            >
                                {subtitle}
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        style={{
                            marginTop: "8px",

                            display: "flex",

                            flexDirection: "column",

                            gap: "6px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.82rem",

                                fontWeight: "300",
                            }}
                        >
                            Nothing here yet.
                        </div>

                        <div
                            style={{
                                fontSize: "0.72rem",

                                opacity: 0.45,

                                lineHeight: 1.5,
                            }}
                        >
                            {placeholderTitle}
                        </div>

                        <div
                            style={{
                                fontSize: "0.72rem",

                                opacity: 0.35,
                            }}
                        >
                            {placeholderFooter}
                        </div>
                    </div>
                )}
            </div>

            {/* STACKED AVATARS */}
            <div
                style={{
                    display: "flex",
                }}
            >
                {(isUrgentCard
                    ? chipOrder
                    : items.length === 0
                        ? ["0"]
                        : priorityOrder
                ).map((chip, index) => {

                    const type =
                        isUrgentCard
                            ? chip
                            : null;

                    const actualChip =
                        isUrgentCard
                            ? chips.find((item) =>
                                item.startsWith(type)
                            )
                            : chip === "0"
                                ? null
                                : chips.find((item) =>
                                    item.startsWith(chip)
                                );

                    const count =
                        actualChip
                            ? Number(actualChip.slice(1))
                            : 0;

                    const currentChip =
                        isUrgentCard
                            ? type
                            : chip;

                    const tooltip =
                        isUrgentCard
                            ? type === "T"
                                ? `${count} ${count === 1 ? "Task" : "Tasks"}`
                                : type === "P"
                                    ? `${count} ${count === 1 ? "Project" : "Projects"}`
                                    : type === "G"
                                        ? `${count} ${count === 1 ? "Goal" : "Goals"}`
                                        : `${count} ${count === 1 ? "Reminder" : "Reminders"}`
                            : currentChip === "0"
                                ? `0 ${title}`
                                : currentChip === "L"
                                    ? `${count} ${count === 1 ? "Low Priority" : "Low Priority"}`
                                    : currentChip === "M"
                                        ? `${count} ${count === 1 ? "Medium Priority" : "Medium Priority"}`
                                        : `${count} ${count === 1 ? "High Priority" : "High Priority"}`;

                    return (
                        <div
                            ref={
                                showTooltip === currentChip
                                    ? chipRef
                                    : null
                            }
                            key={`${currentChip}-${index}`}
                            style={{
                                width: "35px",
                                height: "35px",

                                borderRadius: "50%",

                                marginRight: "-6px",

                                zIndex:
                                    index + 1,

                                background:
                                    currentChip.startsWith("L")
                                        ? "#4d689333"
                                        : currentChip.startsWith("M")
                                            ? "#5b667033"
                                            : currentChip.startsWith("H")
                                                ? "#72515c33"
                                                : "linear-gradient(135deg, rgba(87,112,122,0.35), rgba(39,60,65,0.15))",

                                border:
                                    currentChip.startsWith("L")
                                        ? "1px solid #4d689366"
                                        : currentChip.startsWith("M")
                                            ? "1px solid #5b667066"
                                            : currentChip.startsWith("H")
                                                ? "1px solid #72515c66"
                                                : "1px solid rgba(255,255,255,0.06)",

                                color:
                                    currentChip.startsWith("L")
                                        ? "#8faec0"
                                        : currentChip.startsWith("M")
                                            ? "#a8b2bb"
                                            : currentChip.startsWith("H")
                                                ? "#c1a2ad"
                                                : "var(--text-secondary)",

                                backdropFilter:
                                    "blur(20px)",

                                display: "flex",

                                alignItems: "center",

                                justifyContent:
                                    "center",

                                fontSize:
                                    "0.62rem",

                                transition: "all 0.2s ease",

                                // add cursor tooltip?
                            }}
                            onMouseEnter={(e) => {
                                setShowTooltip(currentChip);
                                setTooltipText(tooltip);

                                e.currentTarget.style.transform =
                                    "translateY(-1px) scale(1.08)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.12)";

                                e.currentTarget.style.boxShadow =
                                    "0 8px 20px rgba(0,0,0,0.25)";

                                e.currentTarget.style.color =
                                    "var(--text-primary)";
                            }}
                            onMouseLeave={(e) => {
                                setShowTooltip(null);

                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.06)";

                                e.currentTarget.style.boxShadow =
                                    "none";

                                e.currentTarget.style.color =
                                    "var(--text-secondary)";
                            }}
                        >
                            {currentChip}
                        </div>
                    );
                })}
            </div>
            {showTooltip && (
                <FloatingLayer
                    anchorRef={chipRef}
                    open={Boolean(showTooltip)}
                    placement="bottom"
                    offset={8}
                    refreshKey={showTooltip}
                >
                    <div
                        style={{
                            minWidth: "120px",

                            padding: "8px 14px",

                            borderRadius: "36px",

                            background:
                                "rgba(18,18,18,0)",

                            backdropFilter:
                                "blur(5px)",

                            border:
                                "1px solid rgba(255,255,255,0.02)",

                            boxShadow:
                                "0 14px 40px rgba(0,0,0,0.07)",

                            textAlign: "center",

                            pointerEvents: "none",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "0.6rem",

                                fontWeight: "250",

                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {tooltipText}
                        </div>
                    </div>
                </FloatingLayer>
            )}
        </div>
    );
}

export default DashboardEntityCard;