var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

inject = function inject() {

    injected = {
        client: null,
        window: null
    };

    getAppKey = function getAppKey() {
        thisElement = document.getElementById("payloadScript");

        var _thisElement$src$spli = thisElement.src.split("?"),
            _thisElement$src$spli2 = _slicedToArray(_thisElement$src$spli, 2),
            baseUrl = _thisElement$src$spli2[0],
            parameters = _thisElement$src$spli2[1];

        appKey = parameters.replace("key=", "");
        if (appKey.length == 60) return appKey;else return false;
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

    createClient = function createClient(appKey) {
        // Returns a instance of BLiP Chat client
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

            appKey = getAppKey();
            if (appKey) throw new Error("AppKey could not be found!");

            // Create and build a instance of BLiP Chat widget
            injected.client = createClient(appKey);
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