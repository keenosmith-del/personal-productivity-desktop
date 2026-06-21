import mongoose from "mongoose";

const reminderSchema =
    new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            title: {
                type: String,
                required: true,
            },

            description: {
                type: String,
                default: "",
            },

            reminderDate: {
                type: String,
                default: "",
            },

            category: {
                type: String,
                default: "Personal",
            },

            priority: {
                type: String,
                default: "Medium",
            },

            completed: {
                type: Boolean,
                default: false,
            },
            completedDate: {
                type: String,
                default: null,
            },
        },
        {
            timestamps: true,
        },
    );

export default mongoose.model(
    "Reminder",
    reminderSchema
);