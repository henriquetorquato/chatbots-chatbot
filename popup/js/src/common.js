class GenericCollection {
    constructor(element){
        this.element = element
    }
}

class Nodes extends GenericCollection {
    load() {
        self = this;
        Object.keys(self.element).forEach((key) => {
            self.element[key] = document.getElementById(self.element[key])
        })
    }
}

class Token {
    constructor({token, expires}){
        this.token = token
        this.expires = new Date(expires)
    }
}

class User {

    constructor(login = "", passwd = ""){
        this.login = login
        this.passwd = passwd
        this.basic = null
        this.auth = new Token({})
    }

    getBasic(){
        return btoa(`${this.login}:${this.passwd}`)
    }

    checkBasic(callback){
        if(this.basic == null){
            this.basic = this.getBasic()
            this.passwd = null
        }

        if(typeof this.auth.token == "undefined" || this.auth.expires < new Date()){
            fetch(`https://api.blip.ai/accounts/${this.login}/tokens`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${this.basic}`
                }
            })
            .then((r) => {
                return r.json()
            })
            .then((result) => {
                if(result.message)
                    callback(false)
                else{    
                    this.auth = new Token(result)
                    callback(true)
                }
            })
            .catch((error) => {
                callback(false)
            })
        }else{
            callback(true)
        }
    }

    getBots(callback){
        this.checkBasic(() => {
            fetch("https://api.blip.ai/applications/mine", {
                headers: {
                    Authorization: `Token ${this.auth.token}`
                }
            })
            .then((r) => {
                return r.json()
            })
            .then((bots) => {
                callback(bots)
            })
        }); 
    }

}