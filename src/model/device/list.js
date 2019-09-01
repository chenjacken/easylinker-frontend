/**
 * 设备列表
 */
import moment from 'moment'

const createColumns = (columns = []) => [
  {
    title: '设备编号',
    dataIndex: 'sn',
    width: 150,
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '设备名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '所属场景',
    dataIndex: 'sceneSecurityId',
    scopedSlots: { customRender: 'scene' }
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '设备描述',
    dataIndex: 'info'
  },
  ...columns,
  {
    title: '创建时间',
    dataIndex: 'createTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: 225,
    sorter: true
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: 225,
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 150,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]

export const columnsHTTP = createColumns()

export const columnsMQTT = createColumns([
  {
    title: '状态',
    dataIndex: 'deviceStatus',
    width: 150,
    scopedSlots: { customRender: 'deviceStatus' }
  },
  {
    title: '最后活跃时间',
    dataIndex: 'lastActive',
    width: 200,
    scopedSlots: { customRender: 'online' }
  }
])

export const columnsCoAP = createColumns()

export const columnsTCP = createColumns()

export const columnsUDP = createColumns()
