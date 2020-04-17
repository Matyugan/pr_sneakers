<template lang="pug">
  section.section.section-sign-up
    .container
      h1.page-title.section-title_center Sign up
      .signup
        form.auth-form.signup--form(v-if="!successRegistration")
          .auth-form--text-wrapper
            p.auth-form--text Please, enter your email address.
            p.auth-form--text You will receive your password via email.
          input.auth-form--input(placeholder="NickName" type="text" v-model="NickName")
          select.auth-form--select
            option.auth-form--select-option(selected disable hidden) Paris
          input.auth-form--input(placeholder="Email" type="text" v-model="Email")
          .recaptcha(v-if="signupValidation")
            recaptcha(
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
              @callback="test(response)"
            )
          button.button.button_color.auth-form--button(:disabled="!signupValidation" @click.prevent="generatePassword") Generate password
          .auth-form-sign-in--wrapper
            nuxt-link(to="/signin").auth-form-sign-in Already have an account?
            svg(class="auth-form-sign-in--arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg")
              path(d="M12.01 3H1C0.45 3 0 3.45 0 4C0 4.55 0.45 5 1 5H12.01V6.79C12.01 7.24 12.55 7.46 12.86 7.14L15.64 4.35C15.83 4.15 15.83 3.84 15.64 3.64L12.86 0.850002C12.55 0.530002 12.01 0.760001 12.01 1.2V3Z" fill="#DB3022")
        form.auth-form.signup--form(v-if="successRegistration")
          .auth-form--text-wrapper
            p.auth-form--text Please, enter your email address.
            p.auth-form--text You will receive your password via email.
          input.auth-form--input(placeholder="Password" type="text" v-model="Password")
          button.button.button_color.auth-form--button(@click.prevent="login") Enter
          .auth-form-sign-in--wrapper
            nuxt-link(to="/signin").auth-form-sign-in Already have an account?
            svg(class="auth-form-sign-in--arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg")
              path(d="M12.01 3H1C0.45 3 0 3.45 0 4C0 4.55 0.45 5 1 5H12.01V6.79C12.01 7.24 12.55 7.46 12.86 7.14L15.64 4.35C15.83 4.15 15.83 3.84 15.64 3.64L12.86 0.850002C12.55 0.530002 12.01 0.760001 12.01 1.2V3Z" fill="#DB3022")

</template>

<script>
import recaptcha from '@nuxtjs/recaptcha'

export default {
  data() {
    return {
      NickName: '',
      Email: '',
      RecaptchaToken: '',
      Password: ''
    }
  },
  computed: {
    signupValidation () {
      return this.NickName !== '' && this.Email !== ''
    },
    successRegistration() {
      return this.$store.getters.successRegistration
    },
    getUser() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    generatePassword() {
      const userData = {
        NickName: this.NickName,
        Email: this.Email,
        Recaptcha: this.RecaptchaToken
      }
      this.$store.dispatch('registration', userData)
    },

    onError (error) {
      console.log('Error happened:', error)
    },
    onSuccess (token) {
      this.RecaptchaToken = token
    },
    onExpired () {
      console.log('Expired')
    },

    login() {
      const userData = {
        Email: this.getUser.Email,
        Password: this.Password
      }
      this.$store.dispatch('login', userData)
      .then((response) => {
        this.$router.push('/')
      })
    }
  }
}
</script>