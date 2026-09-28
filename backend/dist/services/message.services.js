"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConversation = exports.replyToConversation = exports.getAllConversations = exports.getConversationById = exports.getMyConversations = exports.createConversation = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
const createConversation = async (userId, subject, content) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    if (user.role !== "customer") {
        throw new Error("Seuls les clients peuvent créer une conversation");
    }
    const conversation = await Conversation_1.default.create({
        user: userId,
        subject,
        status: "open",
    });
    const message = await Message_1.default.create({
        conversation: conversation._id,
        sender: userId,
        senderRole: "customer",
        content,
    });
    return {
        conversation,
        message,
    };
};
exports.createConversation = createConversation;
const getMyConversations = async (userId) => {
    return await Conversation_1.default.find({
        user: userId,
    })
        .sort({ updatedAt: -1 })
        .lean();
};
exports.getMyConversations = getMyConversations;
const getConversationById = async (conversationId, userId) => {
    const conversation = await Conversation_1.default.findOne({
        _id: conversationId,
        user: userId,
    }).lean();
    if (!conversation) {
        throw new Error("Conversation introuvable");
    }
    const messages = await Message_1.default.find({
        conversation: conversation._id,
    })
        .populate("sender", "fullName email role")
        .sort({ createdAt: 1 })
        .lean();
    return {
        conversation,
        messages,
    };
};
exports.getConversationById = getConversationById;
const getAllConversations = async () => {
    return await Conversation_1.default.find()
        .populate("user", "fullName email")
        .sort({ updatedAt: -1 })
        .lean();
};
exports.getAllConversations = getAllConversations;
const replyToConversation = async (conversationId, adminId, content) => {
    const conversation = await Conversation_1.default.findById(conversationId);
    if (!conversation) {
        throw new Error("Conversation introuvable");
    }
    if (conversation.status === "closed") {
        throw new Error("Cette conversation est fermée et ne peut plus recevoir de réponse");
    }
    const admin = await User_1.default.findById(adminId);
    if (!admin) {
        throw new Error("Administrateur introuvable");
    }
    if (admin.role !== "admin") {
        throw new Error("Seuls les administrateurs peuvent répondre");
    }
    const message = await Message_1.default.create({
        conversation: conversation._id,
        sender: adminId,
        senderRole: "admin",
        content,
    });
    conversation.updatedAt = new Date();
    await conversation.save();
    return await Message_1.default.findById(message._id)
        .populate("sender", "fullName email role")
        .lean();
};
exports.replyToConversation = replyToConversation;
const closeConversation = async (conversationId) => {
    const conversation = await Conversation_1.default.findById(conversationId);
    if (!conversation) {
        throw new Error("Conversation introuvable");
    }
    if (conversation.status === "closed") {
        throw new Error("Cette conversation est déjà fermée");
    }
    conversation.status = "closed";
    await conversation.save();
    return conversation;
};
exports.closeConversation = closeConversation;
