import express, { Application, Request, Response, Router } from "express";
// import apiRoutes from "../routes"
import dbConnnection from "./db"
import "dotenv/config"
import { startConsumer } from "../kafka/consumer";
dbConnnection();

class Server {

    private app: Application;

    constructor() {
        this.app = express()
    }

    public async start() {
        this.setupMiddleware()
        this.listenServer()
        await startConsumer();

    }

    private listenServer() {
        const port = process.env.PORT || 5001;
        this.app.listen(port, () => {
            console.log(`delivery service is running on ${port}`)
        })
    }
    private setupMiddleware():void{
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cookieParser())
    }
}

export default Server