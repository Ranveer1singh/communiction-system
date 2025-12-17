import { kafka } from "./client";
import { MessagePayload } from "../types/message";
import { produceMessage } from "./producer";

const consumer = kafka.consumer({ groupId: "delivery-failed-service-group" });

export const startConsumer = async () => {
  try {
    await consumer.connect();
    console.log("✅ Kafka Consumer failed connected");

    await consumer.subscribe({ topic: "failed.email", fromBeginning: true });
    await consumer.subscribe({ topic: "failed.sms", fromBeginning: true });
    await consumer.subscribe({ topic: "failed.whatsapp", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) return;

        const payload: MessagePayload = JSON.parse(
          message.value.toString()
        );
        await produceMessage(payload)
        
      },
    });

  } catch (err) {
    console.error("❌ Kafka Consumer error:", err);
  }
};
