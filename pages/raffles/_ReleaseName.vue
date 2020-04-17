<template lang="pug">
  main.main.item-page
    section.section.section-raffles-item-card
      .container(v-show="raffle.ReleaseName")
        .raffles-item-card.grid.grid-2.grid--md-1
          .raffles-item-card--image-wrapper
            img(class="raffles-item-card--image" :src="raffle.Picture", alt="raffles")
          .raffles-item-card--description
            h1.raffles-item-card--title {{ raffle.ReleaseName }}
            .raffles-item-card--price-wrapper
              h2.raffles-item-card--price $100
              select.raffles-item-card-shop--size(name="select" @change="checkLotID($event)")
                option.raffles-item-card-shop--size-item(hidden default) Select your size
                option.raffles-item-card-shop--size-item(v-for="sizeSneakers in sizes" :key="sizeSneakers.id" :data-id="sizeSneakers.id") {{`${sizeSneakers.size} (${sizeSneakers.set})`}}

            h3.raffles-item-card--subtitle Shops available for raffle:

            .raffles-item-card-shop
              .raffles-item-card-shop--item-wrapper(v-for="shop in raffle.Shops")
                .raffles-item-card-shop--item(v-if="shop.TakePart" :class="{'raffles-item-card-shop--item-registered' : shop.TakePart}")
                  .raffles-item-card-shop--item-inner
                    input(class="raffles-item-card-shop--checkbox" type="checkbox" disabled="disabled" :name="`shop-${shop.ShopID}`" :id="`shop-${shop.ShopID}`" value="shop-1")
                    label(class="raffles-item-card-shop--checkbox-label" :for="`shop-${shop.ShopID}`")
                    .raffles-item-card-shop--address
                      .raffles-item-card-shop--name {{ shop.Shop }} 
                      .raffles-item-card-shop--city {{ shop.PickupLocation}}
                      .raffles-item-card-shop--registered-message Enter
                .raffles-item-card-shop--item(v-else :class="shop.Shop === checkShops ? 'raffles-item-card-shop--item-inner_active' : 'raffles-item-card-shop--item-inner_disabled'")
                  .raffles-item-card-shop--item-inner
                    input(class="raffles-item-card-shop--checkbox" type="checkbox" :disabled="shop.Shop !== checkShops" :name="`shop-${shop.ShopID}`" :id="`shop-${shop.ShopID}`" value="shop-1")
                    label(class="raffles-item-card-shop--checkbox-label" :for="`shop-${shop.ShopID}`")
                    .raffles-item-card-shop--address
                      .raffles-item-card-shop--name {{ shop.Shop }} 
                      .raffles-item-card-shop--city {{ shop.PickupLocation}}

              .raffles-item-card-shop--register
                button.button.button_color(@click="registerLot" :disabled="!lotID") Register
    modalRegisterLot(:FirstName="FirstName" :LastName="LastName" :NationalID="NationalID" v-if="checkUserData" v-on:closeModal="closeModal")
</template>

<script>
import modalRegisterLot from '../../components/common/c-modalRegisterLot'
export default {
  middleware: ['auth'],
  name: 'Item',
  components: {
    modalRegisterLot
  },
  data: () => ({
    size: 'Select your size',
    lotID: null,
    checkUserData: false,
    FirstName: null,
    LastName: null,
    NationalID: null
  }),
  computed: {
    raffle() {
      return this.$store.getters.getRaffle(this.$route.params.ReleaseName)
    },
    sizes() {
      //Проверяем прилетил ли массив
      if(this.raffle.Shops !== undefined) {
        //Возвращаем массив магазинов у которых есть поле Sizes (Sizes у лотов которые не зарегестрированы пользователем)
        const activeShops = this.raffle.Shops.filter((shop) => {
          return shop.Sizes
        })

        //Создаем массив объектов для выборки в Select
        let sizes = []

        activeShops.forEach((shop) => {
          shop.Sizes.forEach(size => {
            sizes.push({
              id: size.LotID,
              size: size.Size,
              set: size.Set
            })
          })
        })

        return sizes
      }
    },
    checkShops() {
      // Проверяем выбранный лот и возвращаем имя магазина в котором он есть
      if(this.lotID) {
        const shops = this.raffle.Shops
        let currentMagazine = null

        shops.forEach((shop) => {
          if(shop.Sizes !== undefined) {
            shop.Sizes.find((lot) => {
              if(lot.LotID == this.lotID) return currentMagazine = shop.Shop
            })
          }
        })
        return currentMagazine
      }
    },
    getUser() {
      return this.$store.getters.getUser
    }
  },
  mounted() {
    this.$store.dispatch('raffles')
  },
  methods: {
    checkLotID(event) {
      this.lotID = event.target.selectedOptions[0].dataset.id
    },
    registerLot() {
      const lotID = this.lotID
      if(this.getUser.FirstName !== null && this.getUser.LastName !== null && this.getUser.NationalIDNumber !== null) {
        this.$store.dispatch('registerLot', lotID)
        .then((response) => {
          this.$router.push('/')
        })
      }
      else this.checkUserData = true
    },
    closeModal() {
      this.checkUserData = false
    }
  }
}
</script>