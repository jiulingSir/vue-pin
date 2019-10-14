import axios from 'axios'
// import {Toast} from 'cube-ui'
import { Indicator } from 'mint-ui'


axios.create({
  timeout: 5000
})

axios.interceptors.request.use(
  config => {
    Indicator.open('加载中,请稍后')
    return config
  },
  error => {
    Indicator.close();
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    Indicator.close();
    return Promise.reject(error)
  }
)

// function showToastType(text) {
//   return Toast.$create({
//     time: 0,
//     txt: text
//   })
// }
