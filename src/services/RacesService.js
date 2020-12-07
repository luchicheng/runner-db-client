import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('races', {
      params: {
        search: search
      }
    })
  },
  show (raceId) {
    return Api().get(`races/${raceId}`)
  },
  post (race) {
    const ret = Api().post('races', race)
    return ret
  },
  put (race) {
    return Api().put(`races/${race.id}`, race)
  },
  delete (raceId) {
    return Api().delete(`races/${raceId}`)
  },
  getAvailableRaces () {
    return Api().get('validRaces')
  },
  getAvailableRacesObj () {
    return Api().get('racesObj')
  }
}
