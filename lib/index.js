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