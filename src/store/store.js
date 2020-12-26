import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    forSaleService: [
      { invId: 1, name: 'Merchandise Payment', image: 'merchandise.jpg', description: '商品费用支付，如果不足请在购物车内更改数量。', category: 'Merch Goods', price: 10 },
      { invId: 2, name: 'Training Fee', image: 'fee.jpg', description: '训练费用支付，如果不足请在购物车内更改数量。', category: 'Service', price: 20 },
      { invId: 3, name: 'Membership Fee', image: 'fee.jpg', description: '会员费用支付，如果不足请在购物车内更改数量。', category: 'Service', price: 20 },
      { invId: 4, name: 'Donation', image: 'donation.jpg', description: '赞助费用支付，如果不足请在购物车内更改数量。', category: 'Donation', price: 100 },
      { invId: 5, name: 'Event Registration Fee', image: 'fee.jpg', description: '特殊会务费用支付，如果不足请在购物车内更改数量。', category: 'Service', price: 10 }
    ],
    // inCart: [{invId:1,qty:2},{invId:2,qty:1},{invId:4,qty:2}]
    inCart: []
  },
  getters: {
    forSaleService: state => state.forSaleService,
    inCart: state => state.inCart,
    inCartTotal: state => {
      // console.log('doing total:', state.inCart)
      return state.inCart.reduce(function (acc, obj) {
        // console.log('working on', obj.price, obj.qty)
        return acc + (obj.price * obj.qty)
      }, 0)
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    ADD_TO_CART (state, invId) {
      let find = state.inCart.find(o => o.invId === invId)
      if (find) {
        var index = state.inCart.indexOf(find)
        let newObj = Object.assign({}, find)
        newObj.qty = Number(find.qty) + 1
        state.inCart[index] = newObj
        state.inCart.push({})
        state.inCart.pop()
      } else {
        let find = state.forSaleService.find(o => o.invId === invId)
        let newObj = Object.assign({}, find)
        newObj.qty = 1
        state.inCart.push(newObj)
      }
      // state.inCart.push(invId)
      // console.log('end of ADD_TO_CART:', state.inCart)
    },
    UPDATE_TO_CART (state, newQty) {
      let find = state.inCart.find(o => o.invId === newQty.invId)
      if (find) {
        // var index = state.inCart.indexOf(find)
        // let newObj = Object.assign({}, find)
        // newObj.qty = find.qty + 1
        // state.inCart[index] = newObj
        find.qty = newQty.qty
        state.inCart.push({})
        state.inCart.pop()
      }
      // state.inCart.push(invId)
      console.log('end of UPDATE_TO_CART:', state.inCart)
    },
    REMOVE_FROM_CART (state, index) { state.inCart.splice(index, 1) }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    addToCart (context, invId) { context.commit('ADD_TO_CART', invId) },
    updateToCart (context, newQty) { context.commit('UPDATE_TO_CART', newQty) },
    removeFromCart (context, index) { context.commit('REMOVE_FROM_CART', index) }
  }
})
