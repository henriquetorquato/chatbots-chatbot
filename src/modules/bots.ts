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

    public getAppKey = (identity: string, callback: any) => {

        fetch(Urls.MsgingCommands, {
            method: "POST",
            headers: {
                "Authorization": this.basic,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Math.random().toString(),
                method: StoreMethod.Get,
                uri: `lime://msging.net/accounts/${identity}`
            })
        })
        .then(r => r.json())
        .then(data => callback(
            btoa(`${identity}:${data.resource.extras["blipchat-app-key"]}`)
        ))
        .catch(error => callback(false))

    }

}
