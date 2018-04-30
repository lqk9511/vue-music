<!-- loading 加载组件 -->
<template>
    <div class="loading">
        <img src="./loading.gif">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script type='text/ecmascript-6'>
const COMPONENT_NAME = 'loading'
export default {
  name: COMPONENT_NAME,
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '正在拼命加载...'
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import '../../common/less/variable.less';
.loading {
  width: 100%;
  text-align: center;
  img {
    width: 24px;
    height: 24px;
  }
  .desc {
    line-height: 20px;
    font-size: @font-size-small;
    color: @color-text-l;
  }
}
</style>