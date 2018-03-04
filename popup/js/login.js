var nodes = new Nodes({
    login: "login",
    password: "password",
    submit: "submit",
    error: "error-message"
});

validateSubmit = function validateSubmit(evt = null) {
    if(evt != null && evt.key == "Enter"){
        nodes.element.submit.click();
    }
    valid = true;
    if (nodes.element.login.value.length === 0) valid = false;
    if (nodes.element.password.value.length === 0) valid = false;
    nodes.element.submit.disabled = !valid;
};

validateLogin = function validateLogin() {
    user = new User(nodes.element.login.value, 
                    nodes.element.password.value);
    user.checkBasic(function(auth){
        if(auth){
            parent.user = user;
            parent.page.set(parent.page.name.bots);
        }else{
            nodes.element.password.value = "";
            nodes.element.error.hidden = false;
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    nodes.load();
    validateSubmit();
    nodes.element.login.addEventListener("keyup", function (evt) { validateSubmit(evt); });
    nodes.element.password.addEventListener("keyup", function (evt) { validateSubmit(evt); });
    nodes.element.submit.addEventListener("click", function () { validateLogin(); });
});