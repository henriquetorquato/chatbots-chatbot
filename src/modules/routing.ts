import { Pages } from './enums'

export class Routing {

    private frameNode: HTMLIFrameElement

    public constructor(frameNode: HTMLIFrameElement) {
        this.frameNode = frameNode
    }

    public set = (route: Pages): void => {
        this.frameNode.src = route
    }

}