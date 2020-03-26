// const _ = require('lodash')

export default {
  // The install method will be called with the Vue constructor as the first argument, along with possible options
  // install (Vue, options) {
  //   // convert sec number into a string, such as HH:MM:SS
  //   // Add $plugin instance method directly to Vue components
  //   Vue.prototype.$convertSecToHMS = (sec) => {
  //     if (!sec || sec === 0) {
  //       return ''
  //     }
  //     let measuredTime = new Date(null)
  //     measuredTime.setSeconds(sec) // specify value of SECONDS
  //     let MHSTime = measuredTime.toISOString().substr(11, 8)
  //     return MHSTime
  //   }
  //   // ignore sec number in result, only HH:MM
  //   Vue.prototype.$convertSecToHM = (sec) => {
  //     if (!sec || sec === 0) {
  //       return ''
  //     }
  //     let measuredTime = new Date(null)
  //     measuredTime.setSeconds(sec) // specify value of SECONDS
  //     let MHTime = measuredTime.toISOString().substr(11, 8)
  //     return MHTime
  //   }
  // },

  // convert sec number into a string, such as HH:MM:SS
  convertSecToHMS (sec) {
    if (!sec || sec === 0) {
      return ''
    }
    let measuredTime = new Date(null)
    measuredTime.setSeconds(sec) // specify value of SECONDS
    let MHSTime = measuredTime.toISOString().substr(11, 8)
    return MHSTime
  },

  // convert a string, into second number:
  //  HH:MM:SS  MM:SS
  convertHMSTOSec (str) {
    const regex = /^[0]?([0-9]:)?[0-5][0-9]:[0-5][0-9]$/g

    if (!str.match(regex)) {
      console.log('invalid format of race time:', str)
      return 0
    }
    let sec = 0
    str.split(':').forEach(function (item, index) {
      console.log(item, index)
      sec = sec * 60 + parseInt(item)
    })
    return sec
  },
  getAgeGroup (age) {

  }

}
