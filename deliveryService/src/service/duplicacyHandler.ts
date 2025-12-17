import { EmailMessageModel } from "../model/email.model";
import { MessageModel, StatusEnum } from "../model/message.model";
import { SmsMessageModel } from "../model/sms.model";
import { WhatsAppMessageModel } from "../model/whatsapp.model";
import { MessagePayload } from "../types/message";

export const checkDuplicacy = async ( payload: MessagePayload) => {

    const to = payload.to
    const body = payload.body
    const dateThreshold = new Date();
    dateThreshold.setHours(dateThreshold.getHours() - 1);
    const repatation = await MessageModel.find({ to, body, status: StatusEnum.DELIVERED ,createdAt: { $gt: dateThreshold }}).countDocuments()
    return repatation >= 1;


}
