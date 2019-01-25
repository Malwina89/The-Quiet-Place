/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Quote Rotator

;(function ($, window, undefined) {

    'use strict';

    var Modernizr = window.Modernizr;

    $.CBPQTRotator = function (options, element) {
        this.$el = $(element);
        this._init(options);
    };

    // the options
    $.CBPQTRotator.defaults = {
        // default transition speed (ms)
        speed: 700,
        // default transition easing
        easing: 'ease',
        // rotator interval (ms)
        interval: 5000
    };

    $.CBPQTRotator.prototype = {
        _init: function _init(options) {

            // options
            this.options = $.extend(true, {}, $.CBPQTRotator.defaults, options);
            // cache some elements and initialize some variables
            this._config();
            // show current item
            this.$items.eq(this.current).addClass('cbp-qtcurrent');
            // set the transition to the items
            if (this.support) {
                this._setTransition();
            }
            // start rotating the items
            this._startRotator();
        },
        _config: function _config() {

            // the content items
            this.$items = this.$el.children('div.cbp-qtcontent');
            // total items
            this.itemsCount = this.$items.length;
            // current item´s index
            this.current = 0;
            // support for CSS Transitions
            this.support = Modernizr.csstransitions;
            // add the progress bar
            if (this.support) {
                this.$progress = $('<span class="cbp-qtprogress"></span>').appendTo(this.$el);
            }
        },
        _setTransition: function _setTransition() {
            setTimeout($.proxy(function () {
                this.$items.css('transition', 'opacity ' + this.options.speed + 'ms ' + this.options.easing);
            }, this), 25);
        },
        _startRotator: function _startRotator() {

            if (this.support) {
                this._startProgress();
            }

            setTimeout($.proxy(function () {
                if (this.support) {
                    this._resetProgress();
                }
                this._next();
                this._startRotator();
            }, this), this.options.interval);
        },
        _next: function _next() {

            // hide previous item
            this.$items.eq(this.current).removeClass('cbp-qtcurrent');
            // update current value
            this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
            // show next item
            this.$items.eq(this.current).addClass('cbp-qtcurrent');
        },
        _startProgress: function _startProgress() {

            setTimeout($.proxy(function () {
                this.$progress.css({ transition: 'width ' + this.options.interval + 'ms linear', width: '100%' });
            }, this), 25);
        },
        _resetProgress: function _resetProgress() {
            this.$progress.css({ transition: 'none', width: '0%' });
        },
        destroy: function destroy() {
            if (this.support) {
                this.$items.css('transition', 'none');
                this.$progress.remove();
            }
            this.$items.removeClass('cbp-qtcurrent').css({
                'position': 'relative',
                'z-index': 100,
                'pointer-events': 'auto',
                'opacity': 1
            });
        }
    };

    var logError = function logError(message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    $.fn.cbpQTRotator = function (options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var instance = $.data(this, 'cbpQTRotator');
                if (!instance) {
                    logError("cannot call methods on cbpQTRotator prior to initialization; " + "attempted to call method '" + options + "'");
                    return;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for cbpQTRotator instance");
                    return;
                }
                instance[options].apply(instance, args);
            });
        } else {
            this.each(function () {
                var instance = $.data(this, 'cbpQTRotator');
                if (instance) {
                    instance._init();
                } else {
                    instance = $.data(this, 'cbpQTRotator', new $.CBPQTRotator(options, this));
                }
            });
        }
        return this;
    };
})(jQuery, window);

// Your Gratitude List

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode('\xD7');
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    };
}
// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("What are you grateful for? \n There has to be something:)");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode('\xD7');
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        };
    }
}

/***/ })
/******/ ]);