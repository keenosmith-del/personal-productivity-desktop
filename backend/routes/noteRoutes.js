import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js";

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

            res.status(201).json(
                note
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

            res.json(updatedNote);
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

            await note.deleteOne();

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