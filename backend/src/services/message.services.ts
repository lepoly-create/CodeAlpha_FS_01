import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";

export const createConversation = async (
  userId: string,
  subject: string,
  content: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  if (user.role !== "customer") {
    throw new Error(
      "Seuls les clients peuvent créer une conversation"
    );
  }

  const conversation = await Conversation.create({
    user: userId,
    subject,
    status: "open",
  });

  const message = await Message.create({
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

export const getMyConversations = async (userId: string) => {
  return await Conversation.find({
    user: userId,
  })
    .sort({ updatedAt: -1 })
    .lean();
};

export const getConversationById = async (
  conversationId: string,
  userId: string
) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    user: userId,
  }).lean();

  if (!conversation) {
    throw new Error("Conversation introuvable");
  }

  const messages = await Message.find({
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

export const getAllConversations = async () => {
  return await Conversation.find()
    .populate("user", "fullName email")
    .sort({ updatedAt: -1 })
    .lean();
};

export const replyToConversation = async (
  conversationId: string,
  adminId: string,
  content: string
) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error("Conversation introuvable");
  }

  if (conversation.status === "closed") {
    throw new Error(
      "Cette conversation est fermée et ne peut plus recevoir de réponse"
    );
  }

  const admin = await User.findById(adminId);

  if (!admin) {
    throw new Error("Administrateur introuvable");
  }

  if (admin.role !== "admin") {
    throw new Error(
      "Seuls les administrateurs peuvent répondre"
    );
  }

  const message = await Message.create({
    conversation: conversation._id,
    sender: adminId,
    senderRole: "admin",
    content,
  });

  conversation.updatedAt = new Date();
  await conversation.save();

  return await Message.findById(message._id)
    .populate("sender", "fullName email role")
    .lean();
};

export const closeConversation = async (
  conversationId: string
) => {
  const conversation = await Conversation.findById(
    conversationId
  );

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