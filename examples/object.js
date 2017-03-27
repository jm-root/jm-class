if (typeof module !== 'undefined' && module.exports) {
    require('jm-core');
    require('../');
}

(function () {
    console.info('******** jm.Object *********');
    console.info(jm.Object.prototype);
    console.info(jm.object());
})();
