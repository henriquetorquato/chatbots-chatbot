var client = null;
var injectedWindow = null;

var textArea = null;
var sendMessage = null;

const urls = [
    "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://unpkg.com/blip-chat-widget@1.2.2/dist/blip-chat.js"
]

injectDependencies = function injectDependencies(target, callback) {

    i = 0;
    injectScript = function(src, callback) {
        obj = target.createElement("script");
        obj.src = src;
        obj.addEventListener("load", function(){ callback(); });
        target.head.appendChild(obj);
    };    

    loop = function(){
        injectScript(urls[i], function(){
            i += 1;
            if(i < urls.length){
                loop();
            }else{
                callback();
            }
        });
    };

    loop();
};

messageReceived = function messageReceived(message) {
    console.log("RECEIVED:", message);    
    textArea.value = message;
};

messageSent = function messageSent(message) {
    console.log("SENT:", message);
};

injectedWindowReady = function injectedWindowReady(){
    new MutationObserver(function(evts){
        new MutationObserver(function(evts){
            evts.forEach(function(evt){
                if(evt.addedNodes.length > 0){
                    Array.from(evt.addedNodes).forEach(function(node){
                        if(node.className.indexOf("sent") > -1){
                            el = node.querySelector("div[class='bubble right'] > div");
                            messageSent(el.innerHTML);
                        }else{
                            el = node.querySelector("div[class='bubble left'] > div");
                            if(el != null && el.className.indexOf("typing") == -1){
                                messageReceived(el.innerHTML);
                            }
                        }
                    });
                }

            });
        })
        .observe(injectedWindow.document.getElementsByClassName("blip-cards-items-list")[0], {
            childList: true
        });
    })
    .observe(injectedWindow.document.getElementById("thread"), {
        childList: true
    });
};

textArea = document.getElementById("msg-textarea");
sendMessage = document.getElementById("blip-send-message");

injectDependencies(document, function(){
    client = new BlipChat()
    .withAppKey('dGVhZHNhc2Q6NzZiMTljNjMtMzVlMy00Nzc5LTg0NTctOTE1NDBmODM4ODhl')
    .withButton({"color":"#252525"});

    client.build();

    document.getElementById("blip-chat-container").hidden = true

    injectedWindow = document.getElementById("blip-chat-iframe").contentWindow;

    injectedWindow.addEventListener("load", function(){
        injectDependencies(injectedWindow.document, function(){ 
            client.widget._openChat();
        });
    });

    injectedWindow.addEventListener("load", function(){
        injectedWindowReady();
    });
});