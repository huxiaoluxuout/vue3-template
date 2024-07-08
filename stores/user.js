import {defineStore} from 'pinia';

const userInfo = {
    "id": '',
    "nickname": "未登录",
    "mobile": "******",
    "avatar": "/static/muo_ren_tou_xiang.png",
    "gender": 2,
    "birthday": "1997-03-08",
    "money": "0.00",
    "score": 0,
    "hair_length": 0,
    "coupon_num": 0,
    "face": 0,
    "work": 0,
    "edu": 0,
    "switch": 0,
    "vip_time": 0,
    "is_del": 0,
    "vip_id": 0,
    "token": "",
    "user_id": 5,
    "createtime": 1719890457,
    "expiretime": 1722482457,
    "expires_in": 2591999,
    "balance": 0,
    "is_vip": false
}
export const useUserStore = defineStore('user', {
    state: () => ({

        isLoggedIn: false,
        userInfo: {
            "id": '',
            "nickname": "未登录",
            "mobile": "******",
            "avatar": "/static/muo_ren_tou_xiang.png",
            "gender": 2,
            "birthday": "1997-03-08",
            "money": "0.00",
            "score": 0,
            "hair_length": 0,
            "coupon_num": 0,
            "face": 0,
            "work": 0,
            "edu": 0,
            "switch": 0,
            "vip_time": 0,
            "is_del": 0,
            "vip_id": 0,
            "token": "",
            "user_id": 5,
            "createtime": 1719890457,
            "expiretime": 1722482457,
            "expires_in": 2591999,
            "balance": 0,
            "is_vip": false

        }
    }),
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo;
            uni.setStorage({
                key: 'userInfo',
                data: userInfo,
                success: function () {
                }
            })
        },
        login(userInfo) {
            this.setUserInfo(userInfo);
            this.isLoggedIn = true;
            console.log('login登录', this.isLoggedIn);
        },
        logout() {
            this.userInfo = userInfo;
            this.isLoggedIn = false;
            console.log('logout退出', this.isLoggedIn);
        },
        update(key, value) {
            this.userInfo[key] = value;
        },
    }
});
