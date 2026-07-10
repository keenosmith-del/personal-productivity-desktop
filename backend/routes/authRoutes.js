import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadAvatar from "../middleware/uploadAvatar.js";
import fs from "fs";

const router = express.Router();

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Goal from "../models/Goal.js";
import Note from "../models/Note.js";
import Reminder from "../models/Reminder.js";
import Alarm from "../models/Alarm.js";
import Notification from "../models/Notification.js";

router.post(
    "/register",
    async (req, res) => {
        try {
            const {
                name,
                email,
                password,
                job,
            } = req.body;

            const existingUser =
                await User.findOne({
                    email,
                });

            if (existingUser) {
                return res.status(400).json({
                    message:
                        "User already exists",
                });
            }

            const salt =
                await bcrypt.genSalt(10);

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    salt
                );

            const user =
                await User.create({
                    name,
                    email,
                    password:
                        hashedPassword,
                    job,
                });

            res.status(201).json({
                message:
                    "User registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    job: user.job,
                },
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message:
                    "Server error",
            });
        }
    }
);

router.post(
    "/login",
    async (req, res) => {
        try {
            const {
                email,
                password,
            } = req.body;

            const user =
                await User.findOne({
                    email,
                });

            if (!user) {
                return res.status(400).json({
                    message:
                        "Invalid credentials",
                });
            }

            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!passwordMatch) {
                return res.status(400).json({
                    message:
                        "Invalid credentials",
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );

            res.json({
                message:
                    "Login successful",

                token,

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    job: user.job,
                    avatar: user.avatar,

                    bio: user.bio,

                    theme: user.theme,

                    pushNotifications: user.pushNotifications,
                    dailySummary: user.dailySummary,
                    weeklySummary: user.weeklySummary,
                    taskAlerts: user.taskAlerts,
                    reminderAlerts: user.reminderAlerts,
                    projectAlerts: user.projectAlerts,

                    compactView:
                        user.compactView,
                    showCompletedItems:
                        user.showCompletedItems,

                    createdAt:
                        user.createdAt,
                },
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message:
                    "Server error",
            });
        }
    }
);

router.get("/users", async (req, res) => {
    try {
        const users = await User.find(
            {},
            {
                password: 0,
            }
        );

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.get(
    "/me",
    authMiddleware,
    async (req, res) => {
        const user =
            await User.findById(
                req.user.id
            ).select("-password");

        res.json(user);
    }
);

router.put(
    "/preferences",
    authMiddleware,
    async (req, res) => {
        try {
            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        "User not found",
                });
            }

            const {
                theme,
                pushNotifications,
                dailySummary,
                weeklySummary,
                taskAlerts,
                reminderAlerts,
                projectAlerts,
                compactView,
                showCompletedItems,
            } = req.body;

            if (theme !== undefined) {
                user.theme = theme;
            }

            if (pushNotifications !== undefined) {
                user.pushNotifications = pushNotifications;
            }

            if (dailySummary !== undefined) {
                user.dailySummary = dailySummary;
            }

            if (weeklySummary !== undefined) {
                user.weeklySummary = weeklySummary;
            }

            if (taskAlerts !== undefined) {
                user.taskAlerts = taskAlerts;
            }

            if (reminderAlerts !== undefined) {
                user.reminderAlerts = reminderAlerts;
            }

            if (projectAlerts !== undefined) {
                user.projectAlerts = projectAlerts;
            }

            if (
                compactView !== undefined
            ) {
                user.compactView =
                    compactView;
            }

            if (
                showCompletedItems !==
                undefined
            ) {
                user.showCompletedItems =
                    showCompletedItems;
            }

            await user.save();

            res.json(user);

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.put(
    "/profile",
    authMiddleware,
    uploadAvatar.single("avatar"),
    async (req, res) => {
        try {
            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        "User not found",
                });
            }

            const {
                name,
                email,
                job,
                bio,
                removeAvatar,
            } = req.body;

            if (name !== undefined) {
                user.name = name;
            }

            if (email !== undefined) {

                const existingUser =
                    await User.findOne({
                        email,
                        _id: { $ne: user._id },
                    });

                if (existingUser) {
                    return res.status(400).json({
                        message:
                            "Email already in use",
                    });
                }

                user.email =
                    email.toLowerCase();
            }

            if (job !== undefined) {
                user.job = job;
            }

            if (bio !== undefined) {
                user.bio = bio;
            }

            if (
                removeAvatar === true ||
                removeAvatar === "true"
            ) {

                if (user.avatar) {

                    const oldPath = `.${user.avatar}`;

                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }

                user.avatar = "";
            }

            if (req.file) {
                if (user.avatar) {
                    const oldPath = `.${user.avatar}`;

                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }

                user.avatar = `/uploads/avatars/${req.file.filename}`;
            }

            await user.save();

            const updatedUser =
                await User.findById(
                    user._id
                ).select("-password");

            res.json(
                updatedUser
            );

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.put(
    "/password",
    authMiddleware,
    async (req, res) => {
        try {
            const {
                currentPassword,
                newPassword,
            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            const passwordMatch =
                await bcrypt.compare(
                    currentPassword,
                    user.password
                );

            if (!passwordMatch) {
                return res.status(400).json({
                    message:
                        "Current password is incorrect",
                });
            }

            const salt =
                await bcrypt.genSalt(10);

            user.password =
                await bcrypt.hash(
                    newPassword,
                    salt
                );

            await user.save();

            res.json({
                message:
                    "Password updated successfully",
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.put(
    "/change-password",
    authMiddleware,
    async (req, res) => {
        try {
            const {
                currentPassword,
                newPassword,
            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        "User not found",
                });
            }

            const passwordMatch =
                await bcrypt.compare(
                    currentPassword,
                    user.password
                );

            if (!passwordMatch) {
                return res.status(400).json({
                    message:
                        "Current password is incorrect",
                });
            }

            const salt =
                await bcrypt.genSalt(10);

            user.password =
                await bcrypt.hash(
                    newPassword,
                    salt
                );

            await user.save();

            res.json({
                message:
                    "Password updated successfully",
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.get(
    "/export-data",
    authMiddleware,
    async (req, res) => {
        try {

            const user =
                await User.findById(
                    req.user.id
                ).select("-password");

            const [
                tasks,
                projects,
                goals,
                notes,
                reminders,
            ] = await Promise.all([
                Task.find({
                    user: req.user.id,
                }),

                Project.find({
                    user: req.user.id,
                }),

                Goal.find({
                    user: req.user.id,
                }),

                Note.find({
                    user: req.user.id,
                }),

                Reminder.find({
                    user: req.user.id,
                }),
            ]);

            res.json({
                exportedAt:
                    new Date(),

                profile: user,

                tasks,
                projects,
                goals,
                notes,
                reminders,
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.delete(
    "/clear-data",
    authMiddleware,
    async (req, res) => {
        try {

            const { password } =
                req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {
                return res.status(401).json({
                    message:
                        "Incorrect password",
                });
            }

            await Promise.all([
                Task.deleteMany({
                    user: req.user.id,
                }),

                Project.deleteMany({
                    user: req.user.id,
                }),

                Goal.deleteMany({
                    user: req.user.id,
                }),

                Note.deleteMany({
                    user: req.user.id,
                }),

                Reminder.deleteMany({
                    user: req.user.id,
                }),

                Alarm.deleteMany({
                    user: req.user.id,
                }),

                Notification.deleteMany({
                    user: req.user.id,
                }),
            ]);

            res.json({
                message:
                    "All user data cleared",
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.delete(
    "/delete-account",
    authMiddleware,
    async (req, res) => {
        try {

            const { password } =
                req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {
                return res.status(401).json({
                    message:
                        "Incorrect password",
                });
            }

            await Promise.all([
                Task.deleteMany({
                    user: req.user.id,
                }),

                Project.deleteMany({
                    user: req.user.id,
                }),

                Goal.deleteMany({
                    user: req.user.id,
                }),

                Note.deleteMany({
                    user: req.user.id,
                }),

                Reminder.deleteMany({
                    user: req.user.id,
                }),
            ]);

            await User.findByIdAndDelete(
                req.user.id
            );

            res.json({
                message:
                    "Account deleted successfully",
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.put(
    "/reset-password",
    async (req, res) => {
        try {
            const {
                email,
                newPassword,
            } = req.body;

            const user =
                await User.findOne({
                    email,
                });

            if (!user) {
                return res.status(404).json({
                    message:
                        "User not found",
                });
            }

            const salt =
                await bcrypt.genSalt(10);

            user.password =
                await bcrypt.hash(
                    newPassword,
                    salt
                );

            await user.save();

            res.json({
                message:
                    "Password reset successfully",
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

router.delete(
    "/delete-user",
    async (req, res) => {
        try {
            const {
                email,
                password,
            } = req.body;

            const user =
                await User.findOne({
                    email,
                });

            if (!user) {
                return res.status(404).json({
                    message:
                        "User not found",
                });
            }

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {
                return res.status(401).json({
                    message:
                        "Incorrect password",
                });
            }

            await User.findByIdAndDelete(
                user._id
            );

            res.json({
                message:
                    "User deleted successfully",
            });

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    }
);

export default router;