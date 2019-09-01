<template>
  <div class="logo" style="padding-left:16px">
    <router-link :to="{name:'home'}">
      <img v-if="showTitle" style="width:180px;height:45px" src="@/assets/logo.png" alt />
      <div v-else style="width:50px;overflow:hidden">
        <img style="width:180px;height:45px" src="@/assets/logo.png" alt />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: 'Easylinker V3',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
