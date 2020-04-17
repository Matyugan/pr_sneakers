<template lang="pug">
  section.section.section-sign-in
    .container
      h1.page-title.section-title_center Sign in
      .signin
        form.auth-form.sigin--form(v-if="!isResetPassword")
          .auth-form--text-wrapper(v-if="!error")
            p.auth-form--text Please, enter your email address.
            p.auth-form--text You will receive your password via email.
          .auth-form--text-wrapper(v-if="error")
            p.auth-form--text(style="color: red") Please, enter valid password or email
          input.auth-form--input(placeholder="Email" type="text" v-model="Email")
          input.auth-form--input(placeholder="Password" type="password" v-model="Password")
          button.button.button_color.auth-form--button(
            :disabled="!loginValidate"
            @click.prevent="login"
          ) Login
          .auth-form-reset-password--wrapper
            span.auth-form-reset-password--text(@click="isResetPassword = !isResetPassword") Reset password
              svg(class="auth-form-reset-password--arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M12.01 3H1C0.45 3 0 3.45 0 4C0 4.55 0.45 5 1 5H12.01V6.79C12.01 7.24 12.55 7.46 12.86 7.14L15.64 4.35C15.83 4.15 15.83 3.84 15.64 3.64L12.86 0.850002C12.55 0.530002 12.01 0.760001 12.01 1.2V3Z" fill="#DB3022")
            nuxt-link.auth-form-reset-password--text(to="/signup") Create an account
              svg(class="auth-form-reset-password--arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M12.01 3H1C0.45 3 0 3.45 0 4C0 4.55 0.45 5 1 5H12.01V6.79C12.01 7.24 12.55 7.46 12.86 7.14L15.64 4.35C15.83 4.15 15.83 3.84 15.64 3.64L12.86 0.850002C12.55 0.530002 12.01 0.760001 12.01 1.2V3Z" fill="#DB3022")
        form.auth-form.sigin--form(v-if="isResetPassword")
          .auth-form--text-wrapper
            p.auth-form--text Please, enter your email address.
          input.auth-form--input(placeholder="Email" type="text" v-model="ResetPasswordEmail")
          button.button.button_color.auth-form--button(
            :disabled="!resetPasswordValidate"
            @click.prevent="resetPassword"
          ) Reset Password
</template>

<script>
export default {
  data: () => ({
    Email: '',
    Password: '',
    isResetPassword: false,
    ResetPasswordEmail: ''
  }),

  computed: {
    loginValidate() {
      return this.Email !== '' && this.Password !== ''
    },
    resetPasswordValidate() {
      return this.ResetPasswordEmail !== ''
    },
    error() {
      return this.$store.getters.getError
    }
  },

  methods: {
    login() {
      const userData = {
        Email: this.Email,
        Password: this.Password
      }
      this.$store.dispatch('login', userData)
      .then(
        this.$router.push('/')
      )
    },
    resetPassword() {
      const email = this.ResetPasswordEmail
      this.$store.dispatch('resetPassword', email)
      .then((response) => {
        this.ResetPasswordEmail = ''
        this.isResetPassword = false
      })
    }
  }
}
</script>