import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://91camp.ca/backapi' : 'http://localhost:8081/backapi',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
