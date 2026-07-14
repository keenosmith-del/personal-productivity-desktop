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
            const notes =
                await Note.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(notes);
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
            const note =
                await Note.create({
                    ...req.body,
                    user: req.user.id,
                });

            if (note.folder) {
                await Folder.findOneAndUpdate(
                    {
                        _id: note.folder,
                        user: req.user.id,
                    },
                    {
                        $addToSet: {
                            notes: note._id,
                        },
                    }
                );
            }

            await createNotification({
                user: req.user.id,

                title: "Note Created",

                description:
                    `"${note.title}" was created.`,

                type: "note",

                action: "created",

                relatedId: note._id,
            });

            res.status(201).json(note);

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
            const note =
                await Note.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!note) {
                return res.status(404).json({
                    message:
                        "Note not found",
                });
            }

            const updatedNote =
                await Note.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true,
                    }
                );

            await createNotification({
                user: req.user.id,

                title:
                    "Note Updated",

                description:
                    `"${updatedNote.title}" was updated.`,

                type: "note",

                action:
                    "updated",

                relatedId:
                    updatedNote._id,
            });

            res.json(updatedNote);
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
            const note = await Note.findOne({
                _id: req.params.id,
                user: req.user.id,
            });

            if (!note) {
                return res.status(404).json({
                    message: "Note not found",
                });
            }

            let archivedFolder =
                await Folder.findOne({
                    user: req.user.id,
                    isSystem: true,
                });

            if (!archivedFolder) {
                archivedFolder =
                    await Folder.create({
                        user: req.user.id,

                        title: "Archived",

                        description:
                            "Your archived notes",

                        isSystem: true,
                    });
            }

            // Remove note from every folder
            await Folder.updateMany(
                {
                    user: req.user.id,
                    notes: note._id,
                },
                {
                    $pull: {
                        notes: note._id,
                    },
                }
            );

            // Add note to Archived folder
            await Folder.findByIdAndUpdate(
                archivedFolder._id,
                {
                    $addToSet: {
                        notes: note._id,
                    },
                }
            );

            note.archived = true;

            await note.save();

            await createNotification({
                user: req.user.id,

                title: "Note Archived",

                description: `"${note.title}" was archived.`,

                type: "note",

                action: "archived",

                relatedId: note._id,
            });

            await note.populate("folder");

            res.json(note);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:id/unarchive",
    authMiddleware,
    async (req, res) => {
        try {
            const note = await Note.findOne({
                _id: req.params.id,
                user: req.user.id,
            });

            if (!note) {
                return res.status(404).json({
                    message: "Note not found",
                });
            }

            const archivedFolder =
                await Folder.findOne({
                    user: req.user.id,
                    isSystem: true,
                });

            if (archivedFolder) {
                await Folder.findByIdAndUpdate(
                    archivedFolder._id,
                    {
                        $pull: {
                            notes: note._id,
                        },
                    }
                );
            }

            note.archived = false;

            await note.save();

            await createNotification({
                user: req.user.id,

                title: "Note Unarchived",

                description: `"${note.title}" was unarchived.`,

                type: "note",

                action: "unarchived",

                relatedId: note._id,
            });

            await note.populate("folder");

            res.json(note);

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.put(
    "/:noteId/folder/:folderId",
    authMiddleware,
    async (req, res) => {
        try {
            const note = await Note.findOne({
                _id: req.params.noteId,
                user: req.user.id,
            });

            if (!note) {
                return res.status(404).json({
                    message: "Note not found",
                });
            }

            note.folder = req.params.folderId;

            await note.save();

            await note.populate("folder");

            res.json(note);

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
            await Note.deleteMany({
                user: req.user.id,
            });

            res.json({
                message:
                    "All notes deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

router.delete(
    "/pinned",
    authMiddleware,
    async (req, res) => {
        try {
            await Note.updateMany(
                {
                    user: req.user.id,
                    pinned: true,
                },
                {
                    pinned: false,
                }
            );

            res.json({
                message:
                    "Pinned notes cleared",
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
            const note =
                await Note.findOne({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!note) {
                return res.status(404).json({
                    message:
                        "Note not found",
                });
            }

            const noteTitle =
                note.title;

            // Remove the note from every folder that contains it
            await Folder.updateMany(
                {
                    user: req.user.id,
                    notes: note._id,
                },
                {
                    $pull: {
                        notes: note._id,
                    },
                }
            );

            await note.deleteOne();

            await createNotification({
                user: req.user.id,

                title: "Note Deleted",

                description:
                    `"${noteTitle}" was deleted.`,

                type: "note",

                action: "deleted",
            });

            res.json({
                message:
                    "Note deleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Server error",
            });
        }
    }
);

export default router;