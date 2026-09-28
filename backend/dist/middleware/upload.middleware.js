"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/webp") {
            cb(null, true);
        }
        else {
            cb(new Error("Seuls les fichiers JPG, PNG et WebP sont autorisés"));
        }
    }
});
exports.default = upload;
