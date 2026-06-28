import express from "express";
import Goal from "../models/Goal.js";
import authMiddleware from "../middleware/authMiddleware.js";

import createNotification from "../utils/createNotification.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const goals =
                await Goal.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(goals);
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
            const goal =
                await Goal.create({
                    ...req.body,

                    user: req.user.id,
                });

            await createNotification({
                user: req.user.id,

                title: "Goal Created",

                description:
                    `"${goal.title}" was created.`,

                type: "goal",

                action: "created",

                relatedId: goal._id,
            });

            res.status(201).json(
                goal
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
            const goal =
                await Goal.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!goal) {
                return res.status(404).json({
                    message:
                        "Goal not found",
                });
            }

            const wasCompleted =
                goal.completed;

            const updatedGoal =
                await Goal.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            if (
                !wasCompleted &&
                updatedGoal.completed
            ) {
                await createNotification({
                    user: req.user.id,

                    title:
                        "Goal Completed",

                    description:
                        `"${updatedGoal.title}" was completed.`,

                    type: "goal",

                    action:
                        "completed",

                    relatedId:
                        updatedGoal._id,
                });
            } else {
                await createNotification({
                    user: req.user.id,

                    title:
                        "Goal Updated",

                    description:
                        `"${updatedGoal.title}" was updated.`,

                    type: "goal",

                    action:
                        "updated",

                    relatedId:
                        updatedGoal._id,
                });
            }

            res.json(updatedGoal);
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.delete(
    "/active",
    authMiddleware,
    async (req, res) => {
        try {
            await Goal.deleteMany({
                user: req.user.id,
                completed: false,
            });

            res.json({
                message: "Active goals deleted",
            });
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
            await Goal.deleteMany({
                user: req.user.id,
            });

            res.json({
                message:
                    "All goals deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.delete(
    "/completed",
    authMiddleware,
    async (req, res) => {
        try {
            await Goal.deleteMany({
                user: req.user.id,
                completed: true,
            });

            res.json({
                message:
                    "Completed goals deleted",
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
            const goal =
                await Goal.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!goal) {
                return res.status(404).json({
                    message:
                        "Goal not found",
                });
            }

            const goalTitle =
                goal.title;

            await goal.deleteOne();

            await createNotification({
                user: req.user.id,

                title: "Goal Deleted",

                description:
                    `"${goalTitle}" was deleted.`,

                type: "goal",

                action: "deleted",
            });

            res.json({
                message:
                    "Goal deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;