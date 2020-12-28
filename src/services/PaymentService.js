import Api from '@/services/Api'

export default {
  createCheckoutSession (items) {
    const ret = Api().post('payment/checkout', items)
    return ret
  },
  markPaymentSuccess (sessionId) {
    return Api().get('payment/success', {
      params: {
        session_id: sessionId
      }
    })
  },
  index (criteria, paymentFilter) {
    return Api().get('payments', {
      params: {
        search: criteria.search,
        userId: criteria.userId,
        paymentFilter: paymentFilter
      }
    })
  },
  post (payment) {
    // console.log('updating:', payment)
    let payments = []
    payments.push(payment)
    const ret = Api().post('payments', payments)
    return ret
  },
  delete (paymentId) {
    return Api().delete(`payments/${paymentId}`)
  }
}
