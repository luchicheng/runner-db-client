<template ma-0>
  <v-container class="back" grid-list-md text-md-center fluid fill-height>
    <v-layout row>
      <v-flex>
        <p class="white--text align-end">Hall of Fame - Boston Marathon finisher</p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex v-for="(s, index) in stars"
        :key="six_stars.length+index" md2
      >
        <StarProfile :star="s"/>
      </v-flex>
      <v-flex
        v-for="n in 82-stars.length"
        :key="six_stars.length+n+stars.length" md2
      >
        <StarProfile/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StarProfile from './StarProfile'

export default {
  data () {
    return {
      six_stars: [
      ],
      stars: [
        { name: 'Guoxiang Wang', desc: '', nickName: '', img: 'guoxiangwang.jpg', year: '2015', serielNumber: ' ', bib: '11157', time: '3:28:31' },
        { name: 'Wei Zhang', desc: '', nickName: '', img: 'wei.jpg', year: '2017', serielNumber: ' ', bib: '3059', time: '3:01:02' },
        { name: 'Qifeng Weng', desc: '', nickName: '', img: 'rico_star.jpg', year: '2017', serielNumber: ' ', bib: '6447', time: '3:08:41' },
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
        { name: 'Chen, Yong Le', desc: '', nickName: '', img: '91BM-046-YongleChen.jpg', year: '2022', serielNumber: '91 BM-046', bib: '8162', time: '6:27:38' },
        { name: 'Hung, Clarence', desc: '', nickName: '', img: '91BM-047-ClarenceHung.jpg', year: '2023', serielNumber: '91 BM-047', bib: '495', time: '2:51:02' },
        { name: 'Guo, Benson', desc: '', nickName: '', img: '91BM-048-BensonGuo.jpg', year: '2023', serielNumber: '91 BM-048', bib: '3438', time: '2:51:48' },
        { name: 'Zhao, Allen', desc: '', nickName: '', img: '91BM-049-AllenZhao.jpg', year: '2023', serielNumber: '91 BM-049', bib: '8577', time: '2:57:32' },
        { name: 'Yu, Jim', desc: '', nickName: '', img: '91BM-050-JimYu.jpg', year: '2023', serielNumber: '91 BM-050', bib: '10793', time: '3:09:00' },
        { name: 'Cai, Max', desc: '', nickName: '', img: '91BM-051-MaxCai.jpg', year: '2023', serielNumber: '91 BM-051', bib: '11704', time: '3:12:28' },
        { name: 'Du, Hank', desc: '', nickName: '', img: '91BM-052-HankDu.jpg', year: '2023', serielNumber: '91 BM-052', bib: '14725', time: '3:26:27' },
        { name: 'Zhang, Annie', desc: '', nickName: '', img: '91BM-053-AnnieZhang.jpg', year: '2023', serielNumber: '91 BM-053', bib: '21639', time: '3:46:16' },
        { name: 'Liu, Jiajun', desc: '', nickName: '', img: '91BM-054-JiajunLiu.jpg', year: '2023', serielNumber: '91 BM-054', bib: '22757', time: '3:53:03' },
        { name: 'Chan, Ben', desc: '', nickName: '', img: '91BM-055-BenChan.jpg', year: '2023', serielNumber: '91 BM-055', bib: '11415', time: '4:01:47' },
        { name: 'Zhang, Luce', desc: '', nickName: '', img: '91BM-056-LuceZhang.jpg', year: '2023', serielNumber: '91 BM-056', bib: '23127', time: '4:03:56' },
        { name: 'An, Yuanyuan', desc: '', nickName: '', img: '91BM-057-YuanyuanAn.jpg', year: '2023', serielNumber: '91 BM-057', bib: '23029', time: '4:05:17' },
        { name: 'Yan, Helen', desc: '', nickName: '', img: '91BM-058-HelenYan.jpg', year: '2023', serielNumber: '91 BM-058', bib: '23893', time: '4:19:54' },
        { name: 'Wang, Qiangjiang', desc: '', nickName: '', img: '91BM-059-QiangjiangWang', year: '2024', serielNumber: '91 BM-059', bib: '20073', time: '4:36:03' },
        { name: 'Xiong, Yonggang', desc: '', nickName: '', img: '91BM-060-YonggangXiong.jpg', year: '2024', serielNumber: '91 BM-060', bib: '5497', time: '2:56:53' },
        { name: 'Meng, Max', desc: '', nickName: '', img: '91BM-061-MaxMeng.jpg', year: '2024', serielNumber: '91 BM-061', bib: '11555', time: '3:22:58' },
        { name: 'Tsui, Stephen', desc: '', nickName: '', img: '91BM-062-StephenTsui.jpg', year: '2024', serielNumber: '91 BM-062', bib: '10234', time: '3:31:57' },
        { name: 'Chen, Jinhai', desc: '', nickName: '', img: '91BM-063-JinhaiChen.jpg', year: '2024', serielNumber: '91 BM-063', bib: '17249', time: '3:41:07' },
        { name: 'Wei, Martin', desc: '', nickName: '', img: '91BM-064-MartinWei.jpg', year: '2024', serielNumber: '91 BM-064', bib: '18027', time: '3:47:28' },
        { name: 'Sun, Jing', desc: '', nickName: '', img: '91BM-065-JingSun.jpg', year: '2024', serielNumber: '91 BM-065', bib: '20711', time: '3:55:16' },
        { name: 'Zhang, Mengyuxin', desc: '', nickName: '', img: '91BM-066-Norwin.jpg', year: '2025', serielNumber: '91 BM-066', bib: '4064', time: '2:41:17' },
        { name: 'Zhang, Guanghui', desc: '', nickName: '', img: '91BM-067-Gavin.jpg', year: '2025', serielNumber: '91 BM-067', bib: '7378', time: '3:11:05' },
        { name: 'Liu, Zhu', desc: '', nickName: '', img: '91BM-068-LiuZhu.jpg', year: '2025', serielNumber: '91 BM-068', bib: '17971', time: '3:24:27' },
        { name: 'Zhang, Zhiming', desc: '', nickName: '', img: '91BM-069-JackZhang.jpg', year: '2025', serielNumber: '91 BM-069', bib: '18019', time: '3:41:51' },
        { name: 'Xu, Miao', desc: '', nickName: '', img: '91BM-070-Morgan.jpg', year: '2025', serielNumber: '91 BM-070', bib: '13704', time: '4:07:37' },
        { name: 'Hu, QiongLi', desc: '', nickName: '', img: '91BM-071-Li.jpg', year: '2025', serielNumber: '91 BM-071', bib: '24911', time: '4:11:47' },
        { name: 'Chen, Kai', desc: '', nickName: '', img: '91BM-072-Kitty.jpg', year: '2025', serielNumber: '91 BM-072', bib: '22340', time: '4:23:53' },
        { name: 'Cai, Shaoping', desc: '', nickName: '', img: '91BM-073-GuanGuan.jpg', year: '2025', serielNumber: '91 BM-073', bib: '25262', time: '4:38:59' }
      ]
    }
  },
  async mounted () {
  },
  components: {
    StarProfile
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
