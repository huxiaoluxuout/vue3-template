import pagesJson from "@/pages.json";


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


export const getSystemInfo = (function () {
    let cachedInfo = null;
    return function () {
        if (cachedInfo) return cachedInfo;
        // #ifdef MP-WEIXIN
        cachedInfo = uni.getWindowInfo();
        // #endif

        // #ifndef MP-WEIXIN
        cachedInfo = uni.getSystemInfoSync();
        // #endif

        return cachedInfo;
    }
})();

export const getMenuButtonBounding = (function () {
    let cachedInfo = null;
    return function () {
        if (cachedInfo) return cachedInfo;
        cachedInfo = uni.getMenuButtonBoundingClientRect();
        return cachedInfo;
    }
})();

export const getPages = (function () {
    let cachedInfo = null;
    return function () {
        if (cachedInfo) return cachedInfo;

        const {
            pages,
            tabBar: {
                list: tabBarPages = []
            } = {list: []},
            subPackages: subPages = []
        } = pagesJson || {};

        const pagesPaths = pages.map(item => item.path);

        // const subPackages = []
        const subPackages = subPages.reduce((acc, item) => {
            const paths = item.pages.map(subItem => item.root + ylxFilterPath(subItem.path));
            return acc.concat(paths);
        }, []);

        const tabBarPath = tabBarPages.map(item => item.pagePath);

        cachedInfo = {
            pagesAll: [...pagesPaths, ...subPackages],
            tabBar: pagesJson.tabBar,
            tabBarAll: tabBarPath
        }
        return cachedInfo;
    }
})();


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
