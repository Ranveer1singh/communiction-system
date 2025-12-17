import express, { Request, Response } from "express"

const smsRouter = express.Router();

smsRouter.get('/', (req : Request, res : Response)=>{
    res.send("SMS service route")
})

export default smsRouter