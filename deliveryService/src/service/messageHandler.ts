import { produceFailedMessage } from "../kafka/producer";
import { EmailMessageModel } from "../model/email.model";
import { StatusEnum } from "../model/message.model";
import { SmsMessageModel } from "../model/sms.model";
import { WhatsAppMessageModel } from "../model/whatsapp.model";
import { checkCount } from "../utility/duplication";
import { checkDuplicacy } from "./duplicacyHandler";
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
    const duplicate = await checkDuplicacy(payload)

    if (duplicate) {
      await updateMessageStatus(payload.messageId, StatusEnum.DUPLICATE)
      return;
    };
    if (payload.channel == "sms" && payload.to === "1234567890") throw new Error("test case")

    // ✅ SUCCESS → DELIVERED
    await updateMessageStatus(payload.messageId, StatusEnum.DELIVERED);
  } catch (error: any) {
    console.error("❌ Delivery failed:", error.message);

    // ❌ FAILURE → FAILED
    await updateMessageStatus(
      payload.messageId,
      StatusEnum.FAILED
    );
    const count = await checkCount(payload.messageId, StatusEnum.FAILED)
    console.log("count-->>", count)
    if (count < 3) {
      await produceFailedMessage(payload)
    }
  }
};