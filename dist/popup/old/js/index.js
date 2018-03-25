document.addEventListener("DOMContentLoaded", function(){

    var input = document.getElementById("appkey");
    var button = document.getElementById("inject");

    input.addEventListener("input", function(){
        if(input.value.length == 60){
            button.disabled = false;
        }else{
            button.disabled = true;
        }
    });

    button.addEventListener("click", function(){
        chrome.extension.sendRequest({method: 'inject', key: input.value}, function() {
            button.disabled = true;
        });
    });

});