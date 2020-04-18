<template lang="pug">
  .application
    c_Header
    nuxt
    c_Footer
    c_Cookies
</template>

<script>
import c_Header from '../components/common/c-Header.vue'
import c_Footer from '../components/common/c-Footer.vue'
import c_Cookies from '../components/common/c-Cookies.vue'
export default {
  components: {
    c_Header,
    c_Footer,
    c_Cookies
  },
  mounted() {
    this.$store.dispatch('checkToken')
  }
}
</script>