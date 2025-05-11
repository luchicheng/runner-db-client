<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(c, index) in coaches"
        :key="index"
        cols="12" sm="6"
      >
        <CoachProfile :coach="c"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CoachProfile from './CoachProfile'

export default {
  data () {
    return {
      coaches: [
        { name: 'Luchi Cheng',
          desc: [`I have had various of sports hobbies for more than 20 years, 5 years ago I started training for running.`,
            `I have experienced few 18/12-weeks of tranining cycles by Pfitzinger's Advanced Marathoning theroy, and laterly joined with Hanson's Marathon Method and Jack Daniels formular's ingredients from my coach.`,
            `I have been coaching runners in our group for more than 2 years, with now over more than 100 members.`,
            `Training for running is not only a process of physiology improvments, also a journey full of psychological and philosophical empowerment. `],
          nickName: 'Luchi',
          src: 'luchi.jpg',
          bio: ['Trained for Marathon 5+ years, finished 10+ marathon as of 2020',
            '2019 Marathon PR of 2:48:21 (New York City Marathon)',
            '2020 certified VDOT coach'] },
        { name: 'QiFeng Weng (Rico)',
          desc: [`I am a semi-professional avid runner and coach. I have started training for marathon since July, 2014 and completed 15 full marathons so far including the Abbott World Marathon Majors.`,
            `As the founder of  91 Running Camp in Toronto , I started coaching for marathon runners in 2017 and helped over 30 runners qualify Boston Marathon. I bring over my coaching experience working with adult runners of all levels including current coaches in 91 Camp.`,
            `Training smarter is the key if you have to work full time and I will work with you to get the maximum benefits for your time. Running is not only a way of enjoying the freedom and being with yourself in the nature, but also a beautiful journey of sharing and building friendship with others and in every case I strive to help make that journey as enriching as the final destination.`],
          nickName: 'Rico',
          src: 'rico.jpg',
          bio: ['First Marathon: Toronto Marathon (3:48) in May, 2015',
            'Abbot World Marathon Majors 6 Star Finisher 2018',
            'Full Marathon PR:  2:41:04',
            '2020 VDOT Certified Coach'] },
        { name: 'NiNi Wu (Cindy)',
          desc: [`I enjoy exercising and working out at the gym. I also like ballroom dancing, zumba, and yoga. Started running in the year 2017. In June 2018, I joined 91 Camp and officially started training, quickly improving my running skills and used merely 3 training cycles to run a sub 3 hour marathon. I am willing to share and explore training experiences with all and especially female runners. I will continue to work hard and improve! `],
          nickName: 'Cindy',
          src: 'cindy.jpg',
          bio: ['First half marathon 1:36:59 in May 2018',
            'First full marathon 3:11:42 in October 2018',
            'Full marathon PR 2:56:08',
            'Finished the Virtual London Marathon on October 4, 2020 with a time of 3:05:25 and was placed First out of all Canadian women.',
            '10K PR 34:46',
            '2020 VDOT Certified Coach'] },
        { name: 'Quan Jiang',
          desc: [`The former fat man with a BMI of 33.8 is now a marathon runner qualified the Boston, New York and Chicago three marathons in the world's six major marathons. From the 404 for the first marathon in 2017 to the 308 in 2020, not only have the PRs improved, but the BMI has also been reduced to 23.1. This is all thanks to scientific training, from the ASICS plan to the FIRST plan, from the AM plan to the Jack Daniels running theory, especially Jack Daniels 18weeks-2Q plan I tried in 2020 summer. Each theory will help us to improve our running ability in the different running stages, and I firmly believe that scientific training will not only be healthier, but also the running level will be improved of course. I am very happy to share my personal experience with you. I once had the experience of guiding someone who qualified 3 Major Marathons in the first marathon.
Nothing is impossible！Trust me！You can do it!`],
          nickName: 'Quan',
          src: 'quan.jpg',
          bio: ['Trained for Marathon 4+ years and finished 9 marathons',
            'Official PR is 3:08:10(2020 That Dam Hill Marathon)',
            '2020 VDOT Certified Coach'] },
        { name: 'Jun Zhang',
          desc: [`I am a geography professor at UofT, so my running friends usually just call me ‘professor’.  I have been a lover of distance running since childhood, and once won a few high-school race titles. But later gave up running and was a basketball fan for 20 some years, until stopped by some serious knee pains. Started running seriously in 2016 at the age of 44 and my knee problem magically mitigated and then disappeared. Thus I have come to enjoy distance running again ever since and trained consistently for over four years. Had my first offical marathon record of 3:13:30 at Toronto Goodlife Marathon on May 7, 2017. I ran the 2019 Boston Marathon (April 15) for 2:59:30, and 2019 New York Marathon (November 3) for 2:50:41. I joined Peking University 100871 Running Club in 2017 and Toronto 91 Running Camp in 2018. I am a believer of scientific training and individually-tailored training plans. Have tried multiple plans myself and learned a great deal. I really love reading various training books, learning from the training experience of my own and other fellow runners, and sharing training tips with friends. Have been doing some coaching activities at 91 Running Camp in the past two years and had the pleasure of seeing many runners that I advised growing faster and stronger. In December 2020 I became a VDOT certified coach. As a busy academic I always struggle to find time for my runs and related activities, but I am looking forward to running and helping others run for as many years as possible.`],
          nickName: 'Jun',
          src: 'jun.jpg',
          bio: ['2019 New York Marathon PR 2:50:41',
            '2020 VDOT Certified Coach'] },
        { name: 'Tina Wang',
          desc: [`A Marathon and Ultra Marathon Runner. `, `Practiced Advanced Marathoning and Jack Daniel’s training plan for Marathon Races. Self guided and trained on the Ultra Marathon races.`, `I am a believer in scientific training. Personalized training plans and training diversities can benefit performance improvement consistently.`, `I've learned from books, my own and running buddies’ experience. I love sharing what I have learned and willing to help others be healthy, fitness and exploring the fun of running.`, `I believe training can be enjoyable and rewarding, however the hard and frustrating ingredients are part of the journey as well. It is always good that someone is with you when those hard times come. It will enrich our life experience and help us develop traits, and reward friendship over time.`, `Everyone can run – start from small and aim big – Boston Marathon is reachable by everyone.  Enjoy nature by running  – join us in trail running – UTMB final can be a dream for us.`],
          nickName: 'Tina',
          src: 'tina_wang.jpg',
          bio: ['Trained for Marathon 8 years and Ultra Marathon 2 years',
            'Official PR in Marathon is 3:29:34 (Muskoka Marathon 2020)',
            '100km Ultra finisher (Canyon Endurance Race 2023)',
            '2023 VDOT Certified Coach'] }
      ]
    }
  },
  async mounted () {
  },
  components: {
    CoachProfile
  }
}
</script>

<style scoped>
</style>
