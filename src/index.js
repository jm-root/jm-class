import {Class, moduleClass} from './class';
import {Obj, moduleObj} from './object';

if (typeof global !== 'undefined' && global) {
    if (global.jm && global.jm.use) {
        global.jm
            .use(moduleClass)
            .use(moduleObj)
        ;
    }
}

export default Class;
export {Class, Obj};
