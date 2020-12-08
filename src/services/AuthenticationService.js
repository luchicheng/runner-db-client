import Api from '@/services/Api'

export default {
  register (registerInfo) {
    return Api().post('register', registerInfo)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  passwordReset (credentials) {
    return Api().post('passwordReset', credentials)
  }
}
