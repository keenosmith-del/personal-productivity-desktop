import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/avatars");
    },

    filename(req, file, cb) {
        const ext = path.extname(file.originalname);

        cb(
            null,
            `${crypto.randomUUID()}${ext}`
        );
    },
});

const fileFilter = (
    req,
    file,
    cb
) => {
    if (
        file.mimetype.startsWith("image/")
    ) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only image files are allowed."
            )
        );
    }
};

const uploadAvatar = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default uploadAvatar;