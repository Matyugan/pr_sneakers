<template lang="pug">
  .raffles-item
    img(:src="raffle.Picture", alt="Sneakers").raffles-item--image
    .raffles-item--time 
      span.raffles-item--date {{ raffleDate }}
      span.raffles-item--date-separator
      span.raffles-item--status(v-if="raffleStatus" :class="{'raffles-item--status_active' : raffleStatus}") Open
      span.raffles-item--status(v-if="!raffleStatus" :class="{'raffles-item--status_disable' : !raffleStatus}") Closed
    div.raffles-item--name(v-if="!raffleStatus") {{ raffle.ReleaseName }}
    nuxt-link(:to="`/raffles/${raffleLink}`" v-if="raffleStatus").raffles-item--name {{ raffle.ReleaseName }}
    .raffles-item--price $100
</template>

<script>
export default {
  name: 'c_RafflesItem',
  props: {
    raffle: {
      type: Object,
      default: () => {}
    },
  },
  data: () => ({
    raffleDate: null,
    raffleLink: '',
    raffleStatus: null
  }),
  mounted() {
    const date = new Date(this.$props.raffle.ReleaseDateTime)
    const hours = (date.getHours()<10?'0':'') + date.getHours()
    const minutes = (date.getMinutes()<10?'0':'') + date.getMinutes()
    const day = (date.getDate()<10?'0':'') + date.getDate()
    const month = ((date.getMonth() + 1) <10?'0':'') + (date.getMonth() + 1)

    this.raffleLink = this.$props.raffle.ReleaseName.replace(/\s/g, '')
    this.raffleDate = `${hours}.${minutes} / ${day}.${month}`
    this.raffleStatus = this.$props.raffle.Active
  }
}
</script>