import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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

        theme: {
            type: String,
            default: "Dark",
        },

        dailySummary: {
            type: Boolean,
            default: true,
        },

        goalNotifications: {
            type: Boolean,
            default: true,
        },

        reminderNotifications: {
            type: Boolean,
            default: true,
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