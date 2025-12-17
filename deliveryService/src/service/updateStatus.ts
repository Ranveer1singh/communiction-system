import { EmailMessageModel } from "../model/email.model";
import { MessageModel, StatusEnum } from "../model/message.model";
import { MessagePayload } from "../types/message";

export const updateMessageStatus = async (
  messageId: string,
  status: StatusEnum,
) => {
  return MessageModel.findOneAndUpdate(
    { messageId },
    {
      status,
    },
    { new: true }
  );
};