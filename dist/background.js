var generalStore = {

    stores: {},

    addStore: function(id){
        generalStore.stores[id] = {};
    },

    storeExists: function(id){
        return Object.keys(generalStore.stores).indexOf(id) == -1 ? false : true;
    },

    get: function(id, key){
        return generalStore.stores[id][key];
    },

    set: function(id, key, value){
        generalStore.stores[id][key] = value;
    }

};

getCurentTab = function getCurentTab(callback){
    chrome.tabs.query({ active: true }, function(tabs){
        callback(tabs[0]);
    });
};

getLoader = function getLoader(appkey){
    return "script = document.createElement(\"script\");" +
    "script.src = \"https://cdn.rawgit.com/henriquetorquato/chatbots-chatbot/33cbe610/dist/payload.js?key=" + appkey + "\";" +
    "document.head.appendChild(script);";
};

injectScript = function injectScript(request){
    getCurentTab(function(tab){
        chrome.tabs.executeScript(tab.id, {
            code: getLoader(request.key),
            allFrames: true
        });
    });
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

    if(!generalStore.storeExists(sender.id)){
        generalStore.addStore(sender.id);
    }

    switch(request.method){

        case "get":
            sendResponse(generalStore.get(sender.id, request.key));
            break;

        case "set":
            generalStore.set(sender.id, request.key, request.value);
            break;

        case "inject":
            injectScript(request);
            break;

    }

});