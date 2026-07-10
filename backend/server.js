import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import alarmRoutes from "./routes/alarmRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(process.cwd(), "uploads")
    )
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/projects",
    projectRoutes
);

app.use(
    "/api/tasks",
    taskRoutes
);

app.use(
    "/api/goals",
    goalRoutes
);

app.use(
    "/api/reminders",
    reminderRoutes
);

app.use(
    "/api/notes",
    noteRoutes
);

app.use(
    "/api/alarms",
    alarmRoutes
);

app.use(
    "/api/folders",
    folderRoutes
);

app.use(
    "/api/notifications",
    notificationRoutes
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