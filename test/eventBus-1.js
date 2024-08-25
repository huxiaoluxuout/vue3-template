/*
class EventPool {
    constructor() {
        this.events = {}; // 存储事件类型及其对应的监听器数组
    }

    // 注册事件监听
    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(callback);
    }

    // 移除事件监听
    off(type, callback) {
        if (this.events[type]) {
            this.events[type] = this.events[type].filter(cb => cb !== callback);
        }
    }

    // 触发事件
    emit(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(...args));
        }
    }

    // 获取事件类型的所有监听函数
    getListeners(type) {
        return this.events[type] || [];
    }
}

class EventStack {
    constructor() {
        this.stack = []; // 存储事件及其上下文
    }

    // 压入事件
    push(event, context) {
        this.stack.push({event, context});
    }

    // 弹出事件
    pop() {
        return this.stack.pop();
    }

    // 查看栈顶事件
    peek() {
        return this.stack[this.stack.length - 1];
    }

    // 清空栈
    clear() {
        this.stack = [];
    }
}

class EventCenter {
    constructor() {
        this.eventPool = new EventPool();
        this.eventStack = new EventStack();
    }

    // 注册事件监听
    on(type, callback) {
        this.eventPool.on(type, callback);
    }

    // 移除事件监听
    off(type, callback) {
        this.eventPool.off(type, callback);
    }

    // 触发事件
    emit(type, ...args) {
        this.eventPool.emit(type, ...args);
        this.eventStack.push(type, args);
    }

    // 获取最近的事件及其上下文和监听函数
    getRecentEvent() {
        const recentEvent = this.eventStack.peek();
        if (recentEvent) {
            const listeners = this.eventPool.getListeners(recentEvent.event);
            return {...recentEvent, listeners};
        }
        return null;
    }

    // 清空事件栈
    clearEventStack() {
        this.eventStack.clear();
    }
}





// 创建一个 EventCenter 实例
const eventCenter = new EventCenter();

// 定义一个监听函数
function handleData(data) {
    console.log(`Received data: ${data}`);
}

function handleData2(data) {
    console.log(`Received data: ${data}`);
}

// 注册事件监听
eventCenter.on('data', handleData);
eventCenter.on('data', handleData2);

// 触发事件
eventCenter.emit('data', 'Hello World!');  // 控制台输出：Received data: Hello World!

// 获取最近的事件及其上下文和监听函数
const recentEvent = eventCenter.getRecentEvent();
console.log(`Recent event: ${recentEvent.event}, context:`, recentEvent.context);  // 控制台输出：Recent event: data, context: ['Hello World!']
console.log(`Listeners for recent event:`, recentEvent.listeners);  // 控制台输出：Listeners for recent event: [ [Function: handleData] ]

// 移除事件监听
eventCenter.off('data', handleData);

// 再次触发事件，不会有输出，因为监听器已被移除
eventCenter.emit('data', 'Hello Again!');
*/
