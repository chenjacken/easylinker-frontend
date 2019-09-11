<template>
  <div class="rank">
    <ul class="list">
      <li
        :key="index"
        v-for="(item, index) in list"
      >
        <div class="status">
          <a-badge status="processing" />
        </div>
        <div class="name">
          <a-tooltip :title="item.info">
            {{ item.info }}
          </a-tooltip>
        </div>
        <div class="date">{{ item.createTime | dateformat }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { dateFormat } from '@/utils/dateUtils'
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
  },
  filters: {
    dateformat (time) {
      return dateFormat('YYYY-mm-dd HH:MM:SS', time)
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
        flex: 10px 0 0;
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
