import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong/Index'
import Runners from '@/components/Runners/Index'
import Races from '@/components/Races/Index'
import News from '@/components/News/Index'
import RunnerTrainingRecord from '@/components/RunnerTrainingRecords/Index'
import RunnerRaceRecord from '@/components/RunnerRaceRecords/Index'
import SearchTrainingRecords from '@/components/SearchTrainingRecords/Index'
import SearchRaceRecords from '@/components/SearchRaceRecords/Index'
import TopRaceRecordsCY from '@/components/TopPerformance/TopRaceRecordsCY'
import TopRaceRecordsAY from '@/components/TopPerformance/TopRaceRecordsAY'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home },
    { path: '/songs', name: 'songs', component: Songs },
    { path: '/songs/create', name: 'songs-create', component: CreateSong },
    { path: '/songs/:songId', name: 'song', component: ViewSong },
    { path: '/songs/:songId/edit', name: 'song-edit', component: EditSong },
    { path: '/runners/:runnerId/training', name: 'runner-training', component: RunnerTrainingRecord },
    { path: '/runners/:runnerId/race', name: 'runner-race', component: RunnerRaceRecord },
    { path: '/runners', name: 'runners', component: Runners },
    { path: '/races', name: 'races', component: Races },
    { path: '/news', name: 'news', component: News },
    { path: '/topRaceRecordsCY', name: 'topRaceRecordsCY', component: TopRaceRecordsCY },
    { path: '/topRaceRecordsAY', name: 'topRaceRecordsAY', component: TopRaceRecordsAY },
    { path: '/data/trainingRecords', name: 'searchTrainingRecords', component: SearchTrainingRecords },
    { path: '/data/searchRaceRecords', name: 'searchRaceRecords', component: SearchRaceRecords },
    { path: '*', redirect: 'Home' }
  ]
})