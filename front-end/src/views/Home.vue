<template>
  <v-container fluid >
    <v-row class="text-center">
      <v-col cols="12">
        <v-carousel
          cycle
          :height="$vuetify.breakpoint.xs ? '325px': '700px' "
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item,i) in main"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <template v-for="(item, i) in card">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              link
              :to="'/'+item.nav"
            >
              <v-img
                :src="item.img"
               :height="$vuetify.breakpoint.xs ? '225px': '325px' "
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left">
                      {{ item.title }}
                    </p>

                    <div>
                      <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                        {{ item.text }}
                      </p>
                      <p class="text-caption font-weight-medium font-italic text-left">
                        {{ item.subtext }}
                      </p>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
      main: [
        {
          src: require("../assets/ex4.jpg"),
        },
        {
          src: require("../assets/ex1.jpg"),
        },
        {
          src: require("../assets/ex2.jpg"),
        },
        {
          src: require("../assets/ex3.jpg"),
        },
      ],

      card: [
        {
          title: 'A ROOM',
          text: `햇빛이 잘 드는 채광`,
          subtext: '제품 사진 , 설명 ,설명',
          img: require("../assets/ex1.jpg"),
          nav:'aroom'
        },
        {
          title: 'B ROOM',
          text: '아늑한 공간',
          subtext: '아아아아앙, 서잔',
          img: require("../assets/ex2.jpg"),
          nav:'broom'
        },
        {
          title: 'C ROOM',
          text: '모던한 공간',
          subtext: '한번 잘잘ㅈㄹ자.',
          img: require("../assets/ex3.jpg"),
          nav:'croom'
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),
  }
</script>

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>