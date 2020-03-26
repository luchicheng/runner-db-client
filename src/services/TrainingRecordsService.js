import Api from '@/services/Api'
// import MyUtils from './myUtils'

export default {
  searchTrainingRecords (runnerId, search) {
    return Api().get(`runners/${runnerId}/trainingrecords`, {
      params: {
        search: search
      }
    })
  },
  show (trainingrecordId) {
    console.log('calling traning record service show function')
    return Api().get(`trainingrecords/${trainingrecordId}`)
  },
  post (runnerId, trainingrecord) {
    trainingrecord.RunnerId = runnerId
    console.log('TrainingRecordService post (trainingrecord) begin')
    const ret = Api().post('trainingrecords', trainingrecord)
    console.log('TrainingRecordService post (trainingrecord) end')
    return ret
  },
  put (trainingrecord) {
    return Api().put(`trainingrecords/${trainingrecord.id}`, trainingrecord)
  },
  delete (trainingrecordId) {
    return Api().delete(`trainingrecords/${trainingrecordId}`)
  }
}
