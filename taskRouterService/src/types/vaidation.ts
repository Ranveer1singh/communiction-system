import { z } from "zod";

/**
 * Base schema
 */
export enum statusEnum{
  PENDING = "pending",
  DELIVERED = "delivered",
  FAILED = "failed"
}
export const StatusSchema = z.nativeEnum(statusEnum);
const baseSchema = {
  // messageId: z.string().min(1),
  to: z.string().min(1),
  body: z.string().min(1),
  status : z.string().default(statusEnum.PENDING)
};

/**
 * Email schema
 */
const emailSchema = z.object({
  channel: z.literal("email"),
  ...baseSchema,
  subject: z.string().optional(),
});

/**
 * SMS schema
 */
const smsSchema = z.object({
  channel: z.literal("sms"),
  ...baseSchema,
  senderId: z.string().optional(),
});

/**
 * WhatsApp schema
 */
const whatsappSchema = z.object({
  channel: z.literal("whatsapp"),
  ...baseSchema,
  mediaUrl: z.string().url().optional(),
});

/**
 * Final discriminated union
 */
export const MessagePayloadSchema = z.discriminatedUnion("channel", [
  emailSchema,
  smsSchema,
  whatsappSchema,
]);

export type MessagePayloadInput = z.infer<typeof MessagePayloadSchema>;
