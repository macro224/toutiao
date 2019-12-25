// 新闻--接口
import axios from '@/utils/myaxios.js'

// 新闻列表
export const getxinwenList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
