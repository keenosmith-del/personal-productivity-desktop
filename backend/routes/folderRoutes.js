import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import createNotification from "../utils/createNotification.js";

import Note from "../models/Note.js";
import Folder from "../models/Folder.js";

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
                ).populate({
                    path: "notes",
                    options: {
                        sort: {
                            createdAt: -1,
                        },
                    },
                });

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

            const note = await Note.findOne({
                _id: req.params.noteId,
                user: req.user.id,
            });

            if (!note) {
                return res.status(404).json({
                    message: "Note not found",
                });
            }

            // If the note already belongs to another folder,
            // remove it from that folder first.
            if (
                note.folder &&
                note.folder.toString() !== folder._id.toString()
            ) {
                await Folder.updateOne(
                    {
                        _id: note.folder,
                        user: req.user.id,
                    },
                    {
                        $pull: {
                            notes: note._id,
                        },
                    }
                );
            }

            // Add the note to the new folder if it isn't already there.
            if (
                !folder.notes.some(
                    (id) =>
                        id.toString() === req.params.noteId
                )
            ) {
                folder.notes.push(note._id);
            }

            // Update the note's folder reference.
            note.folder = folder._id;

            await note.save();

            await folder.save();

            await folder.populate({
                path: "notes",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });

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

            const note = await Note.findOne({
                _id: req.params.noteId,
                user: req.user.id,
            });

            if (note) {
                note.folder = null;
                await note.save();
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
    "/:folderId/notes",
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

            await Note.updateMany(
                {
                    user: req.user.id,
                    folder: folder._id,
                },
                {
                    $set: {
                        folder: null,
                    },
                }
            );

            folder.notes = [];

            await folder.save();

            await folder.populate({
                path: "notes",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });

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

            // Remove the folder reference from all notes
            await Note.updateMany(
                {
                    user: req.user.id,
                    folder: folder._id,
                },
                {
                    $set: {
                        folder: null,
                    },
                }
            );

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