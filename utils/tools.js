/**
 * 将参数转换为查询字符串
 * @param {object} params
 * @param {string} [prefix]
 * @returns {string}
 */
export const objToStr = (params, prefix = '?') => {
    if (Object.keys(params).length === 0) {
        return ''
    } else {
        const str = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        return prefix + str;
    }


}

/**
 * 解析查询字符串
 * @param {string} queryString
 * @returns {object}}
 */
export const strToObj = (queryString) => {
    if (!queryString.startsWith('?')) return
    const params = {};
    queryString = queryString.slice(1);
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

export function debounce(func, wait, options = {}) {
    let timeoutId;
    let lastArgs;
    let lastThis;
    let result;
    let lastCallTime;

    const { leading = false, trailing = true } = options;

    function invokeFunc(time) {
        lastArgs = lastThis = undefined;
        lastCallTime = time;
        result = func.apply(lastThis, lastArgs);
        return result;
    }

    function leadingEdge(time) {
        lastCallTime = time;
        timeoutId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }

    function timerExpired() {
        const time = Date.now();
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        timeoutId = lastArgs = lastThis = undefined;
    }

    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        lastThis = this;

        if (isInvoking) {
            if (timeoutId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (trailing) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(timerExpired, wait);
                return invokeFunc(time);
            }
        }
        if (timeoutId === undefined) {
            timeoutId = setTimeout(timerExpired, wait);
        }
        return result;
    }

    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        return lastCallTime === undefined || timeSinceLastCall >= wait;
    }

    debounced.cancel = function() {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        lastCallTime = timeoutId = lastArgs = lastThis = undefined;
    };

    return debounced;
}

// 三角形判断
export function isValidTriangle(a, b, c) {
    // 检查任意两边之和是否大于第三边
    return (a + b > c) && (a + c > b) && (b + c > a);
}
// 算余弦值
export function getTriangleAngle(a, b, c, sideOppositeAngle) {
    // 使用余弦定理计算余弦值
    let cosineValue;
    if (sideOppositeAngle === 'a') {
        cosineValue = (b**2 + c**2 - a**2) / (2 * b * c);
    } else if (sideOppositeAngle === 'b') {
        cosineValue = (a**2 + c**2 - b**2) / (2 * a * c);
    } else if (sideOppositeAngle === 'c') {
        cosineValue = (a**2 + b**2 - c**2) / (2 * a * b);
    } else {
        throw new Error('Invalid sideOppositeAngle value. It should be "a", "b", or "c".');
    }

    // 使用反余弦函数计算角度（以弧度为单位）
    let angleRadians = Math.acos(cosineValue);

    // 将弧度转换为角度
    let angleDegrees = angleRadians * (180 / Math.PI);

    // 返回角度值（四舍五入到小数点后两位）
    return Math.round(angleDegrees * 1000) / 1000;
    // return angleRadians;
}

export function insertString(originalStr, index, insertStr) {
    // 边界检查
    if (index < 0 || index > originalStr.length) {
        return originalStr;
    }
    if (insertStr === '') {
        return originalStr;
    }

    // 处理空字符串情况
    if (originalStr === '') {
        return insertStr;
    }

    // 计算各部分长度
    const prefixLength = index;
    const insertLength = insertStr.length;
    const suffixLength = originalStr.length - index;
    const totalLength = prefixLength + insertLength + suffixLength;

    // 创建数组存储字符编码（UTF-16）
    const resultCodes = new Array(totalLength);
    let position = 0;

    // 复制原字符串前缀部分
    for (let i = 0; i < prefixLength; i++) {
        resultCodes[position++] = originalStr.charCodeAt(i);
    }

    // 复制插入字符串部分
    for (let i = 0; i < insertLength; i++) {
        resultCodes[position++] = insertStr.charCodeAt(i);
    }

    // 复制原字符串后缀部分
    for (let i = 0; i < suffixLength; i++) {
        resultCodes[position++] = originalStr.charCodeAt(index + i);
    }

    // 从字符编码数组构建最终字符串
    return String.fromCharCode.apply(null, resultCodes);
}


/**
 * 计算两个字符串的最长公共子序列（LCS）映射关系，并生成双向索引映射。
 *
 * 该函数返回两个数组：
 * - `newToOldMap`：新字符串每个字符索引对应旧字符串中的匹配索引，如无匹配则为 -1。
 * - `oldToNewMap`：旧字符串每个字符索引对应新字符串中的匹配索引，如无匹配则为 -1。
 *
 * 通过预先全量映射，支持快速查询新旧字符串中对应匹配字符的索引关系。
 *
 * @param {string} oldStr - 旧字符串，用作最长公共子序列的基准。
 * @param {string} newStr - 新字符串，需要映射到旧字符串。
 * @returns {Object} 返回包含双向映射的对象
 *
 * @example
 * const oldStr = "ABCDEF";
 * const newStr = "AEDF";
 * const { newToOldMap, oldToNewMap } = buildBidirectionalIndexMapsByLCS(oldStr, newStr);
 * console.log(newToOldMap); // 例如: [0, -1, 3, 4]
 * console.log(oldToNewMap); // 例如: [0, -1, -1, 2, 3, -1]
 */
export function buildBidirectionalIndexMapsByLCS(oldStr, newStr) {
    const m = oldStr.length, n = newStr.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // 计算最长公共子序列长度 dp 矩阵
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (oldStr[i - 1] === newStr[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const newToOldMap = new Array(n).fill(-1);
    const oldToNewMap = new Array(m).fill(-1);

    // 回溯 dp 矩阵，构建索引映射
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (oldStr[i - 1] === newStr[j - 1]) {
            newToOldMap[j - 1] = i - 1;
            oldToNewMap[i - 1] = j - 1;
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return { newToOldMap, oldToNewMap };
}


