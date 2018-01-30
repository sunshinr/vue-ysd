import axios from 'axios'
import qs from 'qs'

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log('网络错误，服务器错误，后端抛出的错误')
  }
  if (res.data && (res.data.stateCode !== '001')) {
    console.log(res.data.message)
  }
  return res
}

export default {
  post (url, data) {
    url = 'http://yhv02.jkywol.com/' + url
    //url = 'http://192.168.1.92:8085/healthFront/' + url
    // url = 'http://192.168.1.88:8080/healthFront/' + url
    //url = 'http://192.168.1.222:8080/healthFront/' + url
    //url = 'http://192.168.1.49:8080/healthFront/' + url /* xxb */
     //url = 'http://192.168.1.19:8080/healthFront/' + url /* zzq */
    // url = 'http://192.168.1.110:8080/healthFront/' + url /*yfr*/
    //url = 'http://192.168.1.69:8084/healthFront/' + url
    console.log(data)
    console.log(url)
    return axios({
      method: 'post',
      baseURL: '',
      url,
      data: qs.stringify(data),
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    url = 'http://192.168.1.92:8085/' + url
    return axios({
      method: 'get',
      baseURL: 'https://cnodejs.org/api/v1',
      url,
      params, // get 请求时带的参数
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
