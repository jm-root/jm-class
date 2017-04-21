(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fnTest = /xyz/.test(function () {
    xyz;
}) ? /\b_super\b/ : /.*/;

// The base Class implementation (does nothing)
var Class = function Class() {};

// Create a new Class that inherits from this class
Class.extend = function (prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    var prototype = Object.create(_super);

    // Copy the properties over onto the new prototype
    for (var name in prop) {
        if (name == 'properties') {
            continue;
        }
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == 'function' && typeof _super[name] == 'function' && fnTest.test(prop[name]) ? function (name, fn) {
            return function () {
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
            };
        }(name, prop[name]) : prop[name];
    }

    {
        var properties = prop['properties'];
        if (properties) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    var desc = properties[key];
                    if (desc.get && typeof desc.get == 'string') {
                        desc.get = prototype[desc.get];
                    }
                    if (desc.set && typeof desc.set == 'string') {
                        desc.set = prototype[desc.set];
                    }
                    Object.defineProperty(prototype, key, desc);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }

    // The dummy class constructor
    var C = function C() {
        if (this._className) {
            Object.defineProperty(this, 'className', {
                value: this._className,
                writable: false
            });
        }

        // All construction is actually done in the init method
        if (this.ctor) this.ctor.apply(this, arguments);
    };

    // Populate our constructed prototype object
    C.prototype = prototype;

    // Enforce the constructor to be what we expect
    C.prototype.constructor = C;

    // And make this class extendable
    C.extend = Class.extend;

    return C;
};

var moduleClass = function moduleClass($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Class';

    $[name] = Class;

    return {
        name: name,
        unuse: function unuse($) {
            delete $[name];
        }
    };
};

exports.default = Class;
exports.Class = Class;
exports.moduleClass = moduleClass;
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Obj = exports.Class = undefined;

var _class = require('./class');

var _object = require('./object');

if (typeof global !== 'undefined' && global) {
    if (global.jm) {
        global.jm.use(_class.moduleClass).use(_object.moduleObj);
    }
}

exports.default = _class.Class;
exports.Class = _class.Class;
exports.Obj = _object.Obj;
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./class":1,"./object":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.moduleObj = exports.Obj = undefined;

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Obj = _class2.default.extend({
    _className: 'object',

    attr: function attr(attrs) {
        for (var key in attrs) {
            if (key === 'className') {
                continue;
            }

            this[key] = attrs[key];
        }
    }
});

var moduleObj = function moduleObj($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';

    $.Object = Obj;

    $.object = function () {
        return new Obj();
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.Object;
            delete $.object;
        }
    };
};

exports.default = Obj;
exports.Obj = Obj;
exports.moduleObj = moduleObj;
},{"./class":1}]},{},[2])