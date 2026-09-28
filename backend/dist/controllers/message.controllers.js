"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeMessageConversation = exports.replyToMessage = exports.getAdminMessages = exports.getMyConversation = exports.getMyMessages = exports.createMessage = void 0;
const message_services_1 = require("../services/message.services");
const createMessage = async (req, res) => {
    try {
        const { subject, content } = req.body;
        const result = await (0, message_services_1.createConversation)(req.user.id, subject, content);
        res.status(201).json({
            success: true,
            message: "Message envoyé avec succès",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createMessage = createMessage;
const getMyMessages = async (req, res) => {
    try {
        const conversations = await (0, message_services_1.getMyConversations)(req.user.id);
        res.status(200).json({
            success: true,
            data: conversations,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMyMessages = getMyMessages;
const getMyConversation = async (req, res) => {
    try {
        const conversationId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const conversation = await (0, message_services_1.getConversationById)(conversationId, req.user.id);
        res.status(200).json({
            success: true,
            data: conversation,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMyConversation = getMyConversation;
const getAdminMessages = async (req, res) => {
    try {
        const conversations = await (0, message_services_1.getAllConversations)();
        res.status(200).json({
            success: true,
            data: conversations,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAdminMessages = getAdminMessages;
const replyToMessage = async (req, res) => {
    try {
        const conversationId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const { content } = req.body;
        const message = await (0, message_services_1.replyToConversation)(conversationId, req.user.id, content);
        res.status(201).json({
            success: true,
            message: "Réponse envoyée avec succès",
            data: message,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.replyToMessage = replyToMessage;
const closeMessageConversation = async (req, res) => {
    try {
        const conversationId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const conversation = await (0, message_services_1.closeConversation)(conversationId);
        res.status(200).json({
            success: true,
            message: "Conversation fermée avec succès",
            data: conversation,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.closeMessageConversation = closeMessageConversation;
