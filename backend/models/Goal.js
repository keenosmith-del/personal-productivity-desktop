import mongoose from "mongoose";

const goalSchema =
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

            category: {
                type: String,
                default: "",
            },

            priority: {
                type: String,
                default: "Medium",
            },

            status: {
                type: String,
                default: "Active",
            },

            progress: {
                type: Number,
                default: 0,
            },

            targetDate: {
                type: String,
                default: "",
            },

            completedDate: {
                type: String,
                default: null,
            },

            completed: {
                type: Boolean,
                default: false,
            },

            associatedTasks: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Task",
                },
            ],
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Goal",
    goalSchema
);