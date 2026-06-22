import Notification from "../models/Notification.js";

async function createNotification({
    user,
    title,
    description,
    type,
    action,
    relatedId = null,
}) {
    try {
        await Notification.create({
            user,
            title,
            description,
            type,
            action,
            relatedId,
        });
    } catch (error) {
        console.error(
            "Notification creation failed:",
            error.message
        );
    }
}

export default createNotification;