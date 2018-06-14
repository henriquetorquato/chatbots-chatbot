export enum Urls {
    TokenRequest = "https://api.blip.ai/accounts/{login}/tokens",
    BotsRequest = "https://api.blip.ai/applications/mine",
    BotDetailes = "https://api.blip.ai/applications/{identity}",
    MsgingCommands = "https://msging.net/commands"
}

export enum StoreMethod {
    Inject = "inject",
    Set = "set",
    Get = "get"
} 

export enum Pages {
    Login = "login.html",
    Bots = "bots.html"
}