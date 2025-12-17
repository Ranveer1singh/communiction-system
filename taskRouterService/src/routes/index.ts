import express, { Request, Response } from "express"
import smsRouter from "./sms.routes";
import emailRouter from "./email.routes";
import whatappsRouter from "./whatsapp.routes";
import messageRouter from "./message.rotues";

const router = express.Router();

router.use('/sms', smsRouter)
router.use('/email', emailRouter)
router.use('/whatsapp', whatappsRouter)
router.use('/message', messageRouter)

export default router