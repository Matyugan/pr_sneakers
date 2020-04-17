import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => { 
  return new Vuex.Store({
    state: () => ({
      user: null,
      address: null,
      successRegistration: false,
      error: false,
      raffles: [],
      winnerRaffle: null
    }),

    mutations: {
      setUserData(state, payload) {
        state.user = payload
      },
      setUserAddress(state, payload) {
        state.address = payload
      },
      registration(state, payload) {
        state.successRegistration = payload
      },
      logout(state, payload) {
        state.user = payload
      },
      setError(state, payload) {
        state.error = payload
      },
      setRaffles(state, payload) {
        state.raffles = payload
      },
      setWinnerRafle(state, payload) {
        state.winnerRaffle = payload
        console.log(state.winnerRaffle)
      }
    },

    actions: {
      registration({ commit }, payload) {
        const userData = {
          NickName: payload.NickName,
          Email: payload.Email,
          'g-recaptcha-response': payload.Recaptcha
        }
        this.$axios.$post('/User', userData)
        .then((response) => {
          commit('registration', true)
          commit('setUserData', userData)
        })
      },

      async login({ commit }, payload) {
        try {
          const userData = {
            Email: payload.Email,
            Password: payload.Password
          }
          const response = await this.$axios.$post('/SessionToken', {
            ...userData
          })
          const token = {
            SessionToken: response.Result.SessionToken
          }
          this.$cookies.set('token', JSON.stringify(token), {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          this.dispatch('checkToken', token)
          this.dispatch('raffles')
        }
        catch(error) {
          commit('setError', true)
          console.log(error)
        }
      },

      checkToken({ commit }, payload) {
        if(this.$cookies.get('token')) {
          const token = this.$cookies.get('token').SessionToken || payload
          this.$axios.$get(`/UserData?SessionToken=${token}`)
          .then(response => {
            commit('setUserData', {
              ...response.Result
            })
          })
          .catch((error) => {
            this.$cookies.remove('token')
            console.log(error)
          })
          this.$axios.$get(`/UserAddress?SessionToken=${token}`)
          .then((response) => {
            commit('setUserAddress', {
              ...response.Result
            })
          })
          this.dispatch('winnerRaffles')
        }
      },

      logout({ commit }, payload) {
        commit('logout', payload)
        commit('setRaffles', [])
        this.$cookies.remove('token')
      },

      raffles({ commit }, payload) {
        if(this.$cookies.get('token')) {
          this.$axios.$get(`/Raffles?SessionToken=${this.$cookies.get('token').SessionToken}`)
          .then((response) => {
            const raffles = [
              ...response.Result
            ]
            commit('setRaffles', raffles)
          })
        }
      },

      resetPassword({ commit }, payload) {
        this.$axios.$get(`/UserPassword?Email=${payload}`)
      },

      changeUserData({commit}, payload) {
        const userData = {
          SessionToken: this.$cookies.get('token').SessionToken,
          NickName: payload.NickName,
          FirstName: payload.FirstName,
          LastName: payload.LastName,
          NationalIDNumber: payload.NationalIDNumber,
        }
        this.$axios.$put('/UserData', userData)
        .then((response) => {
          commit('setUserData', userData)
        }).catch((error) => {
          console.log(error)
        })
      },

      changeUserAddress({ commit, getters }, payload) {
        const userAddress = {
          SessionToken: this.$cookies.get('token').SessionToken,
          FirstName: payload.FirstName,
          LastName: payload.LastName,
          Address1: payload.Address1,
          Address2: payload.Address2,
          State: payload.State,
          PostCode: payload.PostCode,
          PaypalID: payload.PaypalID,
          Country: payload.Country,
          City: payload.City
        }
        this.$axios.$put('/UserAddress', userAddress)
        .then((response) => {
          commit('setUserAddress', {
            ...userAddress
          })
        }).catch((error) => {
          console.log(error)
        })
      },

      registerLot({commit}, payload) {
        const userData = {
          SessionToken: this.$cookies.get('token').SessionToken,
          LotID: payload
        }
        this.$axios.$post('/UserLot', userData)
        .then((response) => {
          console.log(response)
          this.$router.push('/')
        }).catch(error => console.log(error))
      },

      subscribe({commit}, payload) {
        this.$axios.$post('/Subscribe', payload)
      },

      winnerRaffles({ commit }) {
        this.$axios.$get(`/UserWins?SessionToken=${this.$cookies.get('token').SessionToken}`)
        .then((response) => {
          commit('setWinnerRafle', response.Result)
        })
      }
    },

    getters: {
      getUser(state) {
        return state.user
      },
      getAddress(state) {
        return state.address || {}
      },
      successRegistration(state) {
        return state.successRegistration
      },
      getError(state) {
        return state.error
      },
      getRaffles(state) {
        return state.raffles || []
      },
      getRaffle(state) {
        return (ReleaseName) => {
          return state.raffles.find((raffle) => {
            return raffle.ReleaseName.replace(/\s/g, '') === ReleaseName
          }) || {}
        }
      },
      getWinnerRaffles(state) {
        return state.winnerRaffle || {}
      }
    }
  })
}
export default store