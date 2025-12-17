import express, { Request, Response } from "express"

const emailRouter = express.Router();

emailRouter.get('/', (req : Request, res : Response)=>{
    res.send("Email service route")
})

export default emailRouter