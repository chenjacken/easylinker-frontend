<template>
  <canvas :width="width" :height="height" ref="code128" />
</template>

<script>
import jsbarcode from 'jsbarcode'

export default {
  props: {
    width: {
      type: Number,
      default: 128
    },
    height: {
      type: Number,
      default: 72
    },
    val: {
      type: String,
      default: '-'
    }
  },
  mounted () {
    this.update()
  },
  watch: {
    val () {
      this.update()
    }
  },
  methods: {
    update () {
      this.$nextTick(() => {
        const { width, height, val } = this
        jsbarcode(this.$refs.code128, val, {
          width: 1,
          height: height,
          fontSize: 13
        })
      })
    }
  }
}
</script>
