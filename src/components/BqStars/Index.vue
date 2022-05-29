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
        v-for="n in 52-stars.length"
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
        { name: 'Xiaogui(Laurel) Zeng', desc: '', nickName: '', img: 'laurel.jpg', year: '2021', serielNumber: '91 BM-016', bib: '14537', time: '3:46:59' },
        { name: 'Wu, Nini', desc: '', nickName: '', img: '91BM-017-NiniWu.jpg', year: '2022', serielNumber: '91 BM-017', bib: '4231', time: '3:03:19' },
        { name: 'Chen, Gaozhi', desc: '', nickName: '', img: '91BM-018-GaozhiChen.jpg', year: '2022', serielNumber: '91 BM-018', bib: '5434', time: '3:03:19' },
        { name: 'Li, Gang', desc: '', nickName: '', img: '91BM-019-GangLi.jpg', year: '2022', serielNumber: '91 BM-019', bib: '5861', time: '3:04:38' },
        { name: 'Yang, Guo Ping', desc: '', nickName: '', img: '91BM-020-GuopingYang.jpg', year: '2022', serielNumber: '91 BM-020', bib: '6131', time: '3:15:38' },
        { name: 'Lai, Derek', desc: '', nickName: '', img: '91BM-021-DerekLai.jpg', year: '2022', serielNumber: '91 BM-021', bib: '12310', time: '3:15:56' },
        { name: 'Luo, Weihua', desc: '', nickName: '', img: '91BM-022-WeihuaLuo.jpg', year: '2022', serielNumber: '91 BM-022', bib: '9573', time: '3:19:42' },
        { name: 'Jiang, Quan', desc: '', nickName: '', img: '91BM-023-QuanJiang.jpg', year: '2022', serielNumber: '91 BM-023', bib: '9207', time: '3:20:46' },
        { name: 'Ng, Oliver', desc: '', nickName: '', img: '91BM-024-OliverNg.jpg', year: '2022', serielNumber: '91 BM-024', bib: '9886', time: '3:21:40' },
        { name: 'Lin, Ju', desc: '', nickName: '', img: '91BM-025-JuLin.jpg', year: '2022', serielNumber: '91 BM-025', bib: '6585', time: '3:23:34' },
        { name: 'Li, Zhi', desc: '', nickName: '', img: '91BM-026-ZhiLi.jpg', year: '2022', serielNumber: '91 BM-026', bib: '4948', time: '3:24:37' },
        { name: 'Fan, Thomas', desc: '', nickName: '', img: '91BM-027-ThomasFan.jpg', year: '2022', serielNumber: '91 BM-027', bib: '6472', time: '3:28:02' },
        { name: 'Wu, Weiguo', desc: '', nickName: '', img: '91BM-028-WeiguoWu.jpg', year: '2022', serielNumber: '91 BM-028', bib: '11558', time: '3:30:40' },
        { name: 'Liu, Meifang', desc: '', nickName: '', img: '91BM-029-MeifangLiu.jpg', year: '2022', serielNumber: '91 BM-029', bib: '12422', time: '3:31:37' },
        { name: 'Chiu, Steven', desc: '', nickName: '', img: '91BM-030-StevenChiu.jpg', year: '2022', serielNumber: '91 BM-030', bib: '10446', time: '3:32:50' },
        { name: 'Yu, Xujia', desc: '', nickName: '', img: '91BM-031-XujiaYu.jpg', year: '2022', serielNumber: '91 BM-031', bib: '11620', time: '3:35:02' },
        { name: 'Cao, Jing', desc: '', nickName: '', img: '91BM-032-JingCao.jpg', year: '2022', serielNumber: '91 BM-032', bib: '13818', time: '3:35:22' },
        { name: 'Zeng, Lipeng', desc: '', nickName: '', img: '91BM-033-LipengZeng.jpg', year: '2022', serielNumber: '91 BM-033', bib: '11872', time: '3:35:24' },
        { name: 'Yu, Fuguo', desc: '', nickName: '', img: '91BM-034-FuguoYu.jpg', year: '2022', serielNumber: '91 BM-034', bib: '13169', time: '3:39:00' },
        { name: 'Zhu, Lidan', desc: '', nickName: '', img: '91BM-035-LidanZhu.jpg', year: '2022', serielNumber: '91 BM-035', bib: '16728', time: '3:43:04' },
        { name: 'Li, Xiaofeng', desc: '', nickName: '', img: '91BM-036-XiaofengLi.jpg', year: '2022', serielNumber: '91 BM-036', bib: '18105', time: '3:43:23' },
        { name: 'Zhou, Min', desc: '', nickName: '', img: '91BM-037-MinZhou.jpg', year: '2022', serielNumber: '91 BM-037', bib: '16352', time: '3:48:32' },
        { name: 'Xin, Fu Nu', desc: '', nickName: '', img: '91BM-038-FunuXin.jpg', year: '2022', serielNumber: '91 BM-038', bib: '20306', time: '3:50:12' },
        { name: 'Sun, Aaron', desc: '', nickName: '', img: '91BM-039-AaronSun.jpg', year: '2022', serielNumber: '91 BM-039', bib: '26609', time: '3:50:43' },
        { name: 'Zhang, Chunfang', desc: '', nickName: '', img: '91BM-040-ChunfangZhang.jpg', year: '2022', serielNumber: '91 BM-040', bib: '21874', time: '3:54:02' },
        { name: 'Lai, Winnie', desc: '', nickName: '', img: '91BM-041-WinieLai.jpg', year: '2022', serielNumber: '91 BM-041', bib: '18189', time: '3:57:26' },
        { name: 'Yin, Yan', desc: '', nickName: '', img: '91BM-042-YanYin.jpg', year: '2022', serielNumber: '91 BM-042', bib: '16816', time: '4:00:26' },
        { name: 'Huang, Yan Jian', desc: '', nickName: '', img: '91BM-043-YanjianHuang.jpg', year: '2022', serielNumber: '91 BM-043', bib: '12897', time: '4:09:44' },
        { name: 'Chen, Ping', desc: '', nickName: '', img: '91BM-044_PingChen.jpg', year: '2022', serielNumber: '91 BM-044', bib: '21748', time: '4:35:02' },
        { name: 'Zhang, Yue', desc: '', nickName: '', img: '91BM-045-YueZhang.jpg', year: '2022', serielNumber: '91 BM-045', bib: '21197', time: '5:02:18' },
        { name: 'Chen, Yong Le', desc: '', nickName: '', img: '91BM-046-YongleChen.jpg', year: '2022', serielNumber: '91 BM-046', bib: '8162', time: '6:27:38' }
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
