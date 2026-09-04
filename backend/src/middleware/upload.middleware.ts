import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (_req, file, cb) => {

        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Seuls les fichiers JPG, PNG et WebP sont autorisés"
                )
            );
        }
    }
});

export default upload;