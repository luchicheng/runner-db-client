import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://91camp.ca/backapi2' : 'http://localhost:61844',
  })
}
