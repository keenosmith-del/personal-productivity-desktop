import mongoose from "mongoose";

const alarmSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        label: {
            type: String,
            default: "Alarm",
            trim: true,
        },

        time: {
            type: String,
            required: true,
        },

        repeatDays: {
            type: [String],
            default: ["N"],
        },

        enabled: {
            type: Boolean,
            default: true,
        },

        snoozeEnabled: {
            type: Boolean,
            default: false,
        },

        snoozeDuration: {
            type: Number,
            default: 5,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Alarm",
    alarmSchema
);