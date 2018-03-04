"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericCollection = function GenericCollection(element) {
    _classCallCheck(this, GenericCollection);

    this.element = element;
};

var Nodes = function (_GenericCollection) {
    _inherits(Nodes, _GenericCollection);

    function Nodes() {
        _classCallCheck(this, Nodes);

        return _possibleConstructorReturn(this, (Nodes.__proto__ || Object.getPrototypeOf(Nodes)).apply(this, arguments));
    }

    _createClass(Nodes, [{
        key: "load",
        value: function load() {
            self = this;
            Object.keys(self.element).forEach(function (key) {
                self.element[key] = document.getElementById(self.element[key]);
            });
        }
    }]);

    return Nodes;
}(GenericCollection);

var Token = function Token(_ref) {
    var token = _ref.token,
        expires = _ref.expires;

    _classCallCheck(this, Token);

    this.token = token;
    this.expires = new Date(expires);
};

var Chatbot = function Chatbot(_ref2) {
    var imageUri = _ref2.imageUri,
        id = _ref2.id,
        shortName = _ref2.shortName,
        name = _ref2.name,
        description = _ref2.description,
        template = _ref2.template,
        activatedServices = _ref2.activatedServices;

    _classCallCheck(this, Chatbot);

    this.id = id;
    this.name = name;
    this.imageUri = imageUri;
    this.shortName = shortName;
    this.description = description;
    this.template = template;
};

var User = function () {
    function User() {
        var login = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var passwd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

        _classCallCheck(this, User);

        this.login = login;
        this.passwd = passwd;
        this.basic = null;
        this.auth = new Token({});
    }

    _createClass(User, [{
        key: "getBasic",
        value: function getBasic() {
            return btoa(this.login + ":" + this.passwd);
        }
    }, {
        key: "checkBasic",
        value: function checkBasic(callback) {
            var _this2 = this;

            this.basic = this.getBasic();
            this.passwd = null;
            fetch("https://api.blip.ai/accounts/" + this.login + "/tokens", {
                method: "POST",
                headers: {
                    Authorization: "Basic " + this.basic
                }
            }).then(function (r) {
                return r.json();
            }).then(function (result) {
                if (result.message) callback(false);else {
                    _this2.auth = new Token(result);
                    callback(true);
                }
            }).catch(function (error) {
                callback(false);
            });
        }
    }, {
        key: "getBots",
        value: function getBots(callback) {
            if (this.auth.expires < new Date()) this.checkBasic(function () {});

            fetch("https://api.blip.ai/applications/mine", {
                headers: {
                    Authorization: "Token " + this.auth.token
                }
            }).then(function (r) {
                return r.json();
            }).then(function (data) {
                callback(data);
            });
        }
    }]);

    return User;
}();