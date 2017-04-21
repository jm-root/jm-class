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