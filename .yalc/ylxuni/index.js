import {UseEventBus} from "./src/UseEventBus.js";
import useReachBottom from "./src/useReachBottom.js";
import {MustLogIn} from "./src/useMustLogIn.js";

import {
    uniChooseImage,
    uniMakePhoneCall ,
    uniChooseLocation,
    uniGetLocation,
    uniOpenLocation,
    uniBlueTooth,
} from "./src/authorize/ylxUniApi.js";

function initModule(platformEvn) {
    const platform = platformEvn || uni;
    return {
        ylxEventBus: new UseEventBus(platform),
        ylxMustLogIn: new MustLogIn(platform),
        ylxNextPage: useReachBottom,
        ylxChooseImage: uniChooseImage,
        // ylxChooseLocation,
        // ylxGetLocation,
        // ylxOpenLocation,
    };
}

export default initModule;

