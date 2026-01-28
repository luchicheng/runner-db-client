import Api from '@/services/Api'

export default {
  index (search, statusFilter) {
    const params = {}
    if (search) {
      params.search = search
    }
    if (statusFilter) {
      params.statusFilter = statusFilter
    }
    return Api().get('emailrequests', {
      params: params
    })
  },
  show (emailrequestId) {
    return Api().get(`emailrequests/${emailrequestId}`)
  },
  post (emailrequest) {
    const ret = Api().post('emailrequests', emailrequest)
    return ret
  },
  startEmailJob (emailrequest) {
    const ret = Api().post('emailJob/start')
    return ret
  },
  stopEmailJob (emailrequest) {
    const ret = Api().post('emailJob/stop')
    return ret
  },
  fetchEmailRequests (emailrequest) {
    const ret = Api().post('email/fetch')
    return ret
  },
  put (emailrequest) {
    return Api().put(`emailrequests/${emailrequest.id}`, emailrequest)
  },
  delete (emailrequestId) {
    return Api().delete(`emailrequests/${emailrequestId}`)
  }
}
