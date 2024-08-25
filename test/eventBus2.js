class EventBusCore {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    once(event, listener) {
        const onceWrapper = (...args) => {
            listener(...args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }

    getFnName(name) {

        for (let [key, value] of this.listeners) {
            for (let fn of value) {
                if (fn.name === name) {
                    return fn;
                }
            }
        }
        return null;
    }

    emit(event, ...args) {

        let fnName = event.split('.')[1]
        if (!fnName) {
            const listeners = this.listeners.get(event);
            if (!listeners) return;

            listeners.forEach(listener => listener(...args));
        } else {
            this.getFnName(fnName)(...args)
        }
    }

    off(event, listener) {
        if (typeof listener === 'undefined') {
            this.listeners.set(event, []);
        } else {
            const listeners = this.listeners.get(event);
            if (!listeners) return;
            this.listeners.set(event, listeners.filter(l => l !== listener));
        }
    }

    clear() {
        this.listeners.clear();
    }
}


const eventBus = new EventBusCore();


function f1(data) {
    console.log('f1---f1', data)
}

eventBus.on('testEvent', f1);

eventBus.emit('testEvent', 'Hello, f1!');

// ------------------------------------------------------
function f2(data) {
    console.log('f2---f2', data)
}

eventBus.on('testEvent', f2); //

eventBus.emit('testEvent.f2', 'Hello, f2!');
eventBus.emit('testEvent.f2', 'Hello, f20000!');

