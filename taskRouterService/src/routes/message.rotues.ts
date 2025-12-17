import express, { Request, Response } from "express"
import { messageController } from "../controller/message.controller";

const messageRouter = express.Router();

messageRouter.post('/', messageController.sendMessage)

export default messageRouter