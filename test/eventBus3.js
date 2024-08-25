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
            listener(...args, { source: onceWrapper.source });
            this.off(event, onceWrapper);
        };
        onceWrapper.source = { /* 这里可以设置事件来源的信息 */ };
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

    emit(event, source, ...args) {
        let eventParts = event.split('.');
        let eventName = eventParts[0];
        let fnName = eventParts[1];

        // 如果没有指定函数名，则触发所有监听该事件的监听器
        if (!fnName) {
            const listeners = this.listeners.get(eventName);
            if (!listeners) return;

            listeners.forEach(listener => listener(...args, { source }));
        } else {
            // 如果指定了函数名，则只触发该函数
            let fn = this.getFnName(fnName);
            if (fn) {
                fn(...args, { source });
            }
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

// 生成唯一标识符函数
function generateUniqueId() {
    return `${Date.now()}-${Math.floor(Math.random() )}`;
}

// 创建 EventBus 实例
const eventBus = new EventBusCore();

// 定义一个监听器
const listener = (...args) => {
    const { source } = args[args.length - 1];
    console.log('Event source:', source);
    // 处理事件的其他逻辑
};

// 注册监听器
eventBus.on('myEvent', listener);

// 生成唯一的 source
const uniqueSource = generateUniqueId();

// 触发事件并传递唯一的事件来源
eventBus.emit('myEvent', uniqueSource, 'someData');
