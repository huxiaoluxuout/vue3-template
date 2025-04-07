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
// 路径补全
export const ylxFilterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
};

/**
 *
 * @param {Object | string } styles
 * @returns {string}
 */
const localStringStyle = (styles) => {
    if (typeof styles === 'string') {
        return styles;
    } else {
        return convertStyleObjectToString({
            ...styles
        })
    }
};

const componentsMixin = {
    options: {
        virtualHost: true
    },
    props: {
        customStyle: {
            type: [Object, String],
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ''
        },

    },
    computed: {
        customStringStyle() {
            return localStringStyle(this.customStyle)
        },
    }
};
export {
    localStringStyle,
    componentsMixin
}
