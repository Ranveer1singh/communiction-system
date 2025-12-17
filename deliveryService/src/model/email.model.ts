import { Schema } from "mongoose";
import { MessageModel } from "./message.model";

const EmailMessageSchema = new Schema({
  subject: {
    type: String,
    required: false,
  },
});

export const EmailMessageModel = MessageModel.discriminator(
  "email",
  EmailMessageSchema
);
