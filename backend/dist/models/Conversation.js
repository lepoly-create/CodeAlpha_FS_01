"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
        index: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Conversation", conversationSchema);
