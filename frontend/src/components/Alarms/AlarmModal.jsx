// create edit alarm

import {
    useState,
    useRef,
    useEffect,
} from "react";

import DeleteConfirmModal from "../DeleteConfirmModal";

function AlarmModal({
    onClose,
    alarm = null,
    onSave,
    mode = "create",
    onDelete,
}) {

    const [label, setLabel] =
        useState(alarm?.label ?? "");

    const labelInputRef =
        useRef(null);

    // repeat days
    const [repeatDays, setRepeatDays] =
        useState(
            alarm?.repeatDays ?? []
        );

    const [snoozeEnabled, setSnoozeEnabled] =
        useState(
            alarm?.snoozeEnabled ??
            false
        );

    const [snoozeDuration, setSnoozeDuration] =
        useState(
            alarm?.snoozeDuration ??
            5
        );

    const [hours, setHours] =
        useState(
            alarm?.time?.split(":")[0] ??
            "09"
        );

    const [minutes, setMinutes] =
        useState(
            alarm?.time?.split(":")[1] ??
            "00"
        );

    const repeatOptions = [
        {
            value: "sun",
            label: "S",
        },
        {
            value: "mon",
            label: "M",
        },
        {
            value: "tue",
            label: "T",
        },
        {
            value: "wed",
            label: "W",
        },
        {
            value: "thu",
            label: "T",
        },
        {
            value: "fri",
            label: "F",
        },
        {
            value: "sat",
            label: "S",
        },
    ];

    const toggleStyle = (active) => ({
        width: "46px",
        height: "26px",

        borderRadius: "999px",

        background: active
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.03)",

        border: active
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(255,255,255,0.06)",

        position: "relative",

        cursor: "pointer",

        transition: "all 0.25s ease",

        backdropFilter: "blur(20px)",
    });

    const handleSave = async () => {
        const formattedHours =
            hours.padStart(2, "0");

        const formattedMinutes =
            minutes.padStart(2, "0");

        await onSave?.({
            ...alarm,

            label:
                label.trim() ||
                "Alarm",

            time:
                `${formattedHours}:${formattedMinutes}`,

            repeatDays,

            enabled:
                alarm?.enabled ?? true,

            snoozeEnabled,

            snoozeDuration,
        });
    };

    const [showCloseButton, setShowCloseButton] =
        useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    useEffect(() => {
        labelInputRef.current?.focus();
    }, []);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,

                background: "rgba(0,0,0,0.35)",

                backdropFilter: "blur(20px)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 1000,
            }}
        >
            {!showDeleteConfirm && (
                <div
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                    style={{
                        width: "500px",

                        background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",

                        border: "1px solid rgba(255,255,255,0.10)",

                        borderRadius: "36px",

                        backdropFilter: "blur(30px)",

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.45)",

                        padding: "36px",

                        display: "flex",

                        flexDirection: "column",

                        // gap: "10px",
                    }}
                >
                    {/* ROW 1 FLOATING PILL ON RIGHT */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            marginBottom: "24px",
                        }}
                    >

                        {/* meatball and x pill - changed to only x */}
                        {/* close x */}
                        <div
                            style={{
                                position: "relative",
                            }}
                            onMouseEnter={() =>
                                setShowCloseButton(true)
                            }
                            onMouseLeave={() =>
                                setShowCloseButton(false)
                            }
                        >
                            <button
                                onClick={() => {
                                    onClose();
                                }}
                                style={{
                                    width: "30px",
                                    height: "30px",

                                    borderRadius: "999px",

                                    border: "none",

                                    background:
                                        "rgba(255,255,255,0.04)",

                                    color:
                                        "var(--text-secondary)",

                                    cursor: "pointer",

                                    fontSize: "0.8rem",

                                    opacity: showCloseButton ? 1 : 0,

                                    transition: "opacity 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgb(33, 33, 33)";

                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";

                                    e.currentTarget.style.color =
                                        "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "rgb(33, 33, 33)";

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.color =
                                        "var(--text-secondary)";
                                }}
                            >
                                x
                            </button>
                        </div>
                    </div>

                    {/* ROW 2 TIME */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                            gap: "12px",

                            marginBottom: "36px",
                        }}
                    >
                        <input
                            type="text"
                            value={hours}
                            maxLength={2}
                            onChange={(e) => {
                                let value =
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                if (
                                    Number(value) > 23
                                ) {
                                    value = "23";
                                }

                                setHours(value);
                            }}
                            style={{
                                background:
                                    "transparent",

                                border: "none",

                                outline: "none",

                                width: "110px",

                                textAlign:
                                    "right",

                                color:
                                    "var(--text-primary)",

                                fontSize: "4rem",

                                fontWeight: "200",

                                letterSpacing:
                                    "-0.04em",

                                overflow: "visible",
                            }}
                        />

                        <span
                            style={{
                                fontSize: "4rem",

                                fontWeight: "200",

                                opacity: 0.7,
                            }}
                        >
                            :
                        </span>

                        <input
                            type="text"
                            value={minutes}
                            maxLength={2}
                            onChange={(e) => {
                                let value =
                                    e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );

                                if (
                                    Number(value) > 59
                                ) {
                                    value = "59";
                                }

                                setMinutes(value);
                            }}
                            style={{
                                background:
                                    "transparent",

                                border: "none",

                                outline: "none",

                                width: "110px",

                                textAlign:
                                    "left",

                                color:
                                    "var(--text-primary)",

                                fontSize: "4rem",

                                fontWeight: "200",

                                letterSpacing:
                                    "-0.04em",

                                overflow: "visible",
                            }}
                        />
                    </div>

                    {/* LABEL */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",

                            marginBottom: "28px",
                        }}
                    >
                        <input
                            ref={labelInputRef}
                            type="text"
                            value={label}
                            onChange={(e) =>
                                setLabel(
                                    e.target.value
                                )
                            }
                            placeholder="Alarm"

                            maxLength={30}

                            style={{
                                background: "transparent",

                                border: "none",

                                outline: "none",

                                color:
                                    label.trim()
                                        ? "var(--text-primary)"
                                        : "var(--text-secondary)",

                                fontSize: "1rem",

                                fontWeight: "300",

                                textAlign: "center",

                                width: "240px",
                            }}
                        />
                    </div>

                    {/* REPEAT DAYS PILLS */}
                    <div
                        style={{
                            display: "flex",

                            justifyContent: "center",

                            gap: "8px",

                            marginBottom: "22px",
                        }}
                    >
                        {repeatOptions.map(
                            (day) => {
                                const selected =
                                    repeatDays.includes(
                                        day.value
                                    );

                                return (
                                    <button
                                        key={day.value}
                                        onClick={() => {
                                            setRepeatDays((prev) =>
                                                prev.includes(day.value)
                                                    ? prev.filter(
                                                        (storedDay) =>
                                                            storedDay !== day.value
                                                    )
                                                    : [...prev, day.value]
                                            );
                                        }}
                                        style={{
                                            width: "34px",
                                            height: "34px",

                                            borderRadius: "999px",

                                            border: "1px solid rgba(255,255,255,0.06)",

                                            background:
                                                selected
                                                    ? "rgba(87, 112, 122, 0.35)"
                                                    : "rgba(87, 112, 112, 0.1)",

                                            color:
                                                "var(--text-secondary)",

                                            cursor: "pointer",

                                            fontSize: "0.68rem",

                                            fontWeight: "300",

                                            transition: "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selected) {
                                                e.currentTarget.style.background =
                                                    "rgba(87, 112, 122, 0.35)";
                                            }

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
                                            if (!selected) {
                                                e.currentTarget.style.background =
                                                    "rgba(87, 112, 112, 0.1)";
                                            }

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
                                        {day.label}
                                    </button>
                                );
                            }
                        )}
                    </div>

                    {/* SNOOZE */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            marginBottom: "20px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.9rem",
                                fontWeight: "300",

                                color: "var(--text-primary)",
                            }}
                        >
                            Snooze
                        </span>

                        <div
                            onClick={() =>
                                setSnoozeEnabled(
                                    !snoozeEnabled
                                )
                            }
                            style={toggleStyle(
                                snoozeEnabled
                            )}
                        >
                            <div
                                style={{
                                    width: "18px",
                                    height: "18px",

                                    borderRadius: "50%",

                                    background:
                                        "rgba(255,255,255,0.9)",

                                    position: "absolute",

                                    top: "3px",

                                    left: snoozeEnabled
                                        ? "23px"
                                        : "3px",

                                    transition:
                                        "all 0.25s ease",

                                    boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.25)",
                                }}
                            />
                        </div>
                    </div>
                    {snoozeEnabled && (
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",

                                flexWrap: "wrap",

                                marginBottom: "22px",
                            }}
                        >
                            {[1, 2, 3, 5, 10].map(
                                (minutes) => (
                                    <button
                                        key={minutes}
                                        onClick={() =>
                                            setSnoozeDuration(
                                                minutes
                                            )
                                        }
                                        style={{
                                            padding:
                                                "8px 12px",

                                            borderRadius:
                                                "999px",

                                            border:
                                                snoozeDuration === minutes
                                                    ? "1px solid rgba(255,255,255,0.14)"
                                                    : "1px solid rgba(255,255,255,0.06)",

                                            background:
                                                snoozeDuration === minutes
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "rgba(255,255,255,0.03)",

                                            color:
                                                snoozeDuration === minutes
                                                    ? "var(--text-primary)"
                                                    : "var(--text-secondary)",

                                            fontSize:
                                                "0.75rem",

                                            fontWeight:
                                                "300",

                                            cursor:
                                                "pointer",

                                            transition:
                                                "all 0.2s ease",
                                        }}
                                    >
                                        {minutes} min
                                    </button>
                                )
                            )}
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                            marginTop: "24px",
                        }}
                    >
                        {mode === "edit" && (
                            <button
                                onClick={() =>
                                    setShowDeleteConfirm(true)
                                }
                                style={{
                                    padding: "8px 14px",

                                    borderRadius: "999px",

                                    background:
                                        "rgba(255,77,77,0.12)",

                                    border:
                                        "1px solid rgba(255,77,77,0.25)",

                                    color: "var(--danger)",

                                    fontSize: "0.8rem",

                                    fontWeight: "300",

                                    cursor: "pointer",

                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,77,77,0.20)";

                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,77,77,0.12)";

                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                }}
                            >
                                Delete
                            </button>
                        )}

                        <button
                            onClick={handleSave}
                            style={{
                                padding: "8px 14px",

                                borderRadius: "999px",

                                background: "rgba(255,255,255,0.08)",

                                border: "1px solid rgba(255,255,255,0.10)",

                                color:
                                    "var(--text-primary)",

                                fontSize: "0.8rem",

                                fontWeight: "300",

                                cursor: "pointer",

                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.14)";

                                e.currentTarget.style.transform =
                                    "translateY(-1px)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.18)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.08)";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                                e.currentTarget.style.border =
                                    "1px solid rgba(255,255,255,0.10)";
                            }}
                        >
                            {mode === "edit"
                                ? "Save"
                                : "Create"}
                            {/* ONLY SAVE OPTION OR CREATE INITIALLY THEN ONCLICK MODE === EDIT BUTTON CHANGED TO SAVE */}
                        </button>
                    </div>
                </div>
            )}
            {showDeleteConfirm && (
                <DeleteConfirmModal
                    title="Delete alarm?"
                    message="This action cannot be undone."

                    onCancel={() => {
                        setShowDeleteConfirm(false);
                    }}

                    onConfirm={async () => {
                        await onDelete(alarm._id);

                        setShowDeleteConfirm(false);

                        onClose();
                    }}
                />
            )}
        </div >
    );
}

export default AlarmModal;