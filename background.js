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

    }

});