<template lang="pug">
  section.section.section-personal-info
    .container
      .personal-info.grid.grid-2.grid--md-1
        .personal-info--inner
          h2.section-title.section-title_left Personal info
          .personal-info--data-wrapper(v-if="!userData.isEditUserData")
            .personal-info--data
              .personal-info--data-item
                .personal-info--name NickName
                .personal-info--name Name
                .personal-info--name City
                .personal-info--name National ID
              .personal-info--data-item(v-if="USER_DATA")
                .personal-info--name-value {{ USER_DATA.NickName }}
                .personal-info--name-value(v-if="!USER_DATA.FirstName && !USER_DATA.LastName") Enter data
                .personal-info--name-value
                  span(v-if="USER_DATA.FirstName") {{ USER_DATA.FirstName }} 
                  span(v-if="USER_DATA.LastName") {{ USER_DATA.LastName }}
                .personal-info--name-value Paris
                .personal-info--name-value(v-if="USER_DATA.NationalIDNumber") {{ USER_DATA.NationalIDNumber }}
                .personal-info--name-value(v-if="!USER_DATA.NationalIDNumber") Enter data
            button.button.button_transparent.personal-info--button(@click="editableUserData") Edit info
            nuxt-link(to="/").auth-form-reset-password--text Reset password
              svg(class="auth-form-reset-password--arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M12.01 3H1C0.45 3 0 3.45 0 4C0 4.55 0.45 5 1 5H12.01V6.79C12.01 7.24 12.55 7.46 12.86 7.14L15.64 4.35C15.83 4.15 15.83 3.84 15.64 3.64L12.86 0.850002C12.55 0.530002 12.01 0.760001 12.01 1.2V3Z" fill="#DB3022")

          form.auth-form.signup--form(v-if="userData.isEditUserData")
            select.auth-form--select
              option.auth-form--select-option(selected disable hidden) Paris
            input.auth-form--input(placeholder="First Name" type="text" v-model="userData.FirstName")
            input.auth-form--input(placeholder="Last Name" type="text" v-model="userData.LastName")
            input.auth-form--input(placeholder="National ID" type="text" v-model="userData.NationalIDNumber")
            button.button.button_color.auth-form--button(@click.prevent="changeUserData") Save info
            .auth-form-sign-in--wrapper
              nuxt-link(to="/").auth-form-sign-in Reset password
              svg(class="auth-form-sign-in--arrow" width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M12.01 3H1C0.45 3 0 3.45 0 4C0 4.55 0.45 5 1 5H12.01V6.79C12.01 7.24 12.55 7.46 12.86 7.14L15.64 4.35C15.83 4.15 15.83 3.84 15.64 3.64L12.86 0.850002C12.55 0.530002 12.01 0.760001 12.01 1.2V3Z" fill="#DB3022")

        //-- User Address
        .personal-info--inner
          h2.section-title.section-title_left Address <span class="personal-info--inner-subtitle">(for online purchase)</span>
          .personal-info--data-wrapper(v-if="!userAddress.isEditUserAddress")
            .personal-info--data
              .personal-info--data-item
                .personal-info--name First name
                .personal-info--name Last name
                .personal-info--name Address line 1
                .personal-info--name Address line 2
                .personal-info--name State
                .personal-info--name City
                .personal-info--name Country
                .personal-info--name Postcode
                .personal-info--name PayPal ID
              .personal-info--data-item
                .personal-info--name-value(v-if="USER_ADDRESS.FirstName") {{ USER_ADDRESS.FirstName }}
                .personal-info--name-value(v-if="!USER_ADDRESS.FirstName") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.LastName") {{ USER_ADDRESS.LastName }}
                .personal-info--name-value(v-if="!USER_ADDRESS.LastName") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.Address1") {{ USER_ADDRESS.Address1 }}
                .personal-info--name-value(v-if="!USER_ADDRESS.Address1") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.Address2") {{ USER_ADDRESS.Address2 }}
                .personal-info--name-value(v-if="!USER_ADDRESS.Address2") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.State") {{ USER_ADDRESS.State }}
                .personal-info--name-value(v-if="!USER_ADDRESS.State") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.City") {{ USER_ADDRESS.City }}
                .personal-info--name-value(v-if="!USER_ADDRESS.City") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.Country") {{ USER_ADDRESS.Country }}
                .personal-info--name-value(v-if="!USER_ADDRESS.Country") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.PostCode") {{ USER_ADDRESS.PostCode }}
                .personal-info--name-value(v-if="!USER_ADDRESS.PostCode") Enter data

                .personal-info--name-value(v-if="USER_ADDRESS.PaypalID") {{ USER_ADDRESS.PaypalID }}
                .personal-info--name-value(v-if="!USER_ADDRESS.PaypalID") Enter data

            button.button.button_transparent.personal-info--button(@click="editableUserAddress") Edit info

          form.auth-form.signup--form(v-if="userAddress.isEditUserAddress")
            input.auth-form--input(placeholder="First Name" type="text" v-model="userAddress.FirstName")
            input.auth-form--input(placeholder="Last Name" type="text" v-model="userAddress.LastName")
            input.auth-form--input(placeholder="Address line 1" type="text" v-model="userAddress.Address1")
            input.auth-form--input(placeholder="Address line 2" type="text" v-model="userAddress.Address2")
            input.auth-form--input(placeholder="State" type="text" v-model="userAddress.State")
            input.auth-form--input(placeholder="Postcode" type="text" v-model="userAddress.PostCode")
            input.auth-form--input(placeholder="PayPal ID (for online purchase)" type="text" v-model="userAddress.PaypalID")
            button.button.button_color.auth-form--button(@click.prevent="changeUserAddress") Save info

        .your-wins
          h2.section-title.section-title_left Your wins
          p.your-wins--text You have no wins at this moment

</template>

<script>
export default {
  middleware: ['auth'],
  data: () => ({
    userData: {
      isEditUserData: false,
      NickName: '',
      Email: '',
      FirstName: '',
      LastName: '',
      NationalIDNumber: ''
    },
    userAddress: {
      isEditUserAddress: false,
      FirstName: '',
      LastName: '',
      Address1: '',
      Address2: '',
      State: '',
      PostCode: '',
      PaypalID: ''
    }
  }),
  computed: {
    USER_DATA() {
      return this.$store.getters.getUser
    },
    USER_ADDRESS() {
      return this.$store.getters.getAddress
    }
  },
  methods: {

    changeUserData() {
      const userData = {
        NickName: this.userData.NickName,
        FirstName: this.userData.FirstName || null,
        LastName: this.userData.LastName || null,
        NationalIDNumber: this.userData.NationalIDNumber || null
      }
      this.$store.dispatch('changeUserData', userData)
      .then((response) => {
        this.userData.isEditUserData = false
        this.$store.dispatch('checkToken')
      })
      .catch(error => console.log(error))
    },

    editableUserData() {
      this.userData.isEditUserData = true
      this.userData.NickName = this.USER_DATA.NickName
      this.userData.Email = this.USER_DATA.Email
      this.userData.FirstName = this.USER_DATA.FirstName
      this.userData.LastName = this.USER_DATA.LastName
      this.userData.NationalIDNumber = this.USER_DATA.NationalIDNumber
    },

    changeUserAddress() {
      const userAddress = {
        FirstName: this.userAddress.FirstName,
        LastName: this.userAddress.LastName,
        Address1: this.userAddress.Address1 || null,
        Address2: this.userAddress.Address2 || null,
        State: this.userAddress.State || null,
        PostCode: this.userAddress.PostCode || null,
        PaypalID: this.userAddress.PaypalID || null,
        Country: 'France',
        City: 'Paris'
      }
      this.$store.dispatch('changeUserAddress', userAddress)
      .then((response) => {
        this.userAddress.isEditUserAddress = false
      }).catch(error => console.log(error))
    },

    editableUserAddress() {
      this.userAddress.isEditUserAddress = true
      this.userAddress.FirstName = this.USER_ADDRESS.FirstName
      this.userAddress.LastName = this.USER_ADDRESS.LastName
      this.userAddress.Address1 = this.USER_ADDRESS.Address1
      this.userAddress.Address2 = this.USER_ADDRESS.Address2
      this.userAddress.State = this.USER_ADDRESS.State
      this.userAddress.PostCode = this.USER_ADDRESS.PostCode
      this.userAddress.PaypalID = this.USER_ADDRESS.PaypalID
    }
  }
}
</script>