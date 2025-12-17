📩 Kafka-based Message Routing System

This project demonstrates a simple microservice-based messaging system using Node.js (TypeScript) and Kafka.

Services Overview

Task Service

REST API

Validates request (Zod)

Applies retry & duplicate logic

Produces messages to Kafka (channel-based topics)

Delivery Service

Kafka consumer

Consumes messages from Kafka topics

Simulates delivery for Email / SMS / WhatsApp

Kafka + Zookeeper

Managed using Docker Compose

⚙️ Prerequisites

Make sure you have:

Node.js (v18+ recommended)

Docker & Docker Compose

npm

🚀 Step-by-Step Setup Guide

git clone <https://github.com/Ranveer1singh/communiction-system.git>
cd buncha


2️⃣ Start Kafka & Zookeeper (Docker)
docker compose up -d
docker ps


3️⃣ Start Task Service
cd task-service
npm install

Run Service
npm run dev

4️⃣ Start Delivery Service
cd delivery-service
npm install
npm run dev

🧪Test API (Postman)
POST http://localhost:3001/messages
Email Payload
{
  "messageId": "msg-101",
  "channel": "email",
  "to": "user@email.com",
  "body": "Welcome to our platform",
  "subject": "Welcome"
}

SMS Payload
{
  "messageId": "msg-102",
  "channel": "sms",
  "to": "9999999999",
  "body": "Your OTP is 1234",
  "senderId": "MYAPP"
}

WhatsApp Payload
{
  "messageId": "msg-103",
  "channel": "whatsapp",
  "to": "9999999999",
  "body": "Invoice attached",
  "mediaUrl": "https://example.com/invoice.pdf"
}


Retry Case :-
{
  
  "channel": "sms",
  "to": "1234567890",
  "body": "OTP 1234",
  "senderId": "MYAPP"
}