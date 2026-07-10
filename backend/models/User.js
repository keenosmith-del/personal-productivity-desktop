import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        job: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        theme: {
            type: String,
            default: "Dark",
        },

        pushNotifications: {
            type: Boolean,
            default: false,
        },

        dailySummary: {
            type: Boolean,
            default: false,
        },

        weeklySummary: {
            type: Boolean,
            default: false,
        },

        taskAlerts: {
            type: Boolean,
            default: false,
        },

        reminderAlerts: {
            type: Boolean,
            default: false,
        },

        projectAlerts: {
            type: Boolean,
            default: false,
        },

        compactView: {
            type: Boolean,
            default: false,
        },

        showCompletedItems: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "User",
    userSchema
);