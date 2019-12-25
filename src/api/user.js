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

// 注册
export const postZhuce = data => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 用户详情
export const getUser = (id) => {
  return axios({
    url: `/user/${id}`
  })
}

// 编辑用户信息
export const postEdituser = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 关注用户
export const getGuanzhu = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注用户
export const getUnguanzhu = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
