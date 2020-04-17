<template lang="pug">
  section.section.section-other-raffles
    .container
      h2.section-title.section-title_center Other raffles
      .other-raffles.grid.grid-3.grid--sm-2
        c_RafflesItem(v-for="(item, index) in getRaffles" :key="index" :raffle="item")
      .raffles-button-wrapper
        button.button.button_transparent All raffles
</template>

<script>
import c_RafflesItem from '../../components/common/c-RafflesItem'

export default {
  name: 'OtherRaffles',
  components: {
    c_RafflesItem
  },
  computed: {
    getRaffles() {
      return this.$store.getters.getRaffles
    }
  }
}
</script>