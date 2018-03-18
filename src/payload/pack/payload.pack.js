inject = function inject(appKey) {

    injected = {
        client: null,
        window: null
    };

    injectDependency = function injectDependency(callback) {
        // Inject BLiP Chat widget in the document and returns a callback
        el = document.createElement("script");
        el.src = "https://unpkg.com/blip-chat-widget@1.2.2/dist/blip-chat.js";
        el.addEventListener("load", function () {
            callback();
        });
        document.head.appendChild(el);
    };

    createClient = function createClient() {
        // Returns a instance of BLiP Chat client
        console.log(BlipChat);
        return new BlipChat().withAppKey(appKey).withButton({ "color": "#252525" });
    };

    messageReceived = function messageReceived(message) {
        // Post message to mais thread
        window.postMessage({
            code: "SendMessage",
            content: message
        }, location.href);
    };

    extractMessage = function extractMessage(evts, callback) {
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

    injectedMessageListChanged = function injectedMessageListChanged(evts) {
        extractMessage(evts, function (message) {
            return messageReceived(message);
        });
    };

    mainMessageListChanged = function mainMessageListChanged(evts) {
        extractMessage(evts, function (message) {
            return injected.client.sendMessage(message);
        });
    };

    load = function load() {

        // Add mutation listener to main thread
        mainMessageThread = document.querySelector("div[id='thread']");
        new MutationObserver(function (evts) {
            return mainMessageListChanged(evts);
        }).observe(mainMessageThread.querySelector("div[class='blip-cards-items-list']"), {
            childList: true
        });

        // Clears any chat history
        window.localStorage.clear();

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
                    new MutationObserver(function (evts) {
                        return injectedMessageListChanged(evts);
                    }).observe(messageThread.querySelector("div[class='blip-cards-items-list']"), {
                        childList: true
                    });
                    injected.client.sendMessage("COMEÇAR");
                }).observe(messageThread, {
                    childList: true
                });
            };
        });
    };

    load();
};

inject("dGVhZHNhc2Q6NzZiMTljNjMtMzVlMy00Nzc5LTg0NTctOTE1NDBmODM4ODhl");