// producer.ts
import { Producer } from "kafkajs";
import { kafka } from "./client";
import { MessagePayload } from "../types/message";
import { TOPICS } from "../constants";


let producer: Producer;

export const createProducer = async () => {
  producer = kafka.producer();
  await producer.connect();
  console.log("✅ Kafka Producer for failed message connected");
  return producer;
};

export const getProducer = () => {
  if (!producer) throw new Error("Producer not initialized");
  return producer;
};

export const produceFailedMessage = async (payload: MessagePayload) => {
  console.log("message", payload);

 
  const prod = getProducer();
  const topic = TOPICS[payload.channel];
  await prod.send({
        topic,
        messages: [
          {
            key: payload.messageId,
            value: JSON.stringify(payload),
          },
        ],
      });
      
      
  console.log(`📤 Message ${payload.messageId} sent to Kafka`);
};
