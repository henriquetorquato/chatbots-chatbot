var client = null;
var injectedWindow = null;

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

injectedWindowReady = function injectedWindowReady(){
    messagesList = injectedWindow.jQuery(".blip-cards-items-list")[0];
    messagesList.on("")
};

injectDependencies(document, function(){
    client = new BlipChat()
    .withAppKey('dGVhZHNhc2Q6NzZiMTljNjMtMzVlMy00Nzc5LTg0NTctOTE1NDBmODM4ODhl')
    .withButton({"color":"#252525"});

    client.build();

    injectedWindow = document.getElementById("blip-chat-iframe").contentWindow;

    injectedWindow.addEventListener("load", function(){
        injectDependencies(injectedWindow.document, function(){ 
            client.widget._openChat();
        });
    });

    injectedWindow.addEventListener("DOMContentLoaded", function(){
        injectedWindowReady();
    });
});