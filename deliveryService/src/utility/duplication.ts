import { MessageModel, StatusEnum } from "../model/message.model";

export async function checkCount(
  mesId: string,
  status: StatusEnum
): Promise<number> {
  try {
    const count = await MessageModel.countDocuments({
      messageId: mesId,
      status, 
    });

    return count;
  } catch (error) {
    console.error("❌ Error checking count:", error);
    return 0;
  }
}
