<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <route-view></route-view>
      <div class="footer">
        <!-- <div class="links">
          <a href="_self">L</a>
          <a href="_self">Z</a>
          <a href="_self">Y</a>
        </div> -->
        <div class="copyright">
          Copyright &copy; 2019 LightWeight-IoT.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;
    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #222222;
      background-size: 100%;

      a {
        text-decoration: none;
      }

      .main {
        flex: 400px;
        min-width: 368px;
        max-width: 400px;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(255, 255, 255, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
