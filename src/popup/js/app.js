var user = new User();

var nodes = new Nodes({
    frame: "popup-content"
});

var page = {
    name: {
        login: "login.html",
        bots: "bots.html"
    },
    set: function set(page) {
        nodes.element.frame.src = page;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    nodes.load();
    chrome.extension.sendRequest({method: 'get', key: 'user'}, function(response) {
        if(response == null){
            page.set(page.name.login);
        }else{
            page.set(page.name.bots);
        }
    });
});