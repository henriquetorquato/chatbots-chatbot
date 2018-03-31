var Routing = /** @class */ (function () {
    function Routing(frameNode) {
        var _this = this;
        this.set = function (route) {
            _this.frameNode.src = route;
        };
        this.frameNode = frameNode;
    }
    return Routing;
}());
export default Routing;
