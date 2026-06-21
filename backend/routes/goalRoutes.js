import express from "express";
import Goal from "../models/Goal.js";
import authMiddleware from "../middleware/authMiddleware.js";

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

            const updatedGoal =
                await Goal.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            res.json(updatedGoal);
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

            await goal.deleteOne();

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