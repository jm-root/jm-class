let fnTest = /xyz/.test(function () {
    xyz;
}) ? /\b_super\b/ : /.*/;

// The base Class implementation (does nothing)
let Class = function () {
};

// Create a new Class that inherits from this class
Class.extend = function (prop) {
    let _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    let prototype = Object.create(_super);

    // Copy the properties over onto the new prototype
    for (let name in prop) {
        if (name == 'properties') {
            continue;
        }
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == 'function' &&
        typeof _super[name] == 'function' && fnTest.test(prop[name]) ?
            (function (name, fn) {
                return function () {
                    let tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    let ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
    }

    {
        let properties = prop['properties'];
        if (properties) {
            for (let key of Object.keys(properties)) {
                let desc = properties[key];
                if (desc.get && typeof desc.get == 'string') {
                    desc.get = prototype[desc.get];
                }
                if (desc.set && typeof desc.set == 'string') {
                    desc.set = prototype[desc.set];
                }
                Object.defineProperty(prototype, key, desc);
            }
        }
    }

    // The dummy class constructor
    let C = function () {
        if (this._className) {
            Object.defineProperty(
                this,
                'className',
                {
                    value: this._className,
                    writable: false,
                }
            );
        }

        // All construction is actually done in the init method
        if (this.ctor)
            this.ctor.apply(this, arguments);
    };

    // Populate our constructed prototype object
    C.prototype = prototype;

    // Enforce the constructor to be what we expect
    C.prototype.constructor = C;

    // And make this class extendable
    C.extend = Class.extend;

    return C;
};

let moduleClass = ($, name = 'Class') => {
    $[name] = Class;

    return {
        name: name,
        unuse: function ($) {
            delete $[name];
        },
    };
};

export default Class;
export {Class, moduleClass};
