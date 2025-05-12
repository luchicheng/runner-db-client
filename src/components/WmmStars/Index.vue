<template>
  <v-container class="back" grid-list-md text-md-center fluid fill-height>
    <v-layout column align-center> <!-- Added align-center for center alignment -->
      <v-flex>
        <p class="white--text text-center headline">Hall of Fame - Abbott World Marathon Majors finisher</p>
      </v-flex>
      <v-layout row wrap justify-center>
        <v-flex v-for="(six, index) in six_stars"
          :key="index" xs6 sm4 md3 lg2
          class="text-center"
        >
          <SixStarProfile :star="six"/>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import SixStarProfile from './SixStarProfile'

export default {
  data () {
    return {
      six_stars: [
        { name: 'Wei Zhang', img: 'wei.jpg', year: '2017', boston_year: '2017', chi_year: '2016', nyc_year: '2016', berlin_year: '2017', london_year: '2017', tokyo_year: '2017' },
        { name: 'Qifeng Weng', img: 'rico_star.jpg', year: '2018', boston_year: '2017', chi_year: '2016', nyc_year: '2017', berlin_year: '2017', london_year: '2017', tokyo_year: '2018' },
        { name: 'Quan Jiang', year: '2023', boston_year: '2022', chi_year: '2022', nyc_year: '2022', berlin_year: '2022', london_year: '2022', tokyo_year: '2023', wmmImages: ['quan_jiang.jpg', 'quan_jiang_2.jpg'] },
        { name: 'Yi Xiao', year: '2023', boston_year: '2019', chi_year: '2018', nyc_year: '2018', berlin_year: '2019', london_year: '2021', tokyo_year: '2023', wmmImages: ['yi_xiao.jpg'] },
        { name: 'Kevin Tan', img: 'kt.jpg', year: '2023', boston_year: '2019', chi_year: '2018', nyc_year: '2018', berlin_year: '2019', london_year: '2021', tokyo_year: '2023' },
        { name: 'Dingshan Xiao', img: 'daniel.jpg', year: '2023', boston_year: '2021', chi_year: '2019', nyc_year: '2021', berlin_year: '2019', london_year: '2022', tokyo_year: '2023' },
        { name: 'Xiangui Zeng', img: 'laurel.jpg', year: '2023', boston_year: '2021', chi_year: '2019', nyc_year: '2021', berlin_year: '2019', london_year: '2022', tokyo_year: '2023' },
        { name: 'Fu Nu Xin', year: '2023', boston_year: '2022', chi_year: '2022', nyc_year: '2022', berlin_year: '2022', london_year: '2022', tokyo_year: '2023', wmmImages: ['nuxin_fu.jpg'] },
        { name: 'Congcong Yu', img: 'carol.jpg', year: '2023', boston_year: '2019', chi_year: '2019', nyc_year: '2021', berlin_year: '2021', london_year: '2021', tokyo_year: '2023' },
        { name: 'Guoping Yang', year: '2023', boston_year: '2022', chi_year: '2018', nyc_year: '2019', berlin_year: '2022', london_year: '2023', tokyo_year: '2023', wmmImages: ['guoping_yang.jpg'] },
        { name: 'Derek Lai', year: '2023', boston_year: '2022', chi_year: '2022', nyc_year: '2022', berlin_year: '2023', london_year: '2023', tokyo_year: '2023', wmmImages: ['derek_lai.jpg'] },
        { name: 'Winnie Lai', year: '2023', boston_year: '2022', chi_year: '2022', nyc_year: '2022', berlin_year: '2023', london_year: '2023', tokyo_year: '2023', wmmImages: ['winnie_lai.jpg'] },
        { name: 'Steven Chiu', year: '2024', boston_year: '2022', chi_year: '2017', nyc_year: '2022', berlin_year: '2019', london_year: '2023', tokyo_year: '2024', wmmImages: ['stephen_chiu.jpg'] },
        { name: 'Yonggang Xiong', year: '2024', boston_year: '2024', chi_year: '2023', nyc_year: '2023', berlin_year: '2023', london_year: '2018', tokyo_year: '2018', wmmImages: ['yonggang_xiong_cert.jpg'] },
        { name: 'Nini Wu', year: '2024', boston_year: '2022', chi_year: '2019', nyc_year: '2022', berlin_year: '2023', london_year: '2024', tokyo_year: '2023', wmmImages: ['nini_wu.jpg', 'nini_wu_cert.jpg'] },
        { name: 'Yinghua Huang', year: '2024', boston_year: '2021', chi_year: '2022', nyc_year: '2022', berlin_year: '2023', london_year: '2024', tokyo_year: '2024', wmmImages: ['yinghua_huang.jpg'] },
        { name: 'Yue Zhang', year: '2023', boston_year: '2022', chi_year: '2022', nyc_year: '2023', berlin_year: '2024', london_year: '2023', tokyo_year: '2023', wmmImages: ['yue_zhang.jpg', 'yue_zhang_2.jpg'] },
        { name: 'Ping Chen', year: '2023', boston_year: '2022', chi_year: '2022', nyc_year: '2023', berlin_year: '2024', london_year: '2024', tokyo_year: '2023', wmmImages: ['ping_chen.jpg'] },
        { name: 'Yuanyuan An', img: '91BM-057-YuanyuanAn.jpg', year: '2024', boston_year: '2023', chi_year: '2023', nyc_year: '2024', berlin_year: '2024', london_year: '2024', tokyo_year: '2023' },
        { name: 'Bill Huang', img: 'bill.jpg', year: '2025', boston_year: '2021', chi_year: '2019', nyc_year: '2018', berlin_year: '2024', london_year: '2019', tokyo_year: '2025' },
        { name: 'Lipeng Zeng', img: '91BM-033-LipengZeng.jpg', year: '2025', boston_year: '2022', chi_year: '2022', nyc_year: '2023', berlin_year: '2023', london_year: '2023', tokyo_year: '2025' },
        { name: 'Jing Cao', img: '91BM-032-JingCao.jpg', year: '2025', boston_year: '2022', chi_year: '2022', nyc_year: '2023', berlin_year: '2023', london_year: '2023', tokyo_year: '2025' },
        { name: 'Yuehui Zhang', year: '2025', boston_year: '2024', chi_year: '2024', nyc_year: '2024', berlin_year: '2024', london_year: '2024', tokyo_year: '2025', wmmImages: ['yuehui_zhang.jpg'] },
        { name: 'Guoxiang Wang', year: '2025', boston_year: '2015', chi_year: '2019', nyc_year: '2019', berlin_year: '2024', london_year: '2025', tokyo_year: '2015', wmmImages: ['guoxiang_wang.jpg', 'guoxiang_wang_cert.jpg'] }
      ]
    }
  },
  components: {
    SixStarProfile
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
