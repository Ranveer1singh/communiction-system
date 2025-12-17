import { Schema } from "mongoose";
import { MessageModel } from "./message.model";

const SmsMessageSchema = new Schema({
  senderId: {
    type: String,
    required: false,
  },
});

export const SmsMessageModel = MessageModel.discriminator(
  "sms",
  SmsMessageSchema
);
