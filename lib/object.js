'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.module = exports.Obj = undefined;

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$ = _class2.default.extend({
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

var _module = function _module($) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';

    $.Object = $$;

    $.object = function () {
        return new $$();
    };

    return {
        name: name,
        unuse: function unuse($) {
            delete $.Object;
            delete $.object;
        }
    };
};

exports.default = $$;
exports.Obj = $$;
exports.module = _module;