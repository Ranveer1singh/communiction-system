import { EmailMessageModel } from "../model/email.model";
import { StatusEnum } from "../model/message.model";
import { SmsMessageModel } from "../model/sms.model";
import { WhatsAppMessageModel } from "../model/whatsapp.model";
import { updateMessageStatus } from "./updateStatus";

export const handleMessageByTopic = async (
  topic: string,
  payload: any
) => {
  try {
    switch (topic) {
      case "message.email":
        await EmailMessageModel.create(payload);
        break;

      case "message.sms":
        await SmsMessageModel.create(payload);
        break;

      case "message.whatsapp":
        await WhatsAppMessageModel.create(payload);
        break;

      default:
        throw new Error(`Unknown topic: ${topic}`);
    }

    // ✅ SUCCESS → DELIVERED
    await updateMessageStatus(payload.messageId, StatusEnum.DELIVERED);
  } catch (error: any) {
    console.error("❌ Delivery failed:", error.message);

    // ❌ FAILURE → FAILED
    await updateMessageStatus(
      payload.messageId,
      StatusEnum.FAILED
    );

    throw error; // let Kafka retry if enabled
  }
};