// 栏目--接口
import axios from '@/utils/myaxios.js'

// 栏目列表
export const getcateList = () => {
  return axios({
    url: '/category'
  })
}
