import { Request, Response } from "express";
import {
  createConversation,
  getMyConversations,
  getConversationById,
  getAllConversations,
  replyToConversation,
  closeConversation,
} from "../services/message.services";

export const createMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { subject, content } = req.body;

    const result = await createConversation(
      req.user.id,
      subject,
      content
    );

    res.status(201).json({
      success: true,
      message: "Message envoyé avec succès",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const conversations = await getMyConversations(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const conversationId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const conversation = await getConversationById(
      conversationId,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const conversations = await getAllConversations();

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const replyToMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const conversationId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { content } = req.body;

    const message = await replyToConversation(
      conversationId,
      req.user.id,
      content
    );

    res.status(201).json({
      success: true,
      message: "Réponse envoyée avec succès",
      data: message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const closeMessageConversation = async (
  req: Request,
  res: Response
) => {
  try {
    const conversationId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const conversation = await closeConversation(
      conversationId
    );

    res.status(200).json({
      success: true,
      message: "Conversation fermée avec succès",
      data: conversation,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};