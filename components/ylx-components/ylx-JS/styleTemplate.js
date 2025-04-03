import {convertStyleObjectToString} from "@/components/ylx-components/ylx-JS/common";


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
