// 新闻--接口
import axios from '@/utils/myaxios.js'

// 新闻列表
export const getxinwenList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 新闻详情
export const getXinwen = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 评论列表
export const getPinglun = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}
