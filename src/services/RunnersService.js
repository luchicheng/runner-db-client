import Api from '@/services/Api'
// import MyUtils from './myUtils'

export default {
  index (search) {
    // console.log('TWO HOURS', MyUtils.convertSecToHMS(7200))
    return Api().get('runners', {
      params: {
        search: search
      }
    })
  },
  // TODO this service get Age Group, BQ time etc.
  show (runnerId) {
    return Api().get(`runners/${runnerId}`)
  },
  showExtra (runnerId) {
    return Api().get(`runners/extradata/${runnerId}`)
  },
  post (runner) {
    console.log('RunnerService post (runner) begin')
    const ret = Api().post('runners', runner)
    console.log('RunnerService post (runner) end')
    return ret
  },
  // TODO if runner has race, update raceName back to runner table.
  put (runner) {
    return Api().put(`runners/${runner.id}`, runner)
  },
  delete (runnerId) {
    return Api().delete(`runners/${runnerId}`)
  }
}
