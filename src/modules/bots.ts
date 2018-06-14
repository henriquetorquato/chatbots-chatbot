import { Urls, StoreMethod } from './enums'

export class Bots {

    private basic: string

    public constructor(basic: string) {
        this.basic = `Basic ${basic}`
    }

    private getUserId = (): void => {
        
    }

    public get = (callback: any): void => {
        
        fetch(Urls.BotsRequest, {
            headers: {
                "Authorization": this.basic
            }
        })
        .then(r => r.json())
        .then(data => callback(data))
        .catch(error => callback(false))

    }

}

export class Bot {

    private identity: string
    private authKey: string
    private appKey: string

    private basic: string

    public constructor(identity: string, basic: string) {
        this.identity = identity
        this.basic = `Basic ${basic}`
    }

    public getAuthorization = (callback: any) => {

        fetch(Urls.BotDetailes.replace(/{identity}/, this.identity), {
            headers: {
                "Authorization": this.basic
            }
        })
        .then(r => r.json())
        .then(data => {
            this.authKey = btoa(`${this.identity}:${atob(data.accessKey)}`)
            callback(true)
        })
        .catch(error => callback(false))

    }

    public getAppKey = (callback: any) => {

        fetch(Urls.MsgingCommands, {
            method: "POST",
            headers: {
                "Authorization": `Key ${this.authKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Math.random().toString(),
                method: StoreMethod.Get,
                uri: `lime://msging.net/accounts/${this.identity}`
            })
        })
        .then(r => r.json())
        .then(data => callback(
            btoa(`${this.identity}:${data.resource.extras["blipchat-app-key"]}`)
        ))
        .catch(error => callback(false))

    }

}
