import express, { Request, Response } from "express"
import smsRouter from "./sms.routes";
import emailRouter from "./email.routes";
import whatappsRouter from "./whatsapp.routes";

const router = express.Router();

router.use('/sms', smsRouter)
router.use('/email', emailRouter)
router.use('/whatsapp', whatappsRouter)

export default router