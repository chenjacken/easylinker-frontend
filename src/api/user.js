import { axios } from '@/utils/request'

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
export function queryUserConfig () {
  return axios({
    url: 'easyboot/user/getConfig',
    method: 'get'
  })
}
