"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chatbot_1 = __importDefault(require("../bot/chatbot"));
class ChatController {
    constructor() {
        this.chatbot = new chatbot_1.default();
    }
    handleChat(req, res) {
        const userMessage = req.body.message;
        const botResponse = this.chatbot.processMessage(userMessage);
        res.json({ response: botResponse });
    }
}
exports.ChatController = ChatController;
