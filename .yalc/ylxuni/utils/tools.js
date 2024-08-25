export function useDoQueue() {
    let funcList = [];
    let addFuncList = [];

    const invokeAllFn = function () {
        const allHandlers = addFuncList.concat(funcList);
        while (allHandlers.length > 0) {
            const {func, args} = allHandlers.pop();
            func(...args);
        }
    };


    //  方法1:  替换事件
    const setFunction = (func, ...args) => {
        funcList = [{func, args}];
    };

    //  方法2: 添加事件
    const addFunctionsCheckDuplicate = (func, ...args) => {
        const isDuplicate = addFuncList.some(item => item.func === func && item.args.length === args.length);
        if (!isDuplicate) {
            addFuncList.push({func, args});
        }
    };

    return {
        addFunctions: addFunctionsCheckDuplicate,
        setFunction,
        invokeAllFn,
    };
}

/**
 * 判断数据类型
 * @param val
 * @param type
 * @returns {boolean|string}
 */
export function dataTypeJudge(val, type) {
    const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
}

/**
 * 创建一个代理对象,用于监控对目标对象属性的修改。
 * @param {Object} target - 要代理的目标对象
 * @returns {Object} 返回一个代理对象,该对象会在属性被修改时输出日志
 * @throws {TypeError} 如果传入的参数不是对象,则抛出类型错误
 */
export function createProxy(target) {
    // 检查参数是否为对象
    if (typeof target !== 'object' || target === null) {
        throw new TypeError('Target must be an object');
    }

    // 2. 定义 Proxy 处理器
    const handler = {
        get(target, property, receiver) {
            // console.log(`正在访问属性: ${property}`);
            return Reflect.get(target, property, receiver);
        },

        set(target, property, value, receiver) {
            // console.log(`正在设置属性: ${property} = ${value}`);
            return Reflect.set(target, property, value, receiver);
        },
    };

    return new Proxy(target, handler);

}

/**
 *
 * @param target
 * @returns {{interceptor: (function({onError: *, onSuccess: *}): function(...[*]): void), interceptorProxy: Object}}
 */
export function useInterceptorProxy(target) {
    const interceptorProxy = createProxy(target)
    return {
        interceptorProxy,
        interceptor: function ({onError, onSuccess}) {
            if (typeof onError !== 'function') {
                console.error(`${onError}:必须是函数`)
                return
            }
            if (typeof onSuccess !== 'function') {
                console.error(`${onSuccess}:必须是函数`)
                return
            }
            return function (...args) {
                if (interceptorProxy[Object.keys(target)[0]]) {
                    onSuccess(...args)
                } else {
                    onError()
                }
            }
        }
    }
}


export const promiseCallback = (promiseFn, ...args) => {
    return {
        onSuccess: (callback) => {
            promiseFn(...args).then(res => {
                callback(res);
            });
        },
        onError: (callback) => {
            promiseFn(...args).catch(err => {
                callback(err);
            });
        }
    };
}
