<template>
  <v-content>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          src="https://images.unsplash.com/photo-1585280665698-83b32722f80c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row align="center" class="white--text mx-auto" justify="center">
              </v-row>
              <v-row align="center" class="white--text mx-auto" justify="center">
              </v-row>
              <v-row align="center" class="white--text mx-auto" justify="center">
              </v-row>

              <v-row align="center" class="white--text mx-auto" justify="center">
                <v-col class="white--text text-center" cols="12" tag="h1">
                    <span
                      class="font-weight-light"
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    >WELCOME TO</span>
                    <br />

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >91 RUNNING CAMP</span>
                  </v-col>
                  <v-col>
                    <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#about-me')">
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                  </v-col>
                  </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">ABOUT US</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >91 Running Camp-91集训营于2017年9月1日成立。
        </v-responsive>
        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
        致力于推广以及提高马拉松以及户外运动水平，团结友爱，互帮互助，秉持科学严谨的态度，通过集体学习马拉松训练方法， 定期组织安排集训等方式， 为提高个人马拉松成绩提供一个健康积极与严肃认真的共享平台。
        </v-responsive>
        <div align="center">
          <v-img :src="require('@/assets/91logo_lightblue.png')" width="128"></v-img>
        </div>

        <div></div>

        <v-btn color="grey" href outlined large>
          <span class="grey--text text--darken-1 font-weight-bold"
            @click="$vuetify.goTo('#contact-us')"
            >公众号</span>
        </v-btn>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="features" class="grey lighten-3">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">OUR STORY</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col v-for="({ icon, title, text }, i) in features" :key="i" cols="12" md="4">
            <v-card class="py-12 px-4" color="grey lighten-5" flat>
              <v-theme-provider dark>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon large v-text="icon"></v-icon>
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title class="justify-center font-weight-black text-uppercase" v-text="title"></v-card-title>

              <v-card-text class="subtitle-1" v-text="text"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="stats">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        src="https://images.unsplash.com/photo-1585537647937-6797d374276a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=50"
      >
        <v-container fill-height>
          <v-row class="mx-auto">
            <v-col v-for="[value, title] of stats" :key="title" cols="12" md="3">
              <div class="text-center">
                <div class="display-3 font-weight-black mb-4 color-blue" v-text="value"></div>

                <div class="title font-weight-regular text-uppercase" v-text="title"></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>

    <section id="blog">
      <div class="py-12"></div>

      <v-container>
        <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">梦想，91实现</h2>
        <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Run for the Dream</h2>
        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-row>
          <v-col v-for="({ src, text, title }, i) in articles" :key="i" cols="12" md="3">
            <v-img :src="getImgUrl(src)" class="mb-3" height="275" max-width="100%"></v-img>
            <h3 class="font-weight-black mb-4 text-uppercase" v-text="title"></h3>

            <div class="title font-weight-light mb-5" v-text="text"></div>

            <v-btn class="ml-n4 font-weight-black" text>Continue Reading</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <section id="contact-us">
      <v-container class="text-center">
        <h2 class="display-1 mb-3 text-uppercase text-center">Contact Us</h2>
        <div align="center">
          <v-img :src="require('@/assets/wechat2.png')" width="200"></v-img>
        </div>
      </v-container>
    </section>
  </v-content>
</template>
<script>
export default {
  data () {
    return {
      articles: [
        {
          src:
            'sm_training.jpg',
          title: '科学训练',
          text:
            '集训营发扬公益奉献精神，拥有一批跑而优则教的优秀马拉松训练实践者，以每年两期培训的方式，以Advanced Marathoning为基础，融汇亚索800, 汉森等方法。它帮助从初学者到 Sub3 的老兵们提供科学而有针对性训练计划，有组织的的训练及训练指导，帮助跑者实现梦想。'
        },
        {
          src:
            'sm_challenge.jpg',
          title: '突破自我',
          text:
            '集训营见证了一群热爱跑步并勇于尝试的跑者。他们在两到三年的时间里不断突破自我，实现马拉松大满贯的梦想。他们的故事都能成为你我的故事。集训营帮助每个在马拉松旅途上的走的更远。'
        },
        {
          src:
            'sm_running.jpg',
          title: '跑步修行',
          text:
            '跑步除了增强体魄，也让在坚持和动摇间成长，让我们更了解自己。跑步无关快慢，假以时日，它让我们遇见更好的自己。'
        },
        {
          src:
            'sm_living.jpg',
          title: '快乐生活',
          text:
            '集训营不仅是一个跑马训练的社区，也是一群拥有同样爱好的跑者的交流平台。跑者们相互鼓励和帮助，积极参与公益活动，感染并鼓舞着身边的朋友和亲人 -- 积极并快乐的生活。'
        }
      ],
      features: [
        {
          icon: 'mdi-account-group-outline',
          title: '里程碑',
          text:
            '91 running camp, "91集训营"成立于2017年9月1日，并与18年10月正式注册成为非盈利组织、 会员服务，组织管理走入正规化。截止2019年底，正式会员超过150人。'
        },
        {
          icon: 'mdi-update',
          title: '发起和发源',
          text:
            '创始人全马六星跑者 - Rico Weng; 荣誉会长“百马女神” - 陈静。' +
            '2017年的6月，Rico迎来了这样的一个契机。 在一次小聚中，静姐（陈静）提议为什么不组织一个群分享你的跑步经验用你的能力去帮助更多的跑者? 7月份也是在美丽径公园， Rico和其他25人独创 26 miles接力跑给陈静姐姐送行。之后剩下了很多物质，当时还在筹划的Rico总教头便继续周末在美丽径公园设置水站提供大家这些物质。91集训营 便有了最初的雏形。'
        },
        {
          icon: 'mdi-shield-outline',
          title: '愿景',
          text:
            '91的梦想，是送100个跑者去波士顿。截至2020年底，已经有33位实现BQ的梦想并完成了波士顿马拉松体验（包括2020云波马）。BQ星墙上的100颗闪亮之星，希望有你一颗。'
        }
      ],
      stats: [
        ['150+', 'Members'],
        ['120+', 'Group Runnings'],
        ['25+', 'Races and Supports'],
        ['30+', 'BQ stars']
      ]
    }
  },
  methods: {
    getImgUrl (pic) {
      return require('../assets/' + pic)
    }
  }
}
</script>

<style>
/* .v-parallax__content {
    color: blue;
    -webkit-text-stroke: 1px white;
    -webkit-text-fill-color: yellow;
} */
/* .v-application {
    font-family: Georgia, "Times New Roman", "KaiTi", "楷体", STKaiti, "华文楷体", serif;
    line-height: 1.5;
} */

</style>
