"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    conversation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
        index: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    senderRole: {
        type: String,
        enum: ["customer", "admin"],
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Message", messageSchema);
