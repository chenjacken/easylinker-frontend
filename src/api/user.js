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

/**
 * 查询当前tabs配置
 */
export function queryGetTabsConfig () {
  return axios({
    url: 'easyboot/systemConfig/tabsConfig',
    method: 'get'
  })
}

/**
 * 保存tabs配置
 */
export function saveTabsConfig (data) {
  return axios({
    url: 'easyboot/systemConfig/tabsConfig',
    method: 'post',
    data
  })
}
