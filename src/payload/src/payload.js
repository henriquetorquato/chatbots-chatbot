inject = () => {

    injected = {
        client: null,
        window: null
    }

    getAppKey = () => {
        thisElement = document.getElementById("payloadScript")
        var [baseUrl, parameters] = thisElement.src.split("?")
        appKey = parameters.replace("key=", "")
        if(appKey.length == 60)
            return appKey
        else
            return false
    }

    injectDependency = (callback) => {
        // Inject BLiP Chat widget in the document and returns a callback
        el = document.createElement("script")
        el.src = "https://unpkg.com/blip-chat-widget@1.2.2/dist/blip-chat.js"
        el.addEventListener("load", () => { callback() })
        document.head.appendChild(el)
    }

    createClient = (appKey) => {
        // Returns a instance of BLiP Chat client
        return new BlipChat()
        .withAppKey(appKey)
        .withButton({"color":"#252525"})
    }

    messageReceived = (message) => {
        // Post message to mais thread
        window.postMessage({
            code: "SendMessage",
            content: message
        }, location.href)
    }

    extractMessage = (evts, callback) => {
        // Extract message from fired events
        evts.forEach((evt) => {
            if(evt.addedNodes.length > 0) {
                Array.from(evt.addedNodes).forEach((node) => {
                    if(node.className.indexOf("sent") == -1) {
                        el = node.querySelector("div[class='bubble left'] > div")
                        if(el != null && el.className.indexOf("typing") < 0){
                            callback(el.innerHTML)
                        }
                    }
                })
            }
        })
    }

    injectedMessageListChanged = (evts) => {
        extractMessage(evts, (message) => messageReceived(message))
    }

    mainMessageListChanged = (evts) => {
        extractMessage(evts, (message) => injected.client.sendMessage(message))
    }

    load = () => {

        // Add mutation listener to main thread
        mainMessageThread = document.querySelector("div[id='thread']")
        new MutationObserver((evts) => mainMessageListChanged(evts))
        .observe(mainMessageThread.querySelector("div[class='blip-cards-items-list']"), {
            childList: true
        })

        // Clears any chat history
        window.localStorage.clear()

        injectDependency(() => {

            appKey = getAppKey()
            if(appKey)
                throw new Error("AppKey could not be found!")

            // Create and build a instance of BLiP Chat widget
            injected.client = createClient(appKey)
            injected.client.build()

            // Hides widget element
            injected.client.widget.blipChatContainer.hidden = true

            // Extract window from iframe
            injected.window = injected.client.widget.blipChatContainer.querySelector("iframe").contentWindow
            injected.window.onload = () => {

                // Starts message thread
                injected.client.widget._openChat()

                // Add mutation listener to injected message thread
                messageThread = injected.window.document.querySelector("div[id='thread']")
                new MutationObserver(() => {
                    new MutationObserver((evts) => injectedMessageListChanged(evts))
                    .observe(messageThread.querySelector("div[class='blip-cards-items-list']"), {
                        childList: true
                    })
                    injected.client.sendMessage("COMEÇAR")
                })
                .observe(messageThread, {
                    childList: true
                })

            }

        })
    }

    load()
}