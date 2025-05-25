import { Request, Response } from 'express';
import Chatbot from '../bot/chatbot';

export class ChatController {
    private chatbot: Chatbot;

    constructor() {
        this.chatbot = new Chatbot();
    }

    async handleChat(req: Request, res: Response) {
        const userMessage = req.body.message;
        const botResponse = await this.chatbot.processMessage(userMessage);
        res.json({ response: botResponse });
    }
}