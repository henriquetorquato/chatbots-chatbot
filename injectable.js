inject = (appKey) => {

    injected = {
        client: null,
        window: null
    }

    injectDependency = (callback) => {
        el = document.createElement("script")
        el.src = "https://unpkg.com/blip-chat-widget@1.2.2/dist/blip-chat.js"
        el.addEventListener("load", () => { callback() })
        document.head.appendChild(el)
    }

    createClient = () => {
        return new BlipChat()
        .withAppKey(appKey)
        .withButton({"color":"#252525"})
    }

    sendToMaster = (message) => {
        window.postMessage({
            code: "SendMessage",
            content: message
        }, location.href)
    }

    messageReceived = (message) => {
        // Send received message to master chat
        sendToMaster(message)
    }

    messageListChanged = (evts) => {
        evts.forEach((evt) => {
            if(evt.addedNodes.length > 0) {
                Array.from(evt.addedNodes).forEach((node) => {

                    if(node.className.indexOf("sent") > -1) {
                        // el = node.querySelector("div[class='bubble right'] > div")
                        // messageSent(el.innerHTML)
                    }else{
                        el = node.querySelector("div[class='bubble left'] > div")
                        if(el != null && el.className.indexOf("typing") < 0){
                            messageReceived(el.innerHTML)
                        }
                    }

                })
            }
        })
    }

    load = () => {
        injectDependency(() => {

            injected.client = createClient()
            injected.client.build()

            injected.client.widget.blipChatContainer.hidden = true

            injected.window = injected.client.widget.blipChatContainer.querySelector("iframe").contentWindow
            injected.window.onload = () => {

                injected.client.widget._openChat()

                messageThread = injected.window.document.querySelector("div[id='thread']")
                new MutationObserver(() => {
                    new MutationObserver((evts) => messageListChanged(evts))
                    .observe(messageThread.querySelector("div[class='blip-cards-items-list']"), {
                        childList: true
                    })
                    injected.client.sendMessage("Começar")
                })
                .observe(messageThread, {
                    childList: true
                })

            }

        })
    }

    load()

}

inject("dGVhZHNhc2Q6NzZiMTljNjMtMzVlMy00Nzc5LTg0NTctOTE1NDBmODM4ODhl")