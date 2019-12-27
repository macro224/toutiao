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

// 发布评论
export const postPinglun = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 收藏新闻
export const getShoucang = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 点赞新闻
export const getDianzan = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
