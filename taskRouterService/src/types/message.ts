export interface MessagePayload {
  messageId: string;
  channel: "email" | "sms" | "whatsapp";
  to: string;
  body: string;
}