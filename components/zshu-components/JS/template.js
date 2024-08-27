import {convertStyleObjectToString} from "@/utils/tools.js";


export const componentsMixin = {
    options: {
        virtualHost: true
    },
    props: {
        customStyle: {
            type: [Object, String],
            default: () => {
            }
        },
        customClass: {
            type: String,
            default: ''
        },
    },
    computed: {
        localCustomStyle() {
            if (typeof this.customStyle === 'string') {
                return this.customStyle;
            } else {
                return convertStyleObjectToString({
                    ...this.customStyle
                });
            }
        }
    }
};
