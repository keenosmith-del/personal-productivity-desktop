import {
    useEffect,
    useState,
} from "react";

import {
    getAlarms,
    updateAlarm,
} from "../../services/alarmService";

import AlarmSlideout from "./AlarmSlideout";

function AlarmWatcher() {
    const [activeAlarm, setActiveAlarm] =
        useState(null);

    const [snoozedUntil, setSnoozedUntil] =
        useState({});

    const [dismissedUntil, setDismissedUntil] =
        useState({});

    useEffect(() => {
        const checkAlarms = async () => {
            try {

                const alarms =
                    await getAlarms();

                const now = new Date();

                const currentTime =
                    now.toLocaleTimeString(
                        "en-GB",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        }
                    );

                const today =
                    ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
                    now.getDay()
                    ];

                alarms.forEach((alarm) => {

                    if (!alarm.enabled) return;

                    const repeatsToday =
                        alarm.repeatDays.length === 0 ||
                        alarm.repeatDays.includes(today);

                    if (!repeatsToday) return;

                    const snoozedAlarm =
                        snoozedUntil[alarm._id];

                    if (snoozedAlarm) {

                        if (
                            Date.now() <
                            snoozedAlarm.wakeUpTime
                        ) {
                            return;
                        }

                        if (!activeAlarm) {

                            setActiveAlarm({
                                ...alarm,
                                time:
                                    snoozedAlarm.displayTime,
                            });

                            setSnoozedUntil((prev) => {

                                const updated = {
                                    ...prev,
                                };

                                delete updated[alarm._id];

                                return updated;
                            });
                        }

                        return;
                    }

                    const dismissedTime =
                        dismissedUntil[alarm._id];

                    if (
                        dismissedTime &&
                        Date.now() < dismissedTime
                    ) {
                        return;
                    }

                    if (
                        alarm.time === currentTime &&
                        !activeAlarm
                    ) {
                        setActiveAlarm(alarm);
                    }
                });

            } catch (error) {

                console.error(
                    "Failed to load alarms",
                    error
                );
            }
        };

        checkAlarms();

        const interval =
            setInterval(
                checkAlarms,
                5000
            );

        return () =>
            clearInterval(interval);

    }, [
        activeAlarm,
        snoozedUntil,
        dismissedUntil,
    ]);

    const handleSnooze = (
        alarm
    ) => {

        const wakeUpDate =
            new Date(
                Date.now() +
                alarm.snoozeDuration * 60000
            );

        const wakeUpTime =
            wakeUpDate.getTime();

        const snoozedDisplayTime =
            wakeUpDate.toLocaleTimeString(
                "en-GB",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }
            );

        setSnoozedUntil((prev) => ({
            ...prev,
            [alarm._id]: {
                wakeUpTime,
                displayTime:
                    snoozedDisplayTime,
            },
        }));

        setActiveAlarm(null);
    };

    const handleDismiss = async (alarm) => {

        const nextMinute = Date.now() + 60000;

        setDismissedUntil((prev) => ({
            ...prev,
            [alarm._id]: nextMinute,
        }));

        setActiveAlarm(null);

        if (alarm.repeatDays.length === 0) {

            try {

                await updateAlarm(
                    alarm._id,
                    {
                        ...alarm,
                        enabled: false,
                    }
                );

                window.dispatchEvent(
                    new CustomEvent(
                        "alarmUpdated"
                    )
                );

            } catch (error) {

                console.error(
                    "Failed to disable one-time alarm",
                    error
                );
            }
        }
    };

    return (
        <>
            {activeAlarm && (
                <AlarmSlideout
                    alarm={activeAlarm}
                    onClose={() =>
                        handleDismiss(activeAlarm)
                    }
                    onSnooze={() =>
                        handleSnooze(activeAlarm)
                    }
                />
            )}
        </>
    );
}

export default AlarmWatcher;