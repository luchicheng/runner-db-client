import Api from '@/services/Api'
// import MyUtils from './myUtils'

export default {
  searchRaceRecords (runnerId, search) {
    return Api().get(`runners/${runnerId}/racerecords`, {
      params: {
        search: search
      }
    })
  },
  show (racerecordId) {
    console.log('call tran record service show function')
    return Api().get(`racerecords/${racerecordId}`)
  },
  post (runnerId, raceId, racerecord) {
    racerecord.RunnerId = runnerId
    racerecord.RaceId = raceId
    console.log('RaceRecordService post (racerecord) begin')
    const ret = Api().post('racerecords', racerecord)
    console.log('RaceRecordService post (racerecord) end')
    return ret
  },
  put (racerecord) {
    return Api().put(`racerecords/${racerecord.id}`, racerecord)
  },
  delete (racerecordId) {
    return Api().delete(`racerecords/${racerecordId}`)
  }
}
