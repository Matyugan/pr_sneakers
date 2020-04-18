<template lang="pug">
  .cookies(v-if="cookiesPolicy")
    .cookies--text By using this site, you agree to the use of cookies for analytical purposes, advertising and personalized content.  More info <a class="cookies--link" href="#">click here.</a>
    button.button.cookies--button.button_transparent(type="button" @click="acceptPolicy") Accept
</template>

<script>
export default {
  name: 'c_Cookies',
  data: () => ({
    cookiesPolicy: false
  }),
  methods: {
    acceptPolicy() {
      localStorage.setItem('cookies', true)
      this.cookiesPolicy = false
    }
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('cookies')) === true) {
      this.cookiesPolicy = false
    } else {
      this.cookiesPolicy = true
    }
  }
}
</script>