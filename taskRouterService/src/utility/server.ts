import express, { Application, Request, Response, Router } from "express" ;
import apiRoutes from "../routes"

class Server {

    private app : Application;

constructor(){
    this.app = express()
}

    public  start(){
this.listenServer()
    }

    private listenServer(){
        const port  = 3000;
        this.app.listen(port, ()=>{
            console.log(`Task service is running on ${port}`)
        })
    }

    private routeSetup(){
        this.app.use('/api', apiRoutes)
    }
}

export default Server