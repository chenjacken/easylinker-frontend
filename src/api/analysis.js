import { axios } from '@/utils/request'

/**
 * 查询首页数据
 */
export function queryAnalyzeData () {
  return axios({
    url: 'easyboot/analyze/data',
    method: 'get'
  })
}

/**
 * 查询当前用户信息
 */
export function queryUserDetail () {
  return axios({
    url: 'easyboot/user/detail',
    method: 'get'
  })
}

/**
 * 查看用户日志
 */
export function querySyslogListByUser (parameter) {
  return axios({
    url: 'easyboot/syslog/listByUser',
    method: 'get',
    params: parameter
  })
}
