import { axios } from '@/utils/request'

/**
 * 添加根据类型添加设备
 */
export function addDevice (data) {
  const { deviceProtocol } = data
  return axios({
    url: `/easyboot/device/add${deviceProtocol}`,
    method: 'post',
    data
  })
}

/**
 * 更新设备
 */
export function updateDevice (data) {
  return axios({
    url: '/easyboot/device/update',
    method: 'post',
    data
  })
}

/**
 * 查询设备
 */
export function queryDeviceList (parameter) {
  return axios({
    url: `easyboot/device/list`,
    method: 'get',
    params: parameter
  })
}

/**
 * 查询设备详情
 */
export function queryDeviceDetail (parameter) {
  return axios({
    url: 'easyboot/device/listHttp',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询设备数据
 */
export function queryDeviceDataList (parameter) {
  return axios({
    url: 'easyboot/deviceData/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询设备操作日志
 */
export function queryDeviceOperateLogList (parameter) {
  return axios({
    url: 'easyboot/deviceOperate/listLog',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询设备支持协议
 */
export function queryDeviceProtocol () {
  return axios({
    url: 'easyboot/device/listProtocolType',
    method: 'get'
  })
}

/**
 * 查询设备支持类型
 */
export function queryDeviceType () {
  return axios({
    url: 'easyboot/device/listDeviceType',
    method: 'get'
  })
}

/**
 * 查询设备支持状态
 */
export function queryDeviceStatus () {
  return axios({
    url: 'easyboot/device/listDeviceStatus',
    method: 'get'
  })
}

/**
 * @description 根据设备类型获取支持的协议类型
 * @param { string } type 设备类型
 */
export function queryProtocolByType (type) {
  return axios({
    url: `easyboot/sysParam/getProtocolByType?deviceType=${type}`,
    method: 'get'
  })
}

/**
 * 获取设备数据
 */
export function getDeviceData () {
  return axios({
    url: `easyboot/deviceData/list?deviceSecurityId=9a7d2b07d32b41b888a84080b0d9de63&deviceType=BOOLEAN&page=0&size=20`,
    method: 'get'
  })
}
