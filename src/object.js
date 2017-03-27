import Class from './class'

let $$ = Class.extend({
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

let module = ($, name = 'object') => {
    $.Object = $$;

    $.object = function () {
        return new $$();
    };

    return {
        name: name,
        unuse: function ($) {
            delete $.Object;
            delete $.object;
        },
    };
};

export default $$;
export {$$ as Obj, module};
