import moment from 'moment'

export const operateColumn = [
  {
    title: '编号',
    dataIndex: 'securityId',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作内容',
    dataIndex: 'operate',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作事件',
    dataIndex: 'event',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作反馈',
    dataIndex: 'echo',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '备注',
    dataIndex: 'id',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: 225,
    sorter: true
  }
]

export const dataColumn = [
  {
    title: '编号',
    dataIndex: 'securityId',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '内容',
    dataIndex: 'operate',
    width: 300,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '类型',
    dataIndex: 'id',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '单位',
    dataIndex: 'event',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '备注',
    dataIndex: 'echo',
    width: 150,
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    customRender: date => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    width: 225,
    sorter: true
  }
]
