import { Urls } from './enums'

export class BearerToken {

    private token: string
    private expiration: Date

    public isValid = (): boolean => {
        return (new Date) < this.expiration
    }

}

export class BasicToken {

    private login: Login

    public constructor(login: Login) {
        this.login = login
    }

    public getBasic = (): string => {
        return btoa(`${this.login.Login}:${this.login.Password}`)
    }

    public getAuth = (callback: any): void => {

        fetch(Urls.TokenRequest.replace(/{login}/, this.login.Login), {
            method: "POST",
            headers: {
                "Authorization": `Basic ${this.getBasic()}`
            }
        })
        .then(r => r.text())
        .then(body => <BearerToken> JSON.parse(body))
        .then(token => callback(token))
        .catch(error => callback(false))

    }

}

export interface Login {
    Login: string
    Password: string
}