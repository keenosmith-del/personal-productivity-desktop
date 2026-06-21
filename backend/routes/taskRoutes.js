import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const tasks =
                await Task.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(tasks);
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
            const task =
                await Task.create({
                    ...req.body,

                    user: req.user.id,
                });

            res.status(201).json(
                task
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
            const task =
                await Task.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!task) {
                return res.status(404).json({
                    message:
                        "Task not found",
                });
            }

            const updatedTask =
                await Task.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            res.json(updatedTask);
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
            await Task.deleteMany({
                user: req.user.id,
            });

            res.json({
                message:
                    "All tasks deleted",
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
            await Task.deleteMany({
                user: req.user.id,
                completed: true,
            });

            res.json({
                message:
                    "Completed tasks deleted",
            });
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
            await Task.deleteMany({
                user: req.user.id,
                completed: false,
            });

            res.json({
                message:
                    "Active tasks deleted",
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
            const task =
                await Task.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!task) {
                return res.status(404).json({
                    message:
                        "Task not found",
                });
            }

            await task.deleteOne();

            res.json({
                message:
                    "Task deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;