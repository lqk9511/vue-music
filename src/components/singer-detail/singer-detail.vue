<!-- 歌手详情页面 -->
<template>
  <transition name="slide">
    <!-- <div class="singer-detail"></div> -->
    <musiclist :songs="songs" :bg-image="bgImage" :title="title"></musiclist>
  </transition>
</template>

<script type='text/ecmascript-6'>
import musiclist from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },

  components: { musiclist },

  computed: {
    bgImage() {
      return this.singer.avatar
    },
    title() {
      return this.singer.name
    },
    ...mapGetters(['singer'])
  },

  mounted() {},

  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push({
          path: '/singer'
        })
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  created() {
    this._getDetail()
  }
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
@import '../../common/less/variable.less';
// .singer-detail {
//   position: fixed;
//   z-index: 100;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: @color-background;
// }
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>