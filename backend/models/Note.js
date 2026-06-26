import mongoose from "mongoose";

const noteSchema =
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
                trim: true,
            },

            content: {
                type: String,
                default: "",
            },

            dueDate: {
                type: String,
                default: "",
            },

            completedDate: {
                type: String,
                default: null,
            },

            category: {
                type: String,
                default: "Personal",
            },

            priority: {
                type: String,
                default: "Medium",
            },

            status: {
                type: String,
                default: "Active",
            },

            completed: {
                type: Boolean,
                default: false,
            },

            flagged: {
                type: Boolean,
                default: false,
            },

            liked: {
                type: Boolean,
                default: false,
            },

            commentCount: {
                type: Number,
                default: 0,
            },

            linkedProjects: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Project",
                },
            ],

            linkedGoals: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Goal",
                },
            ],

            linkedReminders: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Note",
                },
            ],

            linkedReminders: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Reminder",
                },
            ],
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Note",
    noteSchema
);