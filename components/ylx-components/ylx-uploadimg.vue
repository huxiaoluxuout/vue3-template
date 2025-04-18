<template>

  <view class="ylx-flex-container" :class="_resultClass" :style="_resultStyle">
    <!--图片-->
    <view class="ylx-flex-item upload-img" v-for="(item,index) in localFileList" :key="index">
      <ylx-image :src="item.thumb" custom-class="ylx-img" width="100%" @imgClick="previewImage(index)"></ylx-image>
      <view class="del-icon" @click.stop="delImage(index)">
        <image :src="closeSrc" class="del"></image>
      </view>
    </view>

    <!--图片上传-->
    <view v-show="isShowUpload" class="ylx-flex-item upload-icon-position" @click="chooseFile">
      <slot name="upload">
        <ylx-image custom-class="ylx-img" width="100%" :src="uploadSrc"></ylx-image>
      </slot>
    </view>
  </view>

</template>

<script>


import {uploadFileUrl} from "@/network/config"

import {componentsMixin, localStringStyle, convertStyleObjectToString} from "@/components/ylx-components/ylx-JS/common";


import {camera, close} from "@/components/ylx-components/ylx-static/base64.js";
import {imgHttpSuccess, uploadFilePromise} from "@/components/ylx-components/ylx-JS/uploadFilePromise.js";

import uniChooseImage from "@/components/ylx-components/ylx-JS/ylxuni.chooseImage.esm.js"

export default {
  name: "ylx-uploadimg",
  mixins: [componentsMixin],
  data() {
    return {
      uploadSrc: camera,
      closeSrc: close,
    }
  },
  props: {
    fileImageList: {
      type: Array,
      default: () => []
    },

    // ======================
    // 总共允许上传数量
    limit: {
      type: [Number, String],
      default: 3
    },
    // 一行有几列
    columnsLimit: {
      type: [Number, String],
      default: 3
    },
    // 宽
    width: {
      type: [Number, String],
      // default: '100%'
      default: '200rpx'
    },
    // 宽高比例
    scale: {
      type: String,
      default: '1'
    },

    gap: {
      type: String,
      default: `30rpx`
    },

    fileType: {
      type: String,
      default: 'image' //文件类型，image/video/audio
    },

    action: {
      type: String,
      default: uploadFileUrl || ''
    },
    fileName: {
      type: String,
      default: 'file'
    },
    config: {
      type: Object,
      default: () => {
      }
    },

    hiddenUploadIcon: Boolean,

    onlyCamera: Boolean,

    hidden: Boolean,//视觉隐藏
    preview: Boolean,

    imgSuccessHandler: {
      type: Function,
      default: imgHttpSuccess
    },
  },

  computed: {
    _resultClass() {
      return this.customClass + (this.hidden ? 'hidden-view' : '');
    },
    _resultStyle() {
      const [a, b] = this.scale.split(':')
      return localStringStyle(convertStyleObjectToString({
        '--num-columns': this.columnsLimit,
        '--scale': this.scale,
        '--aspect-ratio': this.scale.indexOf(':') !== -1 ? `${a}/${b}` : `${a}/${a}`,
        '--view-width': this.width,
        '-gap': this.gap,
      })) + ';' + localStringStyle(this.customStringStyle)
    },
    localFileList() {
      this.fileImageList.forEach(item => {
        if (!item.status && item.url) {
          item.status = 'success'
          item.thumb = item.url
        }
      })
      return this.fileImageList
    },
    isShowUpload() {
      return this.hiddenUploadIcon ? false : Number(this.limit) > this.localFileList.length;
    },
    chooseCountLimit() {
      if (Number(this.limit) === 1) {
        return Number(this.limit);

      } else {
        return Number(this.limit) - this.localFileList.length;

      }

    }
  },

  methods: {
    getHandlerImgUrl(url) {
      let info = {tempFiles: [{size: 1000, path: url}]}
      this.afterRead(info)
    },

    chooseFile() {
      const that = this
      let sourceTypes = ['album', 'camera']


      if (this.onlyCamera) {
        sourceTypes.splice(0, 1)
        // #ifdef APP-PLUS
        uni.$off('imgUrl', this.getHandlerImgUrl)
        uni.$once('imgUrl', this.getHandlerImgUrl)
        uni.navigateTo({
          url: '/pages/custom-camera/custom-camera'
        })
        return
        // #endif

      }

      uni.chooseImage({
        count: that.chooseCountLimit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.afterRead(res)
        },
        fail: function (fail) {
          console.warn(fail)
        },
      });
      // TODO App 待完善
     /* uniChooseImage({
        count: that.chooseCountLimit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.afterRead(res)
        },
        fail: function (fail) {
          console.warn(fail)
        },
      })*/

    },

    // 删除图片
    delImage(index) {
      const that = this
      uni.showModal({
        title: '确定删除吗?',
        success: function (res) {
          if (res.confirm) {
            that.$emit('updateFileImageList', {
              type: 'del',
              param: index
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },

    // 预览图片
    previewImage(index) {
      const that = this;
      if (!that.previewImage) return
      uni.previewImage({
        urls: that.localFileList.map(item => item.thumb),
        current: index,
      })
    },

    // 新增图片
    async afterRead(event) {
      const that = this
      if (Number(that.limit) === 1) { // 替换效果(场景：头像)
        that.$emit('updateFileImageList', {type: 'del', param: 0})
      }
      let fileImageListLen = that.localFileList.length
      const arrFile = event.tempFiles.map(item => {
        const resultItem = {size: item.size, thumb: item.path, url: item.path}
        that.$emit('updateFileImageList', {
          type: 'uploading',
          param: {
            ...resultItem,
            status: 'uploading',
            message: '上传中'
          }
        })
        return resultItem
      })

      for (let i = 0; i < arrFile.length; i++) {
        const imgUrl = await uploadFilePromise(arrFile[i].url, that.imgSuccessHandler, that.config)
        const item = that.localFileList[fileImageListLen]
        that.$emit('updateFileImageList', {
          type: 'success',
          param: {
            fileImageListLen,
            itemAssign: Object.assign(item, {
              status: 'success',
              message: '',
              url: imgUrl
            })
          }
        });

        fileImageListLen++
      }
    },

  }

}
</script>

<style scoped lang="scss">
.hidden-view {
  pointer-events: none;
  position: absolute;
  top: -10000px;
  left: -10000px;
}


.del-icon {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 1;
  background-color: #333333;
  border-bottom-left-radius: 200px;
  border-top-right-radius: 60rpx;
  display: flex;
  padding: 4rpx 4rpx 10rpx 10rpx;

  .del {
    display: block;
    width: 20rpx;
    height: 20rpx;

  }
}


.upload-img {
  position: relative;
  border-radius: 10rpx;
  aspect-ratio: var(--aspect-ratio);
  box-sizing: border-box;
}

:deep(.ylx-img) {
  border-radius: 10rpx;
}

.upload-icon-position {
  border: 1px solid #e9e9e94d;
  border-radius: 10rpx;
  aspect-ratio: var(--aspect-ratio);

}


</style>

