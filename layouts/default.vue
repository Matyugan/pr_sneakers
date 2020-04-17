<template lang="pug">
  .application
    c_Header
    nuxt
    c_Footer
</template>

<script>
import c_Header from '../components/common/c-Header.vue'
import c_Footer from '../components/common/c-Footer.vue'

export default {
  components: {
    c_Header,
    c_Footer
  },
  mounted() {
    this.$store.dispatch('checkToken')
  }
}
</script>