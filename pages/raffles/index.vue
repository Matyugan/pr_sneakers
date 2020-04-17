<template lang="pug">
  section.section-all-raffles
    .container
      .raffles.grid.grid-3.grid--md-2.grid--sm-1
        .raffles-item
          img(src="https://sneakerdraws.com/images/releases/nikedunk.jpg", alt="Sneakers").raffles-item--image
          .raffles-item--time
            span.raffles-item--date 10.00 / 14.03
            span.raffles-item--date-separator
            span.raffles-item--status.raffles-item--status_disable Close
          nuxt-link(to="/raffles/NikeSBDunkLowPro\"Safari\"").raffles-item--name Nike SB Dunk Low Pro "Safari"
          .raffles-item--price $100
        .raffles-item
          img(src="https://sneakerdraws.com/images/releases/nikedunk.jpg", alt="Sneakers").raffles-item--image
          .raffles-item--time
            span.raffles-item--date 10.00 / 14.03
            span.raffles-item--date-separator
            span.raffles-item--status.raffles-item--status_disable Close
          nuxt-link(to="/").raffles-item--name Nike SB Dunk Low Pro "Safari"
          .raffles-item--price $100
        .raffles-item
          img(src="https://sneakerdraws.com/images/releases/nikedunk.jpg", alt="Sneakers").raffles-item--image
          .raffles-item--time
            span.raffles-item--date 10.00 / 14.03
            span.raffles-item--date-separator
            span.raffles-item--status.raffles-item--status_disable Close
          nuxt-link(to="/").raffles-item--name Nike SB Dunk Low Pro "Safari"
          .raffles-item--price $100
</template>

<script>
export default {
  middleware: ['auth']
}
</script>