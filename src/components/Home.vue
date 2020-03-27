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
        >91 Running Camp-91集训营于2017年9月1日成立.致力于团结友爱,互帮互助,秉持正确认真的态度 ,通过集体学习马拉松训练方法, 定期组织安排集训等方式, 为提高个人马拉松成绩提供一个健康积极与严肃认真的共享平台 .</v-responsive>

        <v-avatar class="elevation-12 mb-12" size="128">
          <v-img :src="require('@/assets/rico.png')"></v-img>
        </v-avatar>

        <div></div>

        <v-btn color="grey" href outlined large>
          <span class="grey--text text--darken-1 font-weight-bold">我们的公众号</span>
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
        src="https://lh3.googleusercontent.com/AHan9i9TwNxt-C8EfXhepn-pIy9w1QYvwhv_0brOJZSHsh-35Vj7_7eRQ-U1XaXMudw6p8UhPK7DukmmsVIYHcuMAYClvV6MOEO_iAlh7TEkAQS1nsQKRn9yhikSsjfJP0PBKRS0Rw=w1288-h943-no"
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
            <v-img :src="src" class="mb-3" height="275" max-width="100%"></v-img>

            <h3 class="font-weight-black mb-4 text-uppercase" v-text="title"></h3>

            <div class="title font-weight-light mb-5" v-text="text"></div>

            <v-btn class="ml-n4 font-weight-black" text>Continue Reading</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <div class="py-12"></div>
    </section>

    <v-sheet id="contact" color="#333333" dark tag="section" tile>
      <div class="py-12"></div>

      <v-container>
        <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Contact Us</h2>

        <v-responsive class="mx-auto mb-12" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-theme-provider light>
          <v-row>
            <v-col cols="12">
              <v-text-field flat label="Name*" solo></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field flat label="Email*" solo></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field flat label="Subject*" solo></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea flat label="Message*" solo></v-textarea>
            </v-col>

            <v-col class="mx-auto" cols="auto">
              <v-btn color="accent" x-large>Submit</v-btn>
            </v-col>
          </v-row>
        </v-theme-provider>
      </v-container>

      <div class="py-12"></div>
    </v-sheet>
  </v-content>
</template>
<script>
export default {
  data () {
    return {
      articles: [
        {
          src:
            'https://lh3.googleusercontent.com/_dypA1vKpbiUPhhoZYOc3ARzkIr71HuMi3dsSiRUyGjymluE0u5C1_sOA9IjH8ggA3EtG9gh6V639hcUHU-TZVciU831cc8SGrzuXBMFj-jfg1K-kr9XIeuGHUIkqShTsXeUALdWS_mbZReS33cI4e6BZO90ZDvTixoTzs3-KV2GcXhPnC4c6sUycWQSk1_oaEwPGzO8iOhd8HKpk6fc0wY7RgSWQQViv6bx49XmJyiSad0NhI0dBl_YLt6pEJo1z8v8UqLYPfs9vTEw1FqXC1iQUPdZ8Ru8ZrMyhzJxYpEy3IkWKmibjg3Y_RmO_BMJqRCK0TAaN25HmZaCB_wnlUoOB-d9JZI_rxapdP1rK7faKwKQKrzaI0q1xk_xH6N2xuxH8CPkojpyrff0uflntRkapDrj7Hy942q0V8KaBV-wf4e8fQ5_36I2zOhl5Wl4EVf4h0nH9W-BIstCr0IO2DNF7uLJAcF8bZg_ffI5kr_k4zp4VVCX2EsmuSPHJz5TBfbnHjB-2xx6fVuqEUj5MXg232wEMckNpWSk235dPVxNhpyzIKI1Thll3UBeTvpait5_N0Ele-80isvtBP0XN7r5UfIZiGU0r3e19Td_i6D71rhM4q3OwHZ9PPErt49-_MpICII_x9B4LVm9ve4TIIO8w-qsbhVw6l8-6fDRF1tHVeSrpvj91UpKK8eA0L2fEEkYbURngcd9OgtaBGwYfgCxWFfUQCsZz3sKgbxhuGJ5X93pufsKhg=w1442-h954-no',
          title: '科学训练',
          text:
            'Phasellus lorem enim, luctus ut velit eget, convallis egestas eros. Sed ornare ligula eget tortor tempor, quis porta tellus dictum.'
        },
        {
          src:
            'https://lh3.googleusercontent.com/UHLBnexCCQZque-DYSUn_mX_hVi7atP1tYNpJR0Tb9_ID-Qn-3HuqWSsO0RPYOh1wvhWvV4EOIzFwDdZ1ccPbOJETot0-d-n_fqpemgGlzgoQaat8hTfbhVZv3rur01VBFXzKOjnsQ=w1300-h943-no',
          title: '突破自我',
          text:
            'Nam ut leo ipsum. Maecenas pretium aliquam feugiat. Aenean vel tempor est, vitae tincidunt risus. Sed sodales vestibulum nibh.'
        },
        {
          src:
            'https://lh3.googleusercontent.com/hiiQNIUkNfPRczMzX2HOzDUw2FYnBCB4fZJtGxge_pmZAoXQ3MmuRc-PtauBfGJYn-r2ry0PzYkkXnUBW0_QlF2-KdoCJIKgBJFrH1wSKrFqSziYWv9wOF6fGdAtmUulpdCpcX0k5A=w1358-h943-no',
          title: '跑步修行',
          text:
            'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.'
        },
        {
          src:
            'https://images.unsplash.com/photo-1585280665698-83b32722f80c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
          title: '更好生活',
          text:
            'Vestibulum in dictum velit, in rhoncus nibh. Maecenas neque libero, interdum a dignissim in, aliquet vitae lectus. Phasellus lorem enim, luctus ut velit eget.'
        }
      ],
      features: [
        {
          icon: 'mdi-account-group-outline',
          title: '成立时间',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
        },
        {
          icon: 'mdi-update',
          title: '发起者',
          text:
            'Sed ut elementum justo. Suspendisse non justo enim. Vestibulum cursus mauris dui, a luctus ex blandit. Lorem ipsum dolor sit amet consectetur adipisicing elit. qui ipsum eveniet facilis obcaecati corrupti consectetur adipisicing elit.'
        },
        {
          icon: 'mdi-shield-outline',
          title: '发源',
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cupiditate sint possimus quidem atque harum excepturi nemo velit tempora! Enim inventore fuga, qui ipsum eveniet facilis obcaecati corrupti asperiores nam'
        }
      ],
      stats: [
        ['150+', 'Members'],
        ['120+', 'Group Runnings'],
        ['25+', 'Races and Supports'],
        ['30+', 'BQ starts']
      ]
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
