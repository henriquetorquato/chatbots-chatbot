var nodes = {
    list: "bots-list"
}

document.addEventListener("DOMContentLoaded", function(){

    Object.keys(nodes).forEach(id => {
        nodes[id] = document.getElementById(nodes[id])
    })

    parent.store.get("basic", function(basic){

        if (basic == null) {
            parent.routes.set(Library.Pages.Login)
        }

        let botList = []
        let bots = new Library.Bots(basic)
        bots.get(function(data){
            if(data) botList = data

            botList.forEach(function(bot){
                listItem = buildBotItem(bot)
                nodes.list.append(listItem)
            })
        })

    })

})

buildBotItem = function buildBotItem(bot) {

    let listItem = document.createElement("li")
    listItem.classList.add("collection-item")
    listItem.classList.add("avatar")

    let image = document.createElement("img")
    image.classList.add("circle")
    image.src = bot.imageUri

    let name = document.createElement("span")
    name.classList.add("title")
    name.innerHTML = bot.name

    let description = document.createElement("p")
    description.innerHTML = typeof bot.description == "undefined" ? "" : bot.description

    let icon = document.createElement("i")
    icon.classList.add("material-icons")
    icon.classList.add("secondary-content")
    icon.onclick = () => injectBot(bot.shortName)
    icon.innerHTML = "add"

    listItem.appendChild(image)
    listItem.appendChild(name)
    listItem.appendChild(description)
    listItem.appendChild(icon)

    return listItem

}

injectBot = function injectBot(identity) {
    
    parent.store.get("basic", function(basic){

        let bot = new Library.Bot(identity, basic)
        
        bot.getAuthorization(function(success){
            if (success) bot.getAppKey(appKey => parent.store.inject(appKey, () => { }))
        })

    })

}