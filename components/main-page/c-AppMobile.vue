<template lang="pug">
  section.section.section-app-mobile
    .container
      .app-mobile
        .app-mobile-image--wrapper
          img(class="app-mobile-image" src="../../static/images/main-page/appMobile/img_phone.png", alt="image-phone")
        .app-mobile-form
          h2.section-title.section-title_left.app-mobile-form--title Mobile app <br> coming soon
          span.app-mobile-form--subtitle {{ SubscribeText }}
          input.app-mobile-form--email(placeholder="Email" type="text" v-model="Email")
          button.button.button_color.app-mobile-form--button(:disabled="!validateSubscribe" @click="subscribe") Subscribe
          .app-mobile-form--download
            img(class="app-mobile-form--download-item" src="../../static/images/main-page/appMobile/img_appstore.png", alt="appstore")
            img(class="app-mobile-form--download-item" src="../../static/images/main-page/appMobile/img_googleplay.png", alt="googleplay")
</template>

<script>
export default {
  name: 'AppMobile',
  data: () => ({
    Email: '',
    SubscribeText: 'Subscribe to our newsletter'
  }),
  computed: {
    validateSubscribe() {
      return this.Email !== ''
    }
  },
  methods: {
    subscribe() {
      const email =  {
        Email: this.Email
      }

      this.$store.dispatch('subscribe', email)
      .then((response) => {
        this.Email = ''
        this.SubscribeText = 'You have successfully subscribed'
      })
    }
  }

}
</script>