export var StoreMethod;
(function (StoreMethod) {
    StoreMethod["Inject"] = "inject";
    StoreMethod["Set"] = "set";
    StoreMethod["Get"] = "get";
})(StoreMethod || (StoreMethod = {}));
var Store = /** @class */ (function () {
    function Store() {
        var _this = this;
        this.sendRequest = function (method, key, value, callback) {
            chrome.extension.sendRequest({
                method: method,
                key: key,
                value: value
            }, function (response) {
                callback(response);
            });
        };
        this.set = function (key, value, callback) {
            _this.sendRequest(StoreMethod.Set, key, value, function (response) { return callback(response); });
        };
        this.get = function (key, callback) {
            _this.sendRequest(StoreMethod.Get, key, null, function (response) { return callback(response); });
        };
        this.inject = function (key, callback) {
            _this.sendRequest(StoreMethod.Inject, key, null, function (response) { return callback(response); });
        };
    }
    return Store;
}());
export { Store };
