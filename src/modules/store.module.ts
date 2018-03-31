export enum StoreMethod {
    Inject = "inject",
    Set = "set",
    Get = "get"
} 

export class Store {

    private sendRequest = (method: StoreMethod, key: string, value: string, callback: FunctionStringCallback): any => {
        chrome.extension.sendRequest({
            method: method,
            key: key,
            value: value
        }, (response) => {
            callback(response)
        })
    }

    public set = (key: string, value: string, callback: FunctionStringCallback): void => {
        this.sendRequest(StoreMethod.Set, key, value, response => callback(response))
    }

    public get = (key: string, callback: FunctionStringCallback): void => {
        this.sendRequest(StoreMethod.Get, key, null, response => callback(response))
    }

    public inject = (key: string, callback: FunctionStringCallback): void => {
        this.sendRequest(StoreMethod.Inject, key, null, response => callback(response))
    }

}