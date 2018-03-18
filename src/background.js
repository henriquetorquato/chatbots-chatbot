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

injectScript = function injectScript(appKey){
    getCurentTab(function(tab){
        chrome.tabs.executeScript(tab.id, {
            file: "payload/src/loader.js",
            allFrames: true
        });

        // appKey = "dGVhZHNhc2Q6NzZiMTljNjMtMzVlMy00Nzc5LTg0NTctOTE1NDBmODM4ODhl";

        // chrome.tabs.executeScript(tab.id, {
        //     code: `inject("${appKey}")`
        // });
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
            injectScript(request.key);
            break;

    }

});