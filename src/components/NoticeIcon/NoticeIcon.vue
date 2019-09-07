<template>
  <a-dropdown
    :trigger="['click']"
    v-model="visible"
  >
    <div
      slot="overlay"
      class="header-dropdown-index-container"
    >
      <a-spin :spinning="loadding">
        <div class="spin-content">
          <a-tabs
            :tabBarStyle="{textAlign: 'center', margin: '0'}"
            :style="{backgroundColor: 'white', width: '336px'}"
          >
            <a-tab-pane
              tab="通知"
              key="1"
            >
              <a-list :dataSource="noticeList">
                <a-list-item
                  class="notice-list-item"
                  slot="renderItem"
                  slot-scope="item, index"
                  @click="handleNotice(index)"
                >
                  <a-list-item-meta>
                    <h4 slot="title">{{ item.msgContent }}</h4>
                    <span
                      slot="description"
                      class="notice-item-desc"
                    >{{ dateformat(item.createTime) }}</span>
                    <a-avatar
                      slot="avatar"
                      src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                    />
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-spin>
    </div>
    <span
      @click="fetchNotice"
      class="header-notice"
      ref="noticeRef"
    >
      <a-badge :count="noticeTotal">
        <a-icon
          style="font-size: 16px; padding: 4px;vertical-align: middle;"
          type="bell"
        />
      </a-badge>
    </span>
  </a-dropdown>
</template>

<script>
import { getNoticeInfo, markRead } from '@/api/notice'
import { dateFormat } from '@/utils/dateUtils'
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false,
      visible: false,
      noticeList: [],
      noticeTotal: 0
    }
  },

  created () {
    this.getInfoList()
  },

  methods: {
    fetchNotice () {
      if (!this.visible) {
        this.loadding = true
        setTimeout(() => {
          this.loadding = false
        }, 1000)
      } else {
        this.loadding = false
      }
      this.visible = !this.visible
    },

    async getInfoList () {
      const { data: { content, totalElements } } = await getNoticeInfo()
      this.noticeList = content
      this.noticeTotal = totalElements
    },

    dateformat (time) {
      return dateFormat('YYYY-mm-dd HH:MM:SS', time)
    },

    handleNotice (index) {
      const { securityId } = this.noticeList[index]
      markRead(securityId).then(res => {
        this.getInfoList()
      })
    }
  }

}
</script>

<style lang="less" scope>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
.header-dropdown-index-container > * {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.notice-list-item {
  padding: 12px 24px !important;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  &:hover {
    background: #e6f7ff;
  }
  .notice-item-desc {
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
