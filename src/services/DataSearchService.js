import Api from '@/services/Api'
// import MyUtils from './myUtils'

export default {
  searchTrainingRecords (runnerIds, raceIds, recentYear) {
    return Api().get(`data/trainingrecords`, {
      params: {
        runnerIds: runnerIds,
        raceIds: raceIds,
        recentYear: recentYear
      }
    })
  },
  searchRaceRecords (runnerIds, raceIds, recentYear) {
    return Api().get(`data/racerecords`, {
      params: {
        runnerIds: runnerIds,
        raceIds: raceIds,
        recentYear: recentYear
      }
    })
  },
  searchTopRaceRecords (gender, number, year) {
    return Api().get(`data/topracerecords`, {
      params: {
        year: year,
        number: number,
        gender: gender
      }
    })
  }
}
