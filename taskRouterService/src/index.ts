import Server from "./utility/server"
class TaskRouterService{
    public run():void{
        const server = new Server();
        server.start()
    }
}

const taskRouterService = new TaskRouterService;
taskRouterService.run()