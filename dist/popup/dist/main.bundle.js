webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-login></app-login>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_chrome__ = __webpack_require__("./src/services/chrome.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(chrome) {
        this.chrome = chrome;
        chrome.get('token', function (token) {
            console.log(token);
        });
        console.log();
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_chrome__["a" /* default */]])
    ], AppComponent);
    return AppComponent;
}());
/* harmony default export */ __webpack_exports__["a"] = (AppComponent);


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_login_component__ = __webpack_require__("./src/components/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_chrome__ = __webpack_require__("./src/services/chrome.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* default */],
                __WEBPACK_IMPORTED_MODULE_4__components_login_component__["a" /* default */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_material__["b" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_material__["a" /* MatButtonModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__services_chrome__["a" /* default */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* default */]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/components/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_token__ = __webpack_require__("./src/models/token.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
        var _this = this;
        this.attemptLogin = function () {
            var userLogin = _this.loginInput.nativeElement.value;
            var password = _this.passwordInput.nativeElement.value;
            var token = new __WEBPACK_IMPORTED_MODULE_1__models_token__["a" /* default */](userLogin, password);
            token.get(function (response) { });
        };
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('login', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], LoginComponent.prototype, "loginInput", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('password', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], LoginComponent.prototype, "passwordInput", void 0);
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("./src/components/templates/login.template.html"),
            styles: [__webpack_require__("./src/components/styles/login.style.css")]
        })
    ], LoginComponent);
    return LoginComponent;
}());
/* harmony default export */ __webpack_exports__["a"] = (LoginComponent);


/***/ }),

/***/ "./src/components/styles/login.style.css":
/***/ (function(module, exports) {

module.exports = ".login-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n}\r\n\r\n.login-container button {\r\n    height: 50px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    background-color: #4dcb7b;\r\n    color: white;\r\n}\r\n\r\n.login-container button:disabled {\r\n    background-color: #bebebe;\r\n    color: white;\r\n}\r\n\r\n.login-container mat-form-field {\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.login-container button {\r\n    margin-top: 20px;\r\n    margin-bottom: 20px;\r\n}"

/***/ }),

/***/ "./src/components/templates/login.template.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"login-container\">\r\n\r\n    <mat-form-field>\r\n        <input #login matInput type=\"email\" name=\"email\" placeholder=\"Login\">\r\n    </mat-form-field>\r\n\r\n    <mat-form-field>\r\n        <input #password matInput type=\"password\" name=\"password\" placeholder=\"Senha\">\r\n    </mat-form-field>\r\n    \r\n    <button mat-button (click)=\"attemptLogin()\">Login</button>\r\n    \r\n</div>"

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/models/constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.BLIP_API_URL = 'https://api.blip.ai';
    Constants.BLIP_TOKEN_URL = 'https://api.blip.ai/accounts/%s/tokens';
    return Constants;
}());
/* harmony default export */ __webpack_exports__["a"] = (Constants);


/***/ }),

/***/ "./src/models/token.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__("./src/models/constants.ts");

var Token = /** @class */ (function () {
    function Token(login, password) {
        var _this = this;
        this.generateBasic = function (login, password) {
            return btoa(login + ":" + password);
        };
        this.get = function (callback) {
            var url = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */].BLIP_TOKEN_URL.replace(/\%s/g, _this.login);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': "Basic " + _this.basic
                }
            })
                .then(function (r) { return r.json(); })
                .then(function (data) {
                _this.bearer = data['token'];
                _this.expires = new Date(data['expires']);
                callback(!data['message']);
            })
                .catch(function (err) {
                callback(false);
            });
        };
        this.isValid = function () {
            return (new Date) > _this.expires;
        };
        this.login = login;
        this.basic = this.generateBasic(login, password);
    }
    return Token;
}());
/* harmony default export */ __webpack_exports__["a"] = (Token);


/***/ }),

/***/ "./src/services/chrome.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ChromeMethod;
(function (ChromeMethod) {
    ChromeMethod["Get"] = "get";
    ChromeMethod["Set"] = "set";
    ChromeMethod["Inject"] = "inject";
})(ChromeMethod || (ChromeMethod = {}));
var ChromeRequest = /** @class */ (function () {
    function ChromeRequest() {
    }
    return ChromeRequest;
}());
var Chrome = /** @class */ (function () {
    function Chrome() {
        var _this = this;
        this.chromeRequest = function (request, callback) {
            window['chrome'].extension.sendRequest(request, function (result) { return callback(result); });
        };
        this.get = function (key, callback) {
            _this.chromeRequest({
                method: ChromeMethod.Get,
                key: key,
                value: null
            }, function (result) { return callback(result); });
        };
        this.set = function (key, value) {
            _this.chromeRequest({
                method: ChromeMethod.Set,
                key: key,
                value: value
            }, function (r) { return null; });
        };
        this.inject = function (key) {
            _this.chromeRequest({
                method: ChromeMethod.Inject,
                key: key,
                value: null
            }, function (r) { return null; });
        };
    }
    Chrome = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])()
    ], Chrome);
    return Chrome;
}());
/* harmony default export */ __webpack_exports__["a"] = (Chrome);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map