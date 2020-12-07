import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('users', {
      params: {
        search: search
      }
    })
  },
  show (userId) {
    return Api().get(`users/${userId}`)
  },
  post (user) {
    console.log(user)
    const ret = Api().post('users', user)
    return ret
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  },
  delete (userId) {
    return Api().delete(`users/${userId}`)
  }
}
