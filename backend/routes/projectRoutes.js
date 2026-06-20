import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const projects =
                await Project.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(projects);
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
            const project =
                await Project.create({
                    ...req.body,

                    user: req.user.id,
                });

            res.status(201).json(
                project
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
            const project =
                await Project.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!project) {
                return res.status(404).json({
                    message:
                        "Project not found",
                });
            }

            const updatedProject =
                await Project.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            res.json(updatedProject);
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
            await Project.deleteMany({
                user: req.user.id,
            });

            res.json({
                message:
                    "All projects deleted",
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
            await Project.deleteMany({
                user: req.user.id,
                completed: true,
            });

            res.json({
                message:
                    "Completed projects deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/unpin-all",
    authMiddleware,
    async (req, res) => {
        try {
            await Project.updateMany(
                {
                    user: req.user.id,
                },
                {
                    pinned: false,
                }
            );

            res.json({
                message:
                    "Projects unpinned",
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
            const project =
                await Project.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!project) {
                return res.status(404).json({
                    message:
                        "Project not found",
                });
            }

            await project.deleteOne();

            res.json({
                message:
                    "Project deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;