import { axios } from '@/utils/request'

/**
 * 获取未读消息
 */
export function getNoticeInfo () {
  return axios({
    url: 'easyboot/message/list?page=0&size=5&messageState=NO_READ',
    method: 'get'
  })
}

/**
 * 标记消息为已读
 * @param {int} id
 */
export function markRead (id) {
  return axios({
    url: `easyboot/message/markRead?securityId=${id}`,
    method: 'put'
  })
}
