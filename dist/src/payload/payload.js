inject = function () {
    var appKey = false;
    var injected = {
        client: null,
        window: null
    };
    getAppKey = function () {
        thisElement = document.head.lastChild;
        var _a = thisElement.src.split("?"), baseUrl = _a[0], parameters = _a[1];
        key = parameters.replace("key=", "");
        if (key.length == 60)
            appKey = key;
        else
            appKey = false;
    };
    injectDependency = function (callback) {
        // Inject BLiP Chat widget in the document and returns a callback
        el = document.createElement("script");
        el.src = "https://unpkg.com/blip-chat-widget@1.2.2/dist/blip-chat.js";
        el.addEventListener("load", function () { callback(); });
        document.head.appendChild(el);
    };
    createClient = function () {
        // Returns a instance of BLiP Chat client
        return new BlipChat()
            .withAppKey(appKey)
            .withButton({ "color": "#252525" });
    };
    messageReceived = function (message) {
        // Post message to mais thread
        window.postMessage({
            code: "SendMessage",
            content: message
        }, location.href);
    };
    extractMessage = function (evts, callback) {
        // Extract message from fired events
        evts.forEach(function (evt) {
            if (evt.addedNodes.length > 0) {
                Array.from(evt.addedNodes).forEach(function (node) {
                    if (node.className.indexOf("sent") == -1) {
                        el = node.querySelector("div[class='bubble left'] > div");
                        if (el != null && el.className.indexOf("typing") < 0) {
                            callback(el.innerHTML);
                        }
                    }
                });
            }
        });
    };
    injectedMessageListChanged = function (evts) {
        extractMessage(evts, function (message) { return messageReceived(message); });
    };
    mainMessageListChanged = function (evts) {
        extractMessage(evts, function (message) { return injected.client.sendMessage(message); });
    };
    load = function () {
        // Add mutation listener to main thread
        mainMessageThread = document.querySelector("div[id='thread']");
        new MutationObserver(function (evts) { return mainMessageListChanged(evts); })
            .observe(mainMessageThread.querySelector("div[class='blip-cards-items-list']"), {
            childList: true
        });
        // Clears any chat history
        window.localStorage.clear();
        getAppKey();
        if (!appKey)
            throw new Error("AppKey could not be found!");
        injectDependency(function () {
            // Create and build a instance of BLiP Chat widget
            injected.client = createClient();
            injected.client.build();
            // Hides widget element
            injected.client.widget.blipChatContainer.hidden = true;
            // Extract window from iframe
            injected.window = injected.client.widget.blipChatContainer.querySelector("iframe").contentWindow;
            injected.window.onload = function () {
                // Starts message thread
                injected.client.widget._openChat();
                // Add mutation listener to injected message thread
                messageThread = injected.window.document.querySelector("div[id='thread']");
                new MutationObserver(function () {
                    new MutationObserver(function (evts) { return injectedMessageListChanged(evts); })
                        .observe(messageThread.querySelector("div[class='blip-cards-items-list']"), {
                        childList: true
                    });
                    injected.client.sendMessage("COMEÇAR");
                })
                    .observe(messageThread, {
                    childList: true
                });
            };
        });
    };
    load();
};
inject();
