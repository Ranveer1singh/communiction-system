import { Schema, model } from "mongoose";

export enum StatusEnum {
  PENDING = "pending",
  DELIVERED = "delivered",
  FAILED = "failed",
  DUPLICATE= "duplicate"
}
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
    },
    to: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.PENDING,
    },
  },
  baseOptions
);

export const MessageModel = model("Message", BaseMessageSchema);
