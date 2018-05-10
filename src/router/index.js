import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import UserCenter from 'components/user-center/user-center'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'

Vue.use(Router)
// {
//   path: '/',
//   name: 'HelloWorld',
//   component: HelloWorld
// }
export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children: [{
      path: ':id',
      component: TopList
    }]
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [{
      path: ':id',
      component: Disc
    }]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [{
      path: ':id',
      component: SingerDetail
    }]
  },
  {
    path: '/user',
    name: 'UserCenter',
    component: UserCenter

  }
  ]
})
