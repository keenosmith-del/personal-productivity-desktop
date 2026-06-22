import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

import createNotification from "../utils/createNotification.js";

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

            await createNotification({
                user: req.user.id,

                title: "Project Created",

                description:
                    `"${project.title}" was created.`,

                type: "project",

                action: "created",

                relatedId: project._id,
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

            const wasCompleted =
                project.completed;

            const updatedProject =
                await Project.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            if (
                !wasCompleted &&
                updatedProject.completed
            ) {
                await createNotification({
                    user: req.user.id,

                    title:
                        "Project Completed",

                    description:
                        `"${updatedProject.title}" was completed.`,

                    type: "project",

                    action:
                        "completed",

                    relatedId:
                        updatedProject._id,
                });
            } else {
                await createNotification({
                    user: req.user.id,

                    title:
                        "Project Updated",

                    description:
                        `"${updatedProject.title}" was updated.`,

                    type: "project",

                    action:
                        "updated",

                    relatedId:
                        updatedProject._id,
                });
            }

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

            const projectTitle =
                project.title;

            await project.deleteOne();

            await createNotification({
                user: req.user.id,

                title: "Project Deleted",

                description:
                    `"${projectTitle}" was deleted.`,

                type: "project",

                action: "deleted",
            });

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