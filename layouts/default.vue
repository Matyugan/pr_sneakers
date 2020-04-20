<template lang="pug">
  .application
    c_Header
    nuxt
    c_Footer
    c_Cookies
    c_ModalTos
    c_ModalPolicy
</template>

<script>
import c_Header from '../components/common/c-Header.vue'
import c_Footer from '../components/common/c-Footer.vue'
import c_Cookies from '../components/common/c-Cookies.vue'
import c_ModalTos from '../components/common/c-modal-tos.vue'
import c_ModalPolicy from '../components/common/c-modal-policy.vue'
export default {
  components: {
    c_Header,
    c_Footer,
    c_Cookies,
    c_ModalTos,
    c_ModalPolicy
  },
  mounted() {
    this.$store.dispatch('checkToken')
  }
}
</script>