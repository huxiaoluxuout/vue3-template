import {UseEventBus} from "./src/UseEventBus.js";
import useReachBottom from "./src/useReachBottom.js";
import {MustLogIn} from "./src/useMustLogIn.js";

import {NavigateTo, RedirectTo, Toast, LoginCode, PayMoneyApp, PayMoneyMp, OpenWxDebug,} from "./utils/uniTools.js";

import {
    uniChooseImage as ylxChooseImage,
    uniMakePhoneCall as ylxMakePhoneCall,
    uniChooseLocation as ylxChooseLocation,
    uniGetLocation as ylxGetLocation,
    uniOpenLocation as ylxOpenLocation,
    uniBlueTooth as ylxUniBlueTooth,
} from "./src/authorize/ylxUniApi.js";

function initModule(platformEvn) {
    const platform = platformEvn || uni;

    return {
        ylxEventBus: new UseEventBus(platform),
        // ylxMustLogIn: new MustLogIn(platform),
        // ylxNextPage: useReachBottom,
        ylxToast: Toast,
        // ylxLoginCode: LoginCode,
        // ylxPayMoneyApp: PayMoneyApp,
        // ylxPayMoneyMp: PayMoneyMp,
        ylxNavigateTo: NavigateTo,
        ylxRedirectTo: RedirectTo,
        // ylxOpenWxDebug: OpenWxDebug,
        // ylxChooseImage,
        // ylxMakePhoneCall,
        // ylxChooseLocation,
        // ylxGetLocation,
        // ylxOpenLocation,
    };
}

export default initModule;
