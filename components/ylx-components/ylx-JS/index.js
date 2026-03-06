import {config} from "@/utils/config.js";
export const uploadFileUrl = config.apiBaseUrl + '/common/uploadFileUrl'
export const BASE_URL = config.apiBaseUrl



// 检查 URL 是否以 http://localhost 开头，并进行替换
export function replaceLocalhostUrl(url, newHost) {
    const baseUrl = newHost.split(':')[0] + ':' + newHost.split(':')[1];
    return  replaceStr(url,'http://localhost',baseUrl)
}
export function replaceStr(str,startStr, newStartStr) {
    if (str.startsWith(startStr)) {
        return str.replace(startStr, newStartStr);
    }
    return str;
}
export function computedRatio(strRatio) {
    let result = strRatio
    if (strRatio.indexOf(':') !== -1) {
        let ratio = strRatio.split(':').map(Number);
        result = (ratio[0] / ratio[1]).toFixed(3);
    }
    return result
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
