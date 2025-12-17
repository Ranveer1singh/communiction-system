import { kafka } from "./client";
import { handleMessageByTopic } from "../service/messageHandler";
import { MessagePayload } from "../types/message";

const consumer = kafka.consumer({ groupId: "delivery-service-group" });

export const startConsumer = async () => {
  try {
    await consumer.connect();
    console.log("✅ Kafka Consumer connected");

    await consumer.subscribe({ topic: "message.email", fromBeginning: true });
    await consumer.subscribe({ topic: "message.sms", fromBeginning: true });
    await consumer.subscribe({ topic: "message.whatsapp", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) return;

        const payload: MessagePayload = JSON.parse(
          message.value.toString()
        );

        await handleMessageByTopic(topic, payload);
      },
    });

  } catch (err) {
    console.error("❌ Kafka Consumer error:", err);
  }
};
