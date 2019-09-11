import { axios } from '@/utils/request'

/**
 * @description 获取全局异常枚举
 */
export function getGlobalCode () {
  return axios({
    url: 'easyboot/sysParam/listCode',
    method: 'get'
  })
}
