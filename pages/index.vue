<template lang="pug">
  main.main.main-page
    c_HeroBanner
    c_UpcomingRaffles
    c_ApplicationInfo
    c_AppMobile
</template>

<script>
import c_HeroBanner from '../components/main-page/c-HeroBanner'
import c_UpcomingRaffles from '../components/main-page/c-UpcomingRaffles'
import c_ApplicationInfo from '../components/main-page/c-AppInfo'
import c_AppMobile from '../components/main-page/c-AppMobile'

export default {
  components: {
    c_HeroBanner,
    c_UpcomingRaffles,
    c_ApplicationInfo,
    c_AppMobile
  }
}
</script>
