import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const notifications =
                await Notification.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(notifications);
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:id/star",
    authMiddleware,
    async (req, res) => {
        try {
            const notification =
                await Notification.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!notification) {
                return res.status(404).json({
                    message:
                        "Notification not found",
                });
            }

            notification.starred =
                !notification.starred;

            await notification.save();

            res.json(notification);
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:id/read",
    authMiddleware,
    async (req, res) => {
        try {
            const notification =
                await Notification.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!notification) {
                return res.status(404).json({
                    message:
                        "Notification not found",
                });
            }

            notification.read =
                !notification.read;

            await notification.save();

            res.json(notification);
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:id/archive",
    authMiddleware,
    async (req, res) => {
        try {
            const notification =
                await Notification.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!notification) {
                return res.status(404).json({
                    message:
                        "Notification not found",
                });
            }

            notification.archived =
                !notification.archived;

            await notification.save();

            res.json(notification);
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.delete(
    "/all",
    authMiddleware,
    async (req, res) => {
        try {
            await Notification.deleteMany({
                user: req.user.id,
            });

            res.json({
                message:
                    "All notifications deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const notification =
                await Notification.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!notification) {
                return res.status(404).json({
                    message:
                        "Notification not found",
                });
            }

            await notification.deleteOne();

            res.json({
                message:
                    "Notification deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;