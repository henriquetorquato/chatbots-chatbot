var nodes = new Nodes({
    list: "bot-list"
});

callInjection = function callInjection(appKey){
    chrome.extension.sendRequest({method: 'inject', key: ''}, function() {});
};

createBotElement = function createBotElement(bot){

    image = document.createElement("img");
    image.src = bot.imageUri;
    image.className = "bot-image";

    displayName = document.createElement("span");
    displayName.innerHTML = bot.name;
    displayName.className = "badge";

    injectButton = document.createElement("button");
    injectButton.className = "waves-effect waves-light btn";
    injectButton.innerHTML = "Inject";
    injectButton.onclick = function(){ callInjection(bot.id) };

    collapseBody = document.createElement("div");
    collapseBody.className = "collapsible-body";
    collapseBody.appendChild(injectButton);

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
        newUser.getBots(function(bots){
            bots.forEach((bot) => {
                el = createBotElement(bot);
                nodes.element.list.appendChild(el);
            });
        });
    });
});