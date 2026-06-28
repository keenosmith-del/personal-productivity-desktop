import mongoose from "mongoose";

const taskSchema =
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

            description: {
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

            linkedItems: {
                type: [String],
                default: [],
            },

            linkedProjects: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Project",
                },
            ],

            linkedTasks: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Task",
                },
            ],

            linkedGoals: [
                {
                    type:
                        mongoose.Schema.Types.ObjectId,
                    ref: "Goal",
                },
            ],

            linkedNotes: [
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
    "Task",
    taskSchema
);