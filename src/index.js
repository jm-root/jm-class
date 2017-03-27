import {Class, module as mClass} from './class';
import {Obj, module as mObject} from './object';

if (typeof global !== 'undefined' && global) {
    if(global.jm){
        global.jm
            .use(mClass)
            .use(mObject)
        ;
    }
}

export default Class;
export {Class, Obj};
