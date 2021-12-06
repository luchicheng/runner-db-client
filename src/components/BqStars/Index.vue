<template ma-0>
  <v-container class="back" grid-list-md text-md-center fluid fill-height>
    <v-layout row>
      <v-flex>
        <p class="white--text align-end">Hall of Fame - Abbott World Marathon Majors finisher and Boston Marathon finisher</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex v-for="(six, index) in six_stars"
        :key="index" md2
      >
        <SixStarProfile :star="six"/>
      </v-flex>
      <v-flex v-for="(s, index) in stars"
        :key="six_stars.length+index" md2
      >
        <StarProfile :star="s"/>
      </v-flex>
      <v-flex
        v-for="n in 40-stars.length"
        :key="six_stars.length+n+stars.length" md2
      >
        <StarProfile/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StarProfile from './StarProfile'
import SixStarProfile from './SixStarProfile'

export default {
  data () {
    return {
      six_stars: [
        { name: 'Wei Zhang', desc: '', nickName: '', img: 'wei.jpg', year: '2017', tokyo_year: '2017', berlin_year: '2017', london_year: '2017', chi_year: '2016', boston_year: '2016', nyc_year: '2017' },
        { name: 'Rico Weng', desc: '', nickName: '', img: 'rico_star.jpg', year: '2018', tokyo_year: '2018', berlin_year: '2017', london_year: '2017', chi_year: '2016', boston_year: '2017', nyc_year: '2017' }
      ],
      stars: [
        { name: 'Luchi Cheng', desc: '', nickName: '', img: 'luchi.jpg', year: '2019', serielNumber: '91 BM-001', bib: '2319', time: '2:53:21' },
        { name: 'Jun Zhang', desc: '', nickName: '', img: 'jun_star.jpg', year: '2019', serielNumber: '91 BM-002', bib: '4973', time: '2:59:30' },
        { name: 'Rocky Lu', desc: '', nickName: '', img: 'rocky.jpg', year: '2019', serielNumber: '91 BM-003', bib: '7418', time: '3:13:50' },
        { name: 'Kevin Tan', desc: '', nickName: '', img: 'kt.jpg', year: '2019', serielNumber: '91 BM-004', bib: '9216', time: '3:13:17' },
        { name: 'Andy Liu', desc: '', nickName: '', img: 'andy.jpg', year: '2019', serielNumber: '91 BM-005', bib: '9327', time: '3:12:48' },
        { name: 'Yi Xiao', desc: '', nickName: '', img: 'yi.jpg', year: '2019', serielNumber: '91 BM-006', bib: '19565', time: '4:01:08' },
        { name: 'Carol Yu', desc: '', nickName: '', img: 'carol.jpg', year: '2019', serielNumber: '91 BM-007', bib: '20926', time: '3:49:48' },
        { name: 'WenDong Wu', desc: '', nickName: '', img: 'dong.jpg', year: '2019', serielNumber: '91 BM-008', bib: '21747', time: '4:03:48' },
        { name: 'Tina Wang', desc: '', nickName: '', img: 'tina.jpg', year: '2019', serielNumber: '91 BM-009', bib: '22686', time: '3:46:03' },
        { name: 'Sabrina Jin', desc: '', nickName: '', img: 'sa.jpg', year: '2019', serielNumber: '91 BM-010', bib: '22706', time: '3:52:05' },
        { name: 'Jessica Zhou', desc: '', nickName: '', img: 'jessica.jpg', year: '2019', serielNumber: '91 BM-011', bib: '22954', time: '4:18:49' },
        { name: 'Zhenshun (Bill) Huang', desc: '', nickName: '', img: 'bill.jpg', year: '2021', serielNumber: '91 BM-012', bib: '1253', time: '2:56:42' },
        { name: 'Xinjian (Jim) Xu', desc: '', nickName: '', img: 'jim.jpg', year: '2021', serielNumber: '91 BM-013', bib: '4413', time: '3:14:47' },
        { name: 'Dingshan(Daniel) Xiao', desc: '', nickName: '', img: 'daniel.jpg', year: '2021', serielNumber: '91 BM-014', bib: '8748', time: '3:46:59' },
        { name: 'Yinghua(Julie) Huang', desc: '', nickName: '', img: 'julie.jpg', year: '2021', serielNumber: '91 BM-015', bib: '13616', time: '3:56:12' },
        { name: 'Xiaogui(Laurel) Zeng', desc: '', nickName: '', img: 'laurel.jpg', year: '2021', serielNumber: '91 BM-016', bib: '14537', time: '3:46:59' }
      ]
    }
  },
  async mounted () {
  },
  components: {
    StarProfile, SixStarProfile
  }
}
</script>

<style>
.back {
  background: url('https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')
    no-repeat center center fixed !important;
  background-size: cover;
}
</style>
