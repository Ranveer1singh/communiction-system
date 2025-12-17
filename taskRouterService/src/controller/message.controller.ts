import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MessagePayload } from '../types/message';
import { produceMessage } from '../kafka/producer';
import { MessagePayloadSchema } from '../types/vaidation';
import { isDuplicate } from '../utility/duplicate';

class MessageController {
async sendMessage(req : Request, res : Response){
    try {
        const payload =MessagePayloadSchema.parse(req.body ) 
         if (isDuplicate(payload.messageId)) {
            console.log(`⚠️ Duplicate message ignored: ${payload.messageId}`);
             res.status(403).json({
                message : `⚠️ Duplicate message ignored: ${payload.messageId}`
             })
          }
        await produceMessage(payload)
        res.status(200).json({
            payload
        })
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