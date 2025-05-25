"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const router = express_1.default.Router();
const chatController = new chatController_1.ChatController();
function setChatRoutes(app) {
    app.use('/chat', router);
    router.post('/', chatController.handleChat.bind(chatController));
}
exports.setChatRoutes = setChatRoutes;
