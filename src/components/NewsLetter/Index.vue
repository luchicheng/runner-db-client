<template>
  <v-layout row wrap align-center>
          <v-flex sm="8" cols="12">
            <div v-for="article in articles" :key="article.title">
              <v-card class="my-3" hover data-aos="zoom-in" data-aos-easing="ease">
                <v-img
                  height="350px"
                  v-bind:src="article.urlToImage"
                ></v-img>
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span class="headline">{{ article.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                <v-card-text>
                  {{ article.description }}
                </v-card-text>
                <v-card-actions>
                  <v-chip small color="secondary" class="white--text">
                    {{article.sourceName}}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>

                  <v-btn small replace color="info" v-bind:href="article.url" target="_blank" >Read More</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
</template>
<script>
// import {mapState} from 'vuex'

export default {
  components: {
  },
  // computed: {
  //   ...mapState([
  //     'isUserLoggedIn'
  //   ])
  // },
  data () {
    return {
      articles: [
        {
          title: '无需纠结，没有遗憾---雨儿2022波士顿马拉松赛记',
          urlToImage: 'https://mmbiz.qpic.cn/mmbiz_jpg/m8icr2GSLUmavEvjO1LSSoGMur6UsCOwwkboz0rIHiahXl0CPaMWtJibVczH0ry7pptT5A9TT6JSXoeuh7W2qXTzA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1',
          description: '18年10月湖滨首马311封神，19年5月多马冲三折戟，半年后芝马恣意破三。起起伏伏，蛰伏两年多，不能在最好的状态面对，但总是在最好的时间相遇独角兽。这一次智慧美丽，幽默不羁的雨神演绎了一场阴差阳错，妙趣横生的首次波马。',
          sourceName: '91编辑部',
          url: 'https://mp.weixin.qq.com/s/YBrnf2CkWMj0W-J6PvJKvQ'
        },
        {
          title: '91集训营2020云马集_伦马篇',
          urlToImage: 'https://deafeducation.org.uk/wp-content/uploads/2020/09/Virtual-London-Marathon.jpg',
          description: '2020这个特殊的年份，马拉松赛道的画面陈旧，色调灰暗，一个又一个重要比赛相继取消，这一切在年初之时就已定下了基调。但跑者对于比赛的渴求和热忱不会随之消减。相反的，越是没得跑，越是想要跑。这种需求随着休赛期的无限延长而愈发强烈。于是，线上马拉松成为跑者那无处安放的比赛热情的宣泄口。世界各大赛以这种特殊的形式得以继续，弥补了现实马拉松的遗憾。',
          sourceName: '91编辑部',
          url: 'https://mp.weixin.qq.com/s/UuK1jwmZWV3ObD6UNizBqQ'
        },
        {
          title: '2020云跑波士顿',
          urlToImage: 'https://pbs.twimg.com/media/EgiMyMkXYAEiSaf?format=jpg&name=4096x4096',
          description: '2020是不平凡的一年，COVID19疫情肆虐，从年初开始的各项马拉松比赛相继取消，原本四月份进行的波士顿马拉松也延期到九月份并且改为线上进行。91CAMP的第二届波马团及嘉宾共24名跑者，于2020/09/13，用脚步去丈量这个特殊时期里最特色的42公里；希望以跑者精神，为大众祈福，早日驱散疫情，迎来阳光。',
          sourceName: '91编辑部',
          url: 'https://mp.weixin.qq.com/s/LEJVYwRPBieg3Py8soI1hg'
        },
        {
          title: '又一年 新一届 -- 91Camp 庆生，2020 委员会换届',
          urlToImage: 'https://images.unsplash.com/photo-1604868222953-9dbe5fcf4a41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
          description: '因同样的热爱而相聚，因分享和参与而一起成长，因严谨和自律而共同进步。91Camp在 2020特殊的一年里幸运的组织了小型庆生会，在欢声笑语，团队趣味竞技中迎来了第三个生日； 而作为一个刚刚走过两年历史的 NPO 组织， 新一届的 91 委员会也诞生了，并投票选举出新任主席！',
          sourceName: '91编辑部',
          url: 'https://mp.weixin.qq.com/s/0pgUZU5AXSR_JClERYlkzQ'
        },
        {
          title: '风雪中的炽热, 沉淀后的飞跃',
          urlToImage: 'https://images.unsplash.com/photo-1585673191607-41c4c09863a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          description: '编者按：Bill Huang ，多伦多91集训营的一个“草根”跑者 ，2020 年3月1日在美国佛吉尼亚州Newport News马拉松实现Sub250的突破 ！纵观他四年的跑马史，2016 年湖滨马拉松(首马)的406，2017 年湖滨马拉松的336，2018 年巴黎马拉松的320（同年加入91集训营），2019 年伦敦马拉松的258，实现“破3”的里程碑，到今年因东京马取消而在Newport News One City Marathon 的246，通过后天刻苦努力，科学系统训练和时间跑量堆积，逐步成长，最终飞跃；更可贵的是其难得的赤诚之心，严谨的日常总结，勇敢的自我尝试和坚定的跑步初心。对跑步始于兴趣，陷于热爱，忠于勤奋的他，赛记中的感恩，思考和坚持想必才是令这个“地才”不断刷新他自己的跑步极限的秘密。',
          sourceName: 'Bill Huang & 91编辑部',
          url: 'https://mp.weixin.qq.com/s/zES15DDp08AFemDS3t0yTQ'
        },
        {
          title: '三月辣椒红-Chilly Half 2020',
          urlToImage: 'https://pbs.twimg.com/media/EO_m4sKXkAAAHaY?format=jpg&name=medium',
          description: '2020年庚子鼠年，开年并不顺利。尤以 COVID-19 的肆虐让人心焦。两个月里，各方力量尽力的控制疫情的发展和救助病者；虽然状况有所缓解，但仍旧危机四伏。\n\n\t在加拿大的冬天，91Camp 的很多跑友都用不同的方式参与贡献，并且也默默的坚持着冬训。罗曼.罗兰曾经说过：世界上只有一种真正的英雄主义，就是认清了生活的真相后还依然热爱它。即使是普通人，我们内心都有某种程度的英雄气概，因为我们坚持，热爱生活。',
          sourceName: 'Tina & 91编辑部',
          url: 'https://mp.weixin.qq.com/s/Pg5AylHZ0NdKrus1meebMw'
        },
        {
          title: '搞定纽约—2019纽马赛记篇',
          urlToImage: 'https://www.heatsheets.com/wp-content/uploads/2016/11/new-york-marathon.png',
          description: '关于纽约，有句名言："If you can make it here, you can make it anywhere"。我把它翻译成：“搞定纽约，就能搞定全世界”。这个当然不仅针对纽约马拉松。因为纽约作为首屈一指的全球城市，其“霸气”几乎无与比肩。但这句话尤其经常被跑马者引用。因为虽然纽马历史不算太长（明年50周年），但在全球六大马拉松大满贯赛事当中，纽马是参赛者和围观者人数最多的，今年有53636多名参赛者，据说是全世界有史以来参赛人数最多的马拉松，而且围观者每年也都在200万以上。以“五大桥，五大区”（Five Bridges, Five Boroughs）著称的纽马赛道，也几乎是大满贯赛事中最虐的，大家普遍认为至少跟波马一样难跑。相比之下，其它四个（芝加哥、伦敦、柏林、东京）就容易多了。',
          sourceName: '张军 & 91编辑部',
          url: 'https://mp.weixin.qq.com/s/6toLkcNDv0CGcs6V549Hog'
        },
        {
          title: '程路驰 Sub250之旅-2019（下）',
          urlToImage: 'https://images.unsplash.com/photo-1585672683850-17c087d88ef8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          description: '在集训营里，路驰同学的绰号最多：路队（带队教练），二师兄（第二位跟从总教练 Rico开始训练的同学），一休哥（为比赛"减负荷"剃了光头），同学们对他的喜爱都在这些绰号里了。再加上美丽坚韧的 LD（封面图，有一种感激是默默的），和三个聪明可爱的娃娃。他们一家人都为集训营所熟悉，今年夫妻双双跑了紐马，并且互相支持了对方的芝马和波马，马拉松无疑已经成为他们家庭生活的一部分。我们祝愿路队继续有知无畏，历练人生！',
          sourceName: 'Luchi & 91编辑部',
          url: 'https://mp.weixin.qq.com/s/cFZLQoPZc04LrGpYjGD-QQ'
        }
      ]
    }
  },
  async mounted () {
  }
}
</script>

<style scoped>
</style>
