import Api from '@/services/Api'
// import MyUtils from './myUtils'

export default {
  index (search, runnerFilter) {
    // console.log('search value in Runner Service:', search)
    // console.log('runnerFilter value in Runner Service:', runnerFilter)
    return Api().get('runners', {
      params: {
        search: search,
        runnerFilter: runnerFilter
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
    const ret = Api().post('runners', runner)
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
