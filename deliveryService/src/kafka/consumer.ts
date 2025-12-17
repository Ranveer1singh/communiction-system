// kafka/consumer.ts
import { MessagePayload } from "../types/message";
import { kafka } from "./client";

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
        switch (topic) {
          case "message.email":
            // handleEmail(payload);
            console.log("email")
            break;

          case "message.sms":
            // handleSMS(payload);
            console.log("sms")

            break;

          case "message.whatsapp":
            // handleWhatsApp(payload);
            console.log("whatApps")

            break;

          default:
            console.log("Unknown topic", topic);
        }
      }
    });
  } catch (err) {
    console.error("❌ Kafka Consumer error:", err);
  }
};
