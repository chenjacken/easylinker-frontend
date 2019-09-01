<template>
  <div class="rank">
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <div class="status">
          <a-badge status="default"/>
        </div>
        <div class="name">
          <a-tooltip>
            <template slot="title">{{ item.name }}</template>
            {{ item.name }}
          </a-tooltip>
        </div>
        <div class="date">{{ item.date }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankList',
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.rank {
  .list {
    padding: 0;
    list-style: none;

    li {
      display: flex;
      line-height: 1;

      div {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }

      .status {
        flex:10px 0 0;
      }

      .name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 10px;
        text-overflow: ellipsis;
      }

      .date {
        flex: 130px 0 0;
      }
    }
  }
}

.mobile .rank {
  padding: 0 32px 32px 32px;
}
</style>
