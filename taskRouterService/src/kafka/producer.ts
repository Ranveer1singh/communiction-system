// producer.ts
import { Producer } from "kafkajs";
import { kafka } from "./client";
import { MessagePayload } from "../types/message";
import { TOPICS } from "../constant/topic";
import { retry } from "../utility/retry";
import { isDuplicate, markProcessed } from "../utility/duplicate";

let producer: Producer;

export const createProducer = async () => {
  producer = kafka.producer();
  await producer.connect();
  console.log("✅ Kafka Producer connected");
  return producer;
};

export const getProducer = () => {
  if (!producer) throw new Error("Producer not initialized");
  return producer;
};

export const produceMessage = async (payload: MessagePayload) => {
  console.log("message", payload);
  // 🔁 Duplicate check
  if (isDuplicate(payload.messageId)) {
    console.log(`⚠️ Duplicate message ignored: ${payload.messageId}`);
    return;
  }
  const prod = getProducer();
  const topic = TOPICS[payload.channel];
 await retry(
    async () => {
      await prod.send({
        topic,
        messages: [
          {
            key: payload.messageId,
            value: JSON.stringify(payload),
          },
        ],
      });
      markProcessed(payload.messageId);
      console.log(
        `📤 Message ${payload.messageId} sent to Kafka topic ${topic}`
      );
    },
    3,      // retries
    500     // delay in ms
  );
  console.log(`📤 Message ${payload.messageId} sent to Kafka`);
};
