export enum Pages {
    Login = "login.html",
    Bots = "bots.html"
}

export class Routing {

    private frameNode: HTMLIFrameElement

    public constructor(frameNode: HTMLIFrameElement) {
        this.frameNode = frameNode
    }

    public set = (route: Pages): void => {
        this.frameNode.src = route
    }

}