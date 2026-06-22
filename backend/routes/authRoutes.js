import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

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
                dailySummary,
                goalNotifications,
                reminderNotifications,
                compactView,
                showCompletedItems,
            } = req.body;

            if (theme !== undefined) {
                user.theme = theme;
            }

            if (
                dailySummary !== undefined
            ) {
                user.dailySummary =
                    dailySummary;
            }

            if (
                goalNotifications !== undefined
            ) {
                user.goalNotifications =
                    goalNotifications;
            }

            if (
                reminderNotifications !==
                undefined
            ) {
                user.reminderNotifications =
                    reminderNotifications;
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

export default router;