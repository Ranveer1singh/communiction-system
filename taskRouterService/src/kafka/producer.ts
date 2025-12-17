// producer.ts
import { Producer } from "kafkajs";
import { kafka } from "./client";
import { MessagePayload } from "../types/message";
import { TOPICS } from "../constant/topic";

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
  const prod = getProducer();
  const topic = TOPICS[payload.channel];
  await prod.send({
    topic,
    messages: [
      {
        key: payload.messageId.toString(),
        value: JSON.stringify(payload),
      },
    ],
  });
  console.log(`📤 Message ${payload.messageId} sent to Kafka`);
};
