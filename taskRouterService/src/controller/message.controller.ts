import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MessagePayload } from '../types/message';
import { produceMessage } from '../kafka/producer';

class MessageController {
async sendMessage(req : Request, res : Response){
    try {
        const payload = req.body as MessagePayload
        await produceMessage(payload)
    } catch (error) {
        throw new Error((error as any))
    }
}

}

export const messageController = new MessageController

//sendGrid --->>> process.env.SENDGRID
// senderMAil --->>process.env.SENDGRID
// acountSid --->> process.env.SENDGRID
// authToken -->>> process.env.SENDGRID
//twillioNumber -->> process.env.SENDGRID