import express from "express";

import Alarm from "../models/Alarm.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// GET ALL ALARMS
router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const alarms =
                await Alarm.find({
                    user: req.user.id,
                }).sort({
                    createdAt: -1,
                });

            res.json(alarms);
        } catch (error) {
            res.status(500).json({
                message:
                    "Failed to fetch alarms.",
            });
        }
    }
);


// CREATE ALARM
router.post(
    "/",
    authMiddleware,
    async (req, res) => {
        try {
            const alarm =
                await Alarm.create({
                    ...req.body,

                    user: req.user.id,
                });

            res.status(201).json(alarm);
        } catch (error) {
            res.status(500).json({
                message:
                    "Failed to create alarm.",
            });
        }
    }
);


// UPDATE ALARM
router.put(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const alarm =
                await Alarm.findOneAndUpdate(
                    {
                        _id: req.params.id,
                        user: req.user.id,
                    },
                    req.body,
                    {
                        new: true,
                    }
                );

            if (!alarm) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Alarm not found.",
                    });
            }

            res.json(alarm);
        } catch (error) {
            res.status(500).json({
                message:
                    "Failed to update alarm.",
            });
        }
    }
);


// DELETE ALARM
router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {
            const alarm =
                await Alarm.findOneAndDelete({
                    _id: req.params.id,
                    user: req.user.id,
                });

            if (!alarm) {
                return res
                    .status(404)
                    .json({
                        message:
                            "Alarm not found.",
                    });
            }

            res.json({
                message:
                    "Alarm deleted successfully.",
            });
        } catch (error) {
            res.status(500).json({
                message:
                    "Failed to delete alarm.",
            });
        }
    }
);

export default router;