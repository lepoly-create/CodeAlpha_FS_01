"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReplySchema = exports.createConversationSchema = void 0;
const zod_1 = require("zod");
exports.createConversationSchema = zod_1.z.object({
    body: zod_1.z.object({
        subject: zod_1.z
            .string()
            .min(3, "Le sujet doit contenir au moins 3 caractères")
            .max(150, "Le sujet est trop long")
            .trim(),
        content: zod_1.z
            .string()
            .min(1, "Le message est requis")
            .max(5000, "Le message est trop long")
            .trim(),
    }),
});
exports.createReplySchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z
            .string()
            .min(1, "Le message est requis")
            .max(5000, "Le message est trop long")
            .trim(),
    }),
});
