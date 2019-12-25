
// 格式化日期的过滤器
export const dataFormat = (data, spe) => {
  data = new Date(data)
  spe = spe || '/'
  let yue = data.getMonth()
  let ri = data.getDate()
  let shi = data.getHours()
  let fen = data.getSeconds()
  let miao = data.getMinutes()
  if (yue < 10) yue = '0' + yue
  if (ri < 10) ri = '0' + ri
  if (shi < 10) shi = '0' + shi
  if (fen < 10) fen = '0' + fen
  if (miao < 10) miao = '0' + miao

  return data.getFullYear() + spe + (yue + 1) + spe + ri + ' ' + ' ' + shi + ':' + fen + ':' + miao
}
