var routes = null
var store = null

document.addEventListener("DOMContentLoaded", function(){

    iframe = document.getElementById("routing-frame")

    routes = new Library.Routing(iframe)
    store = new Library.Store()

    store.get('token', function(token){

        if(token == null){
            routes.set(Library.Pages.Login)
        }else{
            routes.set(Library.Pages.Bots)
        }

    })

})