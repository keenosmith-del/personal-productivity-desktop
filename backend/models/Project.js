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

            progress: {
                type: Number,
                default: 0,
            },

            pinned: {
                type: Boolean,
                default: false,
            },

            completed: {
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