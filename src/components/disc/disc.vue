<!-- 歌单详情组件 -->
<template>
  <transition name="silde">
    <musiclist :title="title" :bg-image="bgImg" :songs="songs"></musiclist>
  </transition>
</template>

<script type='text/ecmascript-6'>
import musiclist from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
export default {
  props: {},
  data() {
    return {
      songs: []
    }
  },

  components: { musiclist },

  computed: {
    title() {
      return this.disc.dissname
    },
    bgImg() {
      return this.disc.imgurl
    },
    ...mapGetters(['disc'])
  },
  created() {
    this._getSongList()
  },
  mounted() {},

  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>
<style scoped lang='less' rel='stylesheet/less'>
.silde-enter-active,
.silde-leave-active {
  transition: all 0.3s;
}
.silde-enter,
.silde-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>