// kafka/kafkaClient.ts
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "delivery-service", 
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});
