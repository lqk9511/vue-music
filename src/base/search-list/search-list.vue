<!-- 搜索历史的列表展示组件 -->
<template>
    <div class="search-list" v-show="searches.length">
        <ul>
            <li @click="selectItem(item)" v-for="(item,index) in searches" class="search-item" :key="index">
                <span class="text">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                    <i class="icon-delete"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    searches: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteOne(item) {
      this.$emit('delete', item)
    }
  }
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import '../../common/less/variable.less';
@import '../../common/less/mixin.less';
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    .text {
      flex: 1;
      color: @color-text-l;
    }
    .icon {
      .extend-click();
      .icon-delete {
        font-size: @font-size-small;
        color: @color-text-d;
      }
    }
  }
}
</style>