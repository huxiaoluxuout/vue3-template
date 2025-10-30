// tabBarConfig.js
export default {
    // 代理商
    agent: [
        {
            "text": "首页",
            "pagePath": "pages/index/index",
            "iconPath": "static/tabbar/index.png",
            "selectedIconPath": "static/tabbar/index_on.png"
        },
        {
            "text": "我的",
            "pagePath": "pages/mine/mine",
            "iconPath": "static/tabbar/mine.png",
            "selectedIconPath": "static/tabbar/mine_on.png"
        }
    ],

    shop: [
        {
            "text": "首页",
            "pagePath": "pages/index_shop/index_shop",
            "iconPath": "static/tabbar/index.png",
            "selectedIconPath": "static/tabbar/index_on.png"
        },

        {
            "text": "购物车",
            "pagePath": "pages/cart_shop/cart_shop",
            "iconPath": "static/tabbar/cart.png",
            "selectedIconPath": "static/tabbar/cart_on.png"
        },
        {
            "text": "我的",
            "pagePath": "pages/mine_shop/mine_shop",
            "iconPath": "static/tabbar/mine.png",
            "selectedIconPath": "static/tabbar/mine_on.png"
        }
    ],

};
