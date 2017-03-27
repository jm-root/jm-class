import chai from 'chai';
let expect = chai.expect;
import {Class} from '../src';

let Obj = Class.extend({
    // 类的名称
    _className: 'object',

    // 构造函数
    ctor: function (opts) {
        this._name = 'test';
    },

    // 类的属性定义
    properties: {
        name: {
            get: 'getName',
            set: 'setName',
        },
    },

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
    },

    // 类的方法定义
    method1: function (opts, cb) {
        cb(null, true);
    },
});

let Obj2 = Obj.extend({
    // 类的名称
    _className: 'object2',

    // 构造函数
    ctor: function (opts) {
        this._super(opts);
        this._name = 'test';
    },

    // 类的方法定义
    method1: function (opts, cb) {
        cb(null, false);
    },
});

// test
let obj = new Obj();
obj.name = 'obj';
let obj2 = new Obj2();
obj2.name = 'obj2';

describe('class', function () {
    it('Class.prototype', function () {
        expect(Class).to.be.a('function');
        expect(obj).to.be.an('object');
        expect(obj._name).to.be.equal('obj');
        expect(obj2._name).to.be.equal('obj2');
    });
});
