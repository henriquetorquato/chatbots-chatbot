var nodes = new Nodes({
    list: "bot-list"
});

createBotElement = function createBotElement(bot){

    if(bot.image == "undefined"){
        bot.image = "";
    }

    image = document.createElement("img");
    image.src = bot.imageUri;
    image.className = "bot-image";

    displayName = document.createElement("span");
    displayName.innerHTML = bot.name;
    displayName.className = "badge";

    description = document.createElement("p");
    description.innerHTML = bot.description;

    collapseBody = document.createElement("div");
    collapseBody.className = "collapsible-body";
    collapseBody.appendChild(description);

    collapseHeader = document.createElement("div");
    collapseHeader.className = "collapsible-header";
    collapseHeader.appendChild(image);
    collapseHeader.appendChild(displayName);
    collapseHeader.appendChild(displayName);

    row = document.createElement("li");
    row.appendChild(collapseHeader);
    row.appendChild(collapseBody);

    return row;
};

document.addEventListener("DOMContentLoaded", function(){
    nodes.load();

    chrome.extension.sendRequest({method: 'get', key: 'user'}, function(user) {
        newUser = new User(user.login, "");
        newUser.basic = user.basic;
        console.log(newUser);
        newUser.getBots(function(bots){
            bots.forEach((bot) => {
                el = createBotElement(bot);
                nodes.element.list.appendChild(el);
            });
        });
    });
});