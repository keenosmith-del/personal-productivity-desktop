import express from "express";
import Folder from "../models/Folder.js";
import authMiddleware from "../middleware/authMiddleware.js";

import createNotification from "../utils/createNotification.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const folders =
                await Folder.find({
                    user: req.user.id,
                })
                    .populate({
                        path: "notes",
                        options: {
                            sort: {
                                createdAt: -1,
                            },
                        },
                    })
                    .sort({
                        createdAt: -1,
                    });

            res.json(folders);

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
            const folder =
                await Folder.create({
                    ...req.body,

                    user: req.user.id,
                });

            await createNotification({
                user: req.user.id,

                title: "Folder Created",

                description:
                    `"${folder.title}" was created.`,

                type: "folder",

                action: "created",

                relatedId: folder._id,
            });

            res.status(201).json(
                folder
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
            const folder =
                await Folder.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!folder) {
                return res.status(404).json({
                    message:
                        "Folder not found",
                });
            }

            const updatedFolder =
                await Folder.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            await createNotification({
                user: req.user.id,

                title:
                    "Folder Updated",

                description:
                    `"${updatedFolder.title}" was updated.`,

                type: "folder",

                action:
                    "updated",

                relatedId:
                    updatedFolder._id,
            });

            res.json(updatedFolder);

        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:folderId/notes/:noteId",
    authMiddleware,
    async (req, res) => {
        try {
            const folder = await Folder.findOne({
                _id: req.params.folderId,
                user: req.user.id,
            });

            if (!folder) {
                return res.status(404).json({
                    message: "Folder not found",
                });
            }

            if (
                !folder.notes.includes(req.params.noteId)
            ) {
                folder.notes.push(req.params.noteId);
            }

            await folder.save();

            await folder.populate("notes");

            res.json(folder);

        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.delete(
    "/:folderId/notes/:noteId",
    authMiddleware,
    async (req, res) => {
        try {
            const folder = await Folder.findOne({
                _id: req.params.folderId,
                user: req.user.id,
            });

            if (!folder) {
                return res.status(404).json({
                    message: "Folder not found",
                });
            }

            folder.notes = folder.notes.filter(
                (noteId) =>
                    noteId.toString() !==
                    req.params.noteId
            );

            await folder.save();

            await folder.populate("notes");

            res.json(folder);

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
            const folder =
                await Folder.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!folder) {
                return res.status(404).json({
                    message:
                        "Folder not found",
                });
            }

            const folderTitle =
                folder.title;

            await folder.deleteOne();

            await createNotification({
                user: req.user.id,

                title:
                    "Folder Deleted",

                description:
                    `"${folderTitle}" was deleted.`,

                type: "folder",

                action:
                    "deleted",
            });

            res.json({
                message:
                    "Folder deleted",
            });

        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;