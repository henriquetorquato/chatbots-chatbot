var nodes = {
    login: "email",
    password: "password",
    button: "login-button",
    error: "error"
}

document.addEventListener("DOMContentLoaded", function(){

    Object.keys(nodes).forEach(id => {
        nodes[id] = document.getElementById(nodes[id])
    })
    
    nodes.login.addEventListener("keydown", function(event){ onInput(event) })
    nodes.password.addEventListener("keydown", function(event){ onInput(event) })

    nodes.button.addEventListener("click", function(){

        nodes.button.disabled = true

        let basic = new Library.BasicToken({
            Login: nodes.login.value,
            Password: nodes.password.value
        })

        basic.getAuth(function(response) {
            if(response.message) {
                displayError()
            }else{
                parent.store.set("auth", JSON.stringify(response))
                parent.store.set("basic", basic.getBasic())
                parent.routes.set(Library.Pages.Bots)
            }

            nodes.button.disabled = false
        })

    })

})

onInput = function onInput(event) {
    if(nodes.login.value.length > 0 && nodes.password.value.length > 0){
        nodes.button.disabled = false
        if(event.key == "Enter")
            nodes.button.click()
    }else{
        nodes.button.disabled = true
    }
}

displayError = function displayError() {
    nodes.error.className += " display"
}