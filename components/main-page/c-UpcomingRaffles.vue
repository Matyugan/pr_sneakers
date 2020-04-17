<template lang="pug">
  section.section.section-upcoming-raffles
    .container
      h2.section-title.section-title_center Upcoming raffles
      .raffles.grid.grid-3.grid--md-2.grid--sm-1(v-if="getRaffles.length === 0")
        .raffles-item
          img(src="https://sneakerdraws.com/images/releases/nikedunk.jpg", alt="Sneakers").raffles-item--image
          .raffles-item--time
            span.raffles-item--date 10.00 / 14.03
            span.raffles-item--date-separator
            span.raffles-item--status.raffles-item--status_disable Closed
          nuxt-link(to="/").raffles-item--name Nike SB Dunk Low Pro "Safari"
          .raffles-item--price $100
        .raffles-item
          img(src="https://sneakerdraws.com/images/releases/nikedunk.jpg", alt="Sneakers").raffles-item--image
          .raffles-item--time
            span.raffles-item--date 10.00 / 14.03
            span.raffles-item--date-separator
            span.raffles-item--status.raffles-item--status_disable Closed
          nuxt-link(to="/").raffles-item--name Nike SB Dunk Low Pro "Safari"
          .raffles-item--price $100
        .raffles-item
          img(src="https://sneakerdraws.com/images/releases/nikedunk.jpg", alt="Sneakers").raffles-item--image
          .raffles-item--time
            span.raffles-item--date 10.00 / 14.03
            span.raffles-item--date-separator
            span.raffles-item--status.raffles-item--status_disable Closed
          nuxt-link(to="/").raffles-item--name Nike SB Dunk Low Pro "Safari"
          .raffles-item--price $100
      .raffles.grid.grid-3.grid--md-2.grid--sm-1(v-if="getRaffles.length > 0")
        c_RafflesItem(
          v-for="(item, index) in getRaffles" 
          :raffle="item"
          :key="index"
          )
      .raffles-button-wrapper
        nuxt-link(to="/raffles").button.button_transparent.raffles-button All raffles
</template>

<script>
import c_RafflesItem from '../common/c-RafflesItem'
export default {
  name: 'c_UpcomingRaffles',

  components: {
    c_RafflesItem
  },

  computed: {
    getRaffles() {
      return this.$store.getters.getRaffles
    }
  },
  mounted() {
    this.$store.dispatch('raffles')
  }
}
</script>