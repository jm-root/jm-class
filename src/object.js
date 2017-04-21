import Class from './class';

let Obj = Class.extend({
    _className: 'object',

    attr: function (attrs) {
        for (let key in attrs) {
            if (key === 'className') {
                continue;
            }

            this[key] = attrs[key];
        }
    },
});

let moduleObj = ($, name = 'object') => {
    $.Object = Obj;

    $.object = function () {
        return new Obj();
    };

    return {
        name: name,
        unuse: function ($) {
            delete $.Object;
            delete $.object;
        },
    };
};

export default Obj;
export {Obj, moduleObj};
