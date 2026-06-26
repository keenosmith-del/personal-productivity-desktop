import mongoose from "mongoose";

const projectSchema =
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

            progress: {
                type: Number,
                default: 0,
            },

            selectedTasks: {
                type: [String],
                default: [],
            },

            selectedGoals: {
                type: [String],
                default: [],
            },

            selectedNotes: {
                type: [String],
                default: [],
            },

            selectedReminders: {
                type: [String],
                default: [],
            },

            tasks: {
                type: Number,
                default: 0,
            },

            goals: {
                type: Number,
                default: 0,
            },

            notes: {
                type: Number,
                default: 0,
            },

            reminders: {
                type: Number,
                default: 0,
            },

            pinned: {
                type: Boolean,
                default: false,
            },

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
    "Project",
    projectSchema
);