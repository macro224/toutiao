// 用户--接口
import axios from '@/utils/myaxios.js'

// 登录
export const postDenglu = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 用户详情
export const getUser = (id) => {
  return axios({
    url: `/user/${id}`
  })
}
