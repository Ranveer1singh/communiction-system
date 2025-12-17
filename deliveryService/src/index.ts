import Server from "./utility/server"
class DeliveryRouterService{
    public run():void{
        const server = new Server();
        server.start()
    }
}

const deliveryRouterService = new DeliveryRouterService;
deliveryRouterService.run()