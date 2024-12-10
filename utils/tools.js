// 将参数转换为查询字符串
export const encodeObjectToQueryString = (params, starStr = '?') => {
    if (Object.keys(params).length === 0) {
        return '';
    }

    const separator = Object.keys(params)[0] === starStr ? '' : '&';
    return separator + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// 解析查询字符串
export const encodeParseQueryString = (queryString) => {
    const params = {};
    if (queryString.startsWith('?')) {
        queryString = queryString.slice(1);
    }
    const keyValues = queryString.split('&');
    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
};

/**
 * 提取指定属性并返回一个新对象
 * @param {Object} sourceAttributes - 源属性对象
 * @param {Array} additionalKeys - 需要额外提取的键数组
 * @returns {Object} - 包含提取属性的新对象
 */
export const extractAttributes = (sourceAttributes, additionalKeys = []) => {
    // 默认需要提取的属性数组
    const defaultKeys = ['flex', 'backgroundColor', 'filter', 'color'];

    // 初始化结果对象。
    const extractedAttributes = {};

    // 遍历默认键数组，提取属性值并添加到结果对象中。
    for (const key of defaultKeys) {
        const value = sourceAttributes[key];
        if (value !== null && value !== undefined) {
            extractedAttributes[key] = value;
        }
    }

    // 遍历额外键数组，提取属性值并添加到结果对象中。
    for (const key of additionalKeys) {
        const value = sourceAttributes[key];
        if (value !== null && value !== undefined) {
            extractedAttributes[key] = value;
        }
    }

    return extractedAttributes;
};

/**
 * 将样式对象转换为 CSS 字符串
 * @param {Object} styleObject - 样式对象
 * @returns {string} - CSS 字符串
 */
export const convertStyleObjectToString = (styleObject) => {
    const styleStringArray = [];
    for (const property in styleObject) {
        styleStringArray.push(`${property.replace(/([A-Z])/g, '-\$1').toLowerCase()}:${styleObject[property]}`);
    }
    return styleStringArray.join(';');
}

export function splitQueryUrl(pathUrl) {
    let url = /^\//.test(pathUrl) ? pathUrl : '/' + pathUrl;
    let [path, query] = url.split('?');
    return {
        path,
        query: query ? '?' + query : '',
        startStr: query ? '&' : '?',
    };
}


// 根据传入的索引批量删除
export function removeElementsByIndex(arr, indexes, callback) {
    indexes = Array.isArray(indexes) ? indexes : [indexes];
    // 根据传入的索引进行删除
    for (let i = indexes.length - 1; i >= 0; i--) {
        const index = indexes[i];
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
        }
    }
    typeof callback === 'function' && callback()

}

export function isEmptyData(value) {
    const dataType = Object.prototype.toString.call(value).replace(/\[object (\w+)]/, "$1").toLowerCase();
    if (value === undefined || value === null) {
        return true;
    } else if (dataType === 'string') {
        return value.trim().length === 0;
    } else if (dataType === 'array') {
        return value.length === 0;
    } else if (dataType === 'object') {
        return Object.keys(value).length === 0;
    } else if (dataType === 'number') {
        return value === 0;
    }
    return false;
}


// 判断数据类型
export function dataTypeJudge(val, type) {
    const dataType = Object.prototype.toString.call(val).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
}

// 将时间戳格式化为日期字符串
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 输出时间戳
export function dateTimestamp(date) {
// 将日期字符串转换为日期对象
    const dateObject = new Date(date);
// 获取时间戳（毫秒数）
    return dateObject.getTime();
}

export function computedRatio(strRatio) {
    let result = strRatio
    if (strRatio.indexOf(':') !== -1) {
        let ratio = strRatio.split(':').map(Number);
        result = (ratio[0] / ratio[1]).toFixed(3);
    }
    return result
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


export function parseSize(str) {
    let match = str.match(/(\d+)(rpx|px)/i);
    if (match) {
        return {
            num: parseFloat(match[1]),
            unit: match[2]
        };
    } else {
        return {
            num: parseFloat(str),
            unit: 'rpx'
        };
    }
}

export function removeTrailingZeros(value) {
    let stringValue = value.toString();
    return stringValue.replace(/(\.\d*?[1-9])0+$|\.0*$/, '\$1');
}

export function verificationID(IDStr) {
    const cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return cP.test(IDStr)
}

export function verificationPhone(phoneStr) {
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
    return reg.test(phoneStr)
}

/*
  if (!verificationPhone(phone.value)) {
    uni.showToast({
      icon: 'none',
      title: '输入正确的手机号'
    })
    return
  }
* */



export function simulateOperation() {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

        const operationShouldFail = Math.random() < 0.3;// 假设有30%的概率失败
        setTimeout(() => {
            if (operationShouldFail) {
                reject('失败');
            } else {
                resolve('成功');
            }
        }, delay);
    });
}
export function replaceStr(str,startStr, newStartStr) {
    if (str.startsWith(startStr)) {
        return str.replace(startStr, newStartStr);
    }
    return str;
}

// 检查 URL 是否以 http://localhost 开头，并进行替换
export function replaceLocalhostUrl(url, newHost) {
    const baseUrl = newHost.split(':')[0] + ':' + newHost.split(':')[1];
    return  replaceStr(url,'http://localhost',baseUrl)
}
// 数组的循环播放
export class ArrayPlayer {
    constructor(options) {
        this.onIndex = options.onIndex; // 当前显示的索引
        this.list = options.list;       // 数组列表
        this.callback = options.callback; // 索引变化时的回调函数
        this.loop = true;               // 控制是否循环播放
    }

    async play() {
        this.loop = true;
        while (this.loop) {
            const item = this.list[this.onIndex]; // 获取当前信息

            await new Promise(resolve => setTimeout(resolve, item.delay * 1000)); // 异步延时

            let onIndex = (this.onIndex + 1) % this.list.length; // 更新索引实现循环
            this.onIndex = onIndex
            this.callback?.(onIndex); // 执行回调函数
        }

    }

    // 用于停止数组的循环播放
    stop() {
        this.loop = false;
    }
}
