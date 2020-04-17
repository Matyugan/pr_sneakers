<template lang="pug">
  section.section--modal-register-lot
    .modal--window-register-lot
      svg(@click="closeModal" class="modal--register-lot-form-close" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M9.19238 27.5771L27.5772 9.19237" stroke="#DB3022")
        path(d="M27.5771 27.5771L9.19237 9.19237" stroke="#DB3022")

      form.auth-form.modal--register-lot-form
        .auth-form--text-wrapper
          p.auth-form--text Provide your details to enter the draw to purchase Nike SB Dunk Safari. We'll select winners randomly and notify you within 3 hours of the draw finishing.
        input.auth-form--input(placeholder="First Name" type="text" v-model="FirstName")
        input.auth-form--input(placeholder="Last name" type="text" v-model="LastName")
        input.auth-form--input(placeholder="National ID" type="text" v-model="NationalIDNumber")
        button.button.button_color.auth-form--button(:disabled="!validateForm" @click="addUserData") Enter the draw
</template>

<script>
export default {
  data: () => ({
    FirstName: null,
    LastName: null,
    NationalIDNumber: null
  }),
  computed: {
    validateForm() {
      return this.FirstName !== null && this.LastName !== null && this.NationalIDNumber !== null
    },
    getUserData() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    addUserData() {
      const userData = {
        Name: this.getUserData.Name,
        FirstName: this.FirstName,
        LastName: this.LastName,
        NationalIDNumber: this.NationalIDNumber
      }
      this.$store.dispatch('changeUserData', userData)
      .then(
        this.closeModal()
      )
    }
  }
}
</script>