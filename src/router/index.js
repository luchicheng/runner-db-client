import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Users/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Mechandise from '@/components/shopping/Merchandise'
import Service from '@/components/shopping/Service'
import PaymentSuccess from '@/components/shopping/PaymentSuccess'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong/Index'
import Runners from '@/components/Runners/Index'
import MyPayments from '@/components/MyPayments/Index'
import Races from '@/components/Races/Index'
import Users from '@/components/Users/Index'
import PasswordReset from '@/components/Users/PasswordReset'
import MyInfo from '@/components/Users/MyInfo'
import NewsLetter from '@/components/NewsLetter/Index'
import Videos from '@/components/Videos/Index'
import Albums from '@/components/Albums/Index'
import Coaches from '@/components/Coaches/Index'
import BqStars from '@/components/BqStars/Index'
import AlbumsDetailPhoto from '@/components/Albums/AlbumsDetailPhoto'
import AlbumsDetail from '@/components/Albums/AlbumsDetail'
import RunnerTrainingRecord from '@/components/RunnerTrainingRecords/Index'
import RunnerRaceRecord from '@/components/RunnerRaceRecords/Index'
import SearchTrainingRecords from '@/components/SearchTrainingRecords/Index'
import SearchRaceRecords from '@/components/SearchRaceRecords/Index'
import TopRaceRecordsCY from '@/components/TopPerformance/TopRaceRecordsCY'
import TopRaceRecordsAY from '@/components/TopPerformance/TopRaceRecordsAY'
import Sponsor from '@/components/Sponsor/Index'

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
    { path: '/myPayments', name: 'myPayments', component: MyPayments },
    { path: '/races', name: 'races', component: Races },
    { path: '/members', name: 'members', component: Users },
    { path: '/shoppingMechandise', name: 'shoppingMechandise', component: Mechandise },
    { path: '/shoppingService', name: 'shoppingService', component: Service },
    { path: '/paymentSuccess', name: 'paymentSuccess', component: PaymentSuccess },
    { path: '/coaches', name: 'coaches', component: Coaches },
    { path: '/bqstars', name: 'bqstars', component: BqStars },
    { path: '/passwordReset', name: 'passwordReset', component: PasswordReset },
    { path: '/myInfo', name: 'myInfo', component: MyInfo },
    { path: '/newsLetter', name: 'newsLetter', component: NewsLetter },
    { path: '/sponsor', name: 'sponsor', component: Sponsor },
    { path: '/videos', name: 'videos', component: Videos },
    { path: '/albums', name: 'albums', component: Albums },
    { path: '/albums/:albumGid', name: 'albumsDetail', component: AlbumsDetail },
    { path: '/photos/:photoId', name: 'albumsDetailPhoto', component: AlbumsDetailPhoto },
    { path: '/topRaceRecordsCY', name: 'topRaceRecordsCY', component: TopRaceRecordsCY },
    { path: '/topRaceRecordsAY', name: 'topRaceRecordsAY', component: TopRaceRecordsAY },
    { path: '/data/trainingRecords', name: 'searchTrainingRecords', component: SearchTrainingRecords },
    { path: '/data/searchRaceRecords', name: 'searchRaceRecords', component: SearchRaceRecords },
    { path: '*', redirect: 'Home' }
  ]
})
