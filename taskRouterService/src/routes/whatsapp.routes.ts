import express, { Request, Response } from "express"

const whatappsRouter = express.Router();

whatappsRouter.get('/', (req : Request, res : Response)=>{
    res.send("whatsapps service route")
})

export default whatappsRouter