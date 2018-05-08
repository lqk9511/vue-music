<!-- 左右切换的tab小组件 -->
<template>
    <ul class="switches">
        <li class="switch-item" :class="{active : currentIndex === index}" v-for="(item, index) in switches" :key="index">
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    siwtches: {
      type: Array,
      default: function() {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import '~common/less/variable.less';
.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid @color-highlight-background;
  border-radius: 5px;
  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: @font-size-medium;
    color: @color-text-d;
    &.active {
      background: @color-highlight-background;
      color: @color-text;
    }
  }
}
</style>