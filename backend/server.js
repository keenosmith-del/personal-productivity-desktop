import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/projects",
    projectRoutes
);

app.get("/", (req, res) => {
    res.json({
        message: "Personal Productivity API running",
    });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});