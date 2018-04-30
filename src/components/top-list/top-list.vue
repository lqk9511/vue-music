<!-- 歌手排行详情页组件 -->
<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImg" :songs="songs"></music-list>
    </transition>
</template>

<script type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
export default {
  props: {},
  data() {
    return {
      songs: [],
      rank: true
    }
  },

  components: { MusicList },

  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImg() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters(['topList'])
  },
  created() {
    this._getMusicList()
  },
  mounted() {},

  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push({
          path: '/rank'
        })
        return
      }
      getMusicList(this.topList.id).then(result => {
        if (result.code === ERR_OK) {
          this.songs = this._normalizeSongs(result.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        const musicData = item.data
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>