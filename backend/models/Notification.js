import mongoose from "mongoose";

const notificationSchema =
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
                required: true,
            },

            type: {
                type: String,
                default: "system",
            },

            action: {
                type: String,
                default: "created",
            },

            relatedId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                default: null,
            },

            starred: {
                type: Boolean,
                default: false,
            },

            archived: {
                type: Boolean,
                default: false,
            },

            read: {
                type: Boolean,
                default: false,
            },
        },
        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "Notification",
    notificationSchema
);