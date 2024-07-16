/**
 * UniEventBusCore 利用 uni-app 中创建一个全局的事件总线，支持事件注册、触发和导航功能。
 */
export class UniEventBusCore {
    // 定义导航类型常量
    static NAVIGATION_TYPES = {
        NAVIGATE_TO: 'navigateTo',
        SWITCH_TAB: 'switchTab'
    };

    // 当前页面路径
    currentRoute = '';

    // 构造函数，初始化默认的全局回调函数
    static defaultGlobalCallback = () => console.log('AppEvent');

    /**
     * 注册全局事件监听器
     * @param {Function} globalCallback 全局回调函数
     */
    registerGlobalEvent(globalCallback = UniEventBusCore.defaultGlobalCallback) {
        uni.$on('AppEvent', globalCallback);
        uni.$on('OnGlobalEvent', async ({navigationType = UniEventBusCore.NAVIGATION_TYPES.NAVIGATE_TO, targetPath, isNavigationEnabled = true, options = {}}) => {
            const {path, query, delimiter} = UniEventBusCore.parseUrl(targetPath);
            uni.$emit(path, options);
            uni.$once('GlobalEvent' + path, () => uni.$emit(path, options));
            UniEventBusCore.handleNavigation(navigationType, path, query, delimiter, options, isNavigationEnabled);
        });
    }

    /**
     * 处理导航逻辑
     * @param {string} navigationType 导航类型
     * @param {string} path 目标路径
     * @param {string} query 查询参数
     * @param {string} delimiter 查询参数的分隔符
     * @param {Object} options 选项参数
     * @param {boolean} isNavigationEnabled 是否启用导航
     */
    static handleNavigation(navigationType, path, query, delimiter, options, isNavigationEnabled) {
        if (!isNavigationEnabled) return;
        if (navigationType !== UniEventBusCore.NAVIGATION_TYPES.NAVIGATE_TO && navigationType !== UniEventBusCore.NAVIGATION_TYPES.SWITCH_TAB) {
            console.error(`导航路径：${JSON.stringify(UniEventBusCore.NAVIGATION_TYPES)}`);
            return;
        }

        const fullPath = navigationType === UniEventBusCore.NAVIGATION_TYPES.NAVIGATE_TO ? `${path}${query}${delimiter}currentRoute=${path}` : path;
        uni[navigationType]({
            url: fullPath,
            fail: err => console.error('Navigation Error:', err),
        });
    }

    /**
     * 发送页面事件，并根据需要进行导航
     * @param {Object} config 配置对象
     * @param {string} config.targetPath 目标路径
     * @param {Object} [config.options={}] 传递的数据
     * @param {boolean} [isNavigationEnabled=false] 是否启用导航
     * @param {string} [navigationType=navigateTo] 导航类型
     */
    async sendPage({targetPath, options = {}}, isNavigationEnabled = false, navigationType = UniEventBusCore.NAVIGATION_TYPES.NAVIGATE_TO) {
        const currentRoute = await UniEventBusCore.getRoute();
        uni.$emit('OnGlobalEvent', {
            isNavigationEnabled,
            navigationType,
            targetPath,
            options: typeof options === 'object' ? Object.assign({fromPage: currentRoute}, options) : options,
        });
    }

    /**
     * 发送全局事件
     * @param {Object} [options={}] 选项参数
     */
    async sendGlobal(options = {}) {
        const currentRoute = await UniEventBusCore.getRoute();
        uni.$emit('AppEvent', typeof options === 'object' ? Object.assign({fromPage: currentRoute}, options) : options);
    }

    /**
     * 获取当前页面路径
     * @return {Promise<string>} 返回当前页面路径的 Promise 对象
     */
    static getRoute() {
        const pages = getCurrentPages();
        const currentRoute = '/' + pages[pages.length - 1]['route'];
        return Promise.resolve(currentRoute);
    }

    /**
     * 注册页面通知回调
     * @param {Function} callback 回调函数
     */
    onPageNotification(callback) {
        if (typeof callback !== 'function' || !this.currentRoute) return;

        let isRegistered = false;
        uni.$emit(this.currentRoute, () => {
            isRegistered = true;
            uni.$off(this.currentRoute, callback);
        });

        UniEventBusCore.registerEventHandler(isRegistered, this.currentRoute, callback);
    }

    /**
     * 注册事件处理程序
     * @param {boolean} isRegistered 是否已经注册
     * @param {string} eventName 事件名称
     * @param {Function} eventHandler 事件处理函数
     */
    static registerEventHandler(isRegistered, eventName, eventHandler) {
        if (isRegistered) return;
        uni.$on(eventName, eventHandler);
        uni.$emit('GlobalEvent' + eventName);
    }

    /**
     * 获取当前页面路径并设置为当前路径
     * @return {Promise<string>} 返回当前页面路径的 Promise 对象
     */
    getCurrentRoute() {
        return UniEventBusCore.getRoute().then(route => {
            this.currentRoute = route;
            return route;
        });
    }

    /**
     * 移除当前页面的事件监听
     * @param {string} eventName 事件名称
     */
    removeCurrentRouteEvent(eventName) {
        uni.$off(eventName);
    }

    /**
     * 解析 URL 路径
     * @param {string} pathUrl 路径 URL
     * @return {Object} 解析后的对象，包含路径、查询参数和分隔符
     */
    static parseUrl(pathUrl) {
        const url = pathUrl.startsWith('/') ? pathUrl : '/' + pathUrl;
        const [path, query] = url.split('?');
        return {
            path,
            query: query ? '?' + query : '',
            delimiter: query ? '&' : '?',
        };
    }
}
