<template lang="pug">
  section.section.section-app-info
    .container
      .app-info.grid.grid-2.grid--md-1
        .app-info-work
          h3.section-title.section-title_left How it works?
          .app-info-work--item(v-for="(item, index) in workItems")
            .app-info-work--item-number {{ index + 1 }}
            .app-info-work--item-description(v-html="item.description")
        .app-info-about-us
          h3.section-title.section-title_left About us
          p.app-info-about-us--text We strive to help shoe lovers get kicks they want by empowering retailers through simplifying “huge” things like raffles, events and etc. We want you to say: ”Release days have never been so smooth & W-easy.”
          img(class="app-info-about-us--image" src="../../static/images/main-page/img_app-info.png", alt="app-info")
</template>

<script>
export default {
  name: 'AppInfo',
  data() {
    return {
      workItems: [
        { description: 'Create an account. <br> It takes less then a minute.' },
        { description: 'Find a shoe you want <br> in upcoming raffles' },
        { description: 'Sign up for the raffle by selecting <br> your size and a store for pick-up ' },
        { description: 'If you get that W, you’ll be notified <br> via email prior to the release day' },
        { description: 'Pick up the shoe at the selected store. <br> Rock your new kicks!' }
      ]
    }
  }
}
</script>