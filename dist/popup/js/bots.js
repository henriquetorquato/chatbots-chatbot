var nodes = {
    list: "bots-list"
}

document.addEventListener("DOMContentLoaded", function(){

    Object.keys(nodes).forEach(id => {
        nodes[id] = document.getElementById(nodes[id])
    })

})