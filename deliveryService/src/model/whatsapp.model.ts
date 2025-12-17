import { Schema } from "mongoose";
import { MessageModel } from "./message.model";

const WhatsAppMessageSchema = new Schema({
  mediaUrl: {
    type: String,
    required: false,
  },
});

export const WhatsAppMessageModel = MessageModel.discriminator(
  "whatsapp",
  WhatsAppMessageSchema
);
