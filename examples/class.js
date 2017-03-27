if (typeof module !== 'undefined' && module.exports) {
    require('jm-core');
    require('../');
}

(function () {
    console.info('******** jm.Class *********');
    console.info(jm.Class.prototype);

    var Object = jm.Class.extend({
        //类的名称
        _className: 'object',

        //构造函数
        ctor: function (opts) {
            this._name = 'test';
        },

        //类的属性定义
        properties: {
            name: {get: 'getName', set: 'setName'}
        },

        getName: function () {
            return this._name;
        },

        setName: function (name) {
            this._name = name;
        },

        //类的方法定义
        method1: function (opts, cb) {
            cb(null, true);
        }
    });

    //test
    var obj = new Object();

    console.log(obj);

})();
