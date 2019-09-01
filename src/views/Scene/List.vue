<template>
  <div class="card-list" ref="content">
    <a-list :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}" :dataSource="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item === null">
          <a-button class="new-btn" type="dashed" @click="$refs.createSceneModal.create()">
            <a-icon type="plus" />新增场景
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true">
            <a-card-meta>
              <RandomImage slot="avatar" :value="item.securityId" :size="120" />
              <div style="margin-bottom: 3px" slot="title">{{ item.name }}</div>
              <div class="meta-content" slot="description">{{ item.info }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a>编辑场景</a>
              <a>删除场景</a>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <create-scene-model destroyOnClose ref="createSceneModal" @ok="handleOk" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CreateSceneModel from './modules/Create'
import RandomImage from '@/components/RandomImage'
const defaultQuery = {
  page: 0,
  size: 100
}

export default {
  name: 'CardList',
  data () {
    return {}
  },
  components: { CreateSceneModel, RandomImage },
  computed: {
    ...mapState({
      list: state => [null, ...state.scene.list]
    })
  },
  created () {
    this.QuerySceneList(defaultQuery)
    this.QueryPreInstallTemplate()
    this.QuerySceneType()
  },
  methods: {
    ...mapActions(['QuerySceneList', 'QueryPreInstallTemplate', 'QuerySceneType']),
    handleOk () {
      this.QuerySceneList(defaultQuery)
    }
  }
}
</script>

<style lang="less" scoped>
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;
  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: #1890ff;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 219px;
}

.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
