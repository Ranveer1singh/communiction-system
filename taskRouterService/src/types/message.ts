export type ChannelType = "email" | "sms" | "whatsapp";

export interface BaseMessagePayload {
  messageId: string;
  channel: ChannelType;
  to: string;
  body: string;
}

export interface EmailMessagePayload extends BaseMessagePayload {
  channel: "email";
  subject?: string;
}

export interface SmsMessagePayload extends BaseMessagePayload {
  channel: "sms";
  senderId?: string;
}

export interface WhatsAppMessagePayload extends BaseMessagePayload {
  channel: "whatsapp";
  mediaUrl?: string;
}

export type MessagePayload =
  | EmailMessagePayload
  | SmsMessagePayload
  | WhatsAppMessagePayload;