<!-- 音乐播放器圆形进度调组件 -->
<template>
    <div class="progress-circle">
        <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
            <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"></circle>
        </svg>
        <slot></slot>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    }
  },

  components: {},

  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray
    }
  },

  mounted() {},

  methods: {}
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import '../../common/less/variable.less';
.progress-circle {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: rgba(255, 205, 49, 0.5);
    }
    &.progress-bar {
      //   height: 30px;
      transform: scale(0.9) rotate(-90deg);
      stroke: #ffcd32;
      .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        .progress {
          position: absolute;
          height: 100%;
          background: @color-theme;
        }
        .progress-btn-wrapper {
          position: absolute;
          left: -8px;
          top: -13px;
          width: 30px;
          height: 30px;
          .progress-btn {
            position: relative;
            top: 7px;
            left: 7px;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            border: 3px solid @color-text;
            border-radius: 50%;
            background: @color-theme;
          }
        }
      }
    }
  }
}
</style>