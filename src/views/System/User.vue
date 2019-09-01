<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="24">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatarrr">
            </div>
            <div class="username">{{ userDetail.principle }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>{{ userDetail.name }}
            </p>
            <p>
              <i class="group"></i>{{ userDetail.roles }}
            </p>
            <p>
              <i class="email"></i>
              <span>{{ userDetail.email }}</span>
            </p>
          </div>
          <a-divider/>

          <div class="account-center-tags">
            <div class="tagsTitle">当前配置
            </div>
            <div>
              <pre>{{ tabs }}</pre>
            </div>
          </div>
          <a-divider :dashed="true"/>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { queryUserDetail, queryUserConfig } from '@/api/user'

export default {
  components: {
    RouteView,
    PageView
  },
  data () {
    return {
      // 用户基本信息
      userDetail: {
        principle: '',
        roles: '',
        name: '',
        email: ''
      },
      // 用户tabs信息
      tabs: [],
      avatarrr: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    }
  },
  mounted () {
    this.getTeams()
  },
  methods: {
  },
  created () {
    queryUserDetail().then(res => {
      this.userDetail = res.data
      console.log(this.userDetail)
    })
    queryUserConfig().then(res => {
      this.tabs = res.data.tabs
      // this.tabs = JSON.stringify(this.tabs)
      console.log(this.tabs)
    })
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
