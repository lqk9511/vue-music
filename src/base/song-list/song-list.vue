<!-- song-list 组件的实现 -->
<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" class="item" v-for="(song ,index) in songs" :key="index">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    songs: {
      type: Array,
      default: function() {
        return []
      }
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
    },
    getDesc(song) {
      return `${song.singer} · ${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import '~common/less/variable.less';
@import '~common/less/mixin.less';
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: @font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          .bg-img('../../base/song-list/first');
          background-size: 25px 24px;
        }
        &.icon1 {
          .bg-img('../../base/song-list/second');
          background-size: 25px 24px;
        }
        &.icon2 {
          .bg-img('../../base/song-list/third');
          background-size: 25px 24px;
        }
      }
      .text {
        color: @color-theme;
        font-size: @font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        .no-wrap();
        color: @color-text;
      }
      .desc {
        .no-wrap();
        margin-top: 4px;
        color: @color-text-d;
      }
    }
  }
}
</style>