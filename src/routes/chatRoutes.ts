import express from 'express';
import { ChatController } from '../controllers/chatController';

const router = express.Router();
const chatController = new ChatController();

export function setChatRoutes(app: express.Application) {
    app.use('/chat', router);
    router.post('/', chatController.handleChat.bind(chatController));
}