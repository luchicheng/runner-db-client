import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://91camp.ca/backapi2' : 'http://localhost:61844/backapi2'
  })
}
