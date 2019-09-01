<template>
  <div v-html="image" />
</template>

<script>
import jdenticon from 'jdenticon'

export default {
  data () {
    return {
      image: null
    }
  },
  mounted () {
    this.updateImage()
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.updateImage()
      })
    }
  },
  props: {
    value: {
      type: String,
      default: 'LiuZY'
    },
    size: {
      type: Number,
      default: 100
    }
  },
  methods: {
    updateImage () {
      this.image = jdenticon.toSvg(this.value, this.size)
    }
  }
}
</script>

<style>
</style>
