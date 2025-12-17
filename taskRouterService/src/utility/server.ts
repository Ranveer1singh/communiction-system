import express, { Application, Request, Response, Router } from "express";
import apiRoutes from "../routes"
import "dotenv/config"
import { createProducer } from "../kafka/producer"
class Server {

    private app: Application;

    constructor() {
        this.app = express()
    }

    public async start() {
        this.setupMiddleware()
        this.listenServer()
        await createProducer();

    }
private setupMiddleware():void{
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cookieParser())
    }
    private listenServer() {
        const port = process.env.PORT || 5000;
        this.app.listen(port, () => {
            console.log(`Task service is running on ${port}`)
        })
    }

    private routeSetup() {
        this.app.use('/api', apiRoutes)
    }
}

export default Server