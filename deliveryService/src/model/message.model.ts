import { Schema, model } from "mongoose";

export const baseOptions = {
  discriminatorKey: "channel",
  collection: "messages",
  timestamps: true,
};

const BaseMessageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    to: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  baseOptions
);

export const MessageModel = model("Message", BaseMessageSchema);
