import { axios } from '@/utils/request'

/**
 * 添加场景
 */
export function addScene (data) {
  return axios({
    url: '/easyboot/scene/add',
    method: 'post',
    data
  })
}

/**
 * 添加自定义场景
 */
export function addCustomScene (data) {
  return axios({
    url: '/easyboot/scene/add',
    method: 'post',
    data
  })
}

/**
 * 查询场景列表
 */
export function querySceneList (parameter) {
  return axios({
    url: '/easyboot/scene/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询场景类型
 */
export function querySceneType (parameter) {
  return axios({
    url: '/easyboot/scene/listSceneType',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询场景下设备
 */
export function querySceneDevice (parameter) {
  return axios({
    url: '/easyboot/scene/listDevice',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取预装模板
 */
export function queryPreInstallTemplate () {
  return axios({
    url: '/easyboot/scene/listPreInstallTemplate',
    method: 'get'
  })
}
