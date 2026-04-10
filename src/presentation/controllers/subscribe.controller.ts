export class SubscribeController {
    constructor(private subscribeService: SubscribeService){
        this.subscribeService = subscribeService;
    }

    async subscribeRepo (req,res) {
        const {email, repo} = req.body
        const subscribe = 
    }
}