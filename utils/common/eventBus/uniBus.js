import {EventBus} from "./EventBus.js";

/*const SingletonProxy = (function() {
    let instance;

    return new Proxy(function() {}, {
        construct(target, args) {
            if (!instance) {
                instance = new target(...args);
            }
            return instance;
        }
    });
})();*/


const uniBus = new EventBus()


export default uniBus

