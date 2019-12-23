// 图片/文件--接口
import axios from '@/utils/myaxios.js'

export const postFile = data => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
