import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
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

            maxlength: 100,
        },

        description: {
            type: String,

            default: "",

            trim: true,

            maxlength: 500,
        },

        pinned: {
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

        hidden: {
            type: Boolean,

            default: false,
        },
        isSystem: {
            type: Boolean,

            default: false,
        },
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Folder",
    folderSchema
);