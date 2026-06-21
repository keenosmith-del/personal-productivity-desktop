import express from "express";
import Reminder from "../models/Reminder.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const reminders =
                await Reminder.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(reminders);
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.post(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const reminder =
                await Reminder.create({
                    ...req.body,
                    user: req.user.id,
                });

            res.status(201).json(
                reminder
            );
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const reminder =
                await Reminder.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!reminder) {
                return res.status(404).json({
                    message:
                        "Reminder not found",
                });
            }

            const updatedReminder =
                await Reminder.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            res.json(
                updatedReminder
            );
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
            await Reminder.deleteMany({
                user: req.user.id,
            });

            res.json({
                message:
                    "All reminders deleted",
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
            const reminder =
                await Reminder.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!reminder) {
                return res.status(404).json({
                    message:
                        "Reminder not found",
                });
            }

            await reminder.deleteOne();

            res.json({
                message:
                    "Reminder deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;