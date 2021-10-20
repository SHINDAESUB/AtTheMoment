<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
      class="elevation-0 "
      fixed
    > 

      <v-app-bar-nav-icon 
        v-if="$vuetify.breakpoint.xsOnly"
        @click="drawer = true"/>
        
      <v-toolbar-title class="title font-weight-bold" @click="$router.push('/')">A.T.M</v-toolbar-title>
      <v-spacer/>
      <v-btn-toggle
        v-if="!$vuetify.breakpoint.xs"
        v-model="text"
        text
        color="deep-purple accent-3 "
        group
      >
        <v-btn value="left" class="subtitle-1 font-weight-bold" to="/guide">
          이용안내
        </v-btn>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              value="center" class="subtitle-1 font-weight-bold"
            >
              스튜디오
            </v-btn>
          </template>
          <v-list  >
            <v-list-item link to="/aroom">
              <v-list-item-title >A ROOM</v-list-item-title>
            </v-list-item >
            <v-list-item link to="/broom">
              <v-list-item-title>B ROOM</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/croom">
              <v-list-item-title>C ROOM</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn value="right" class="subtitle-1 font-weight-bold" to="/schedule">
          예약현황
        </v-btn>

        <v-btn value="justify" class="subtitle-1 font-weight-bold" to="/reservation">
          예약신청
        </v-btn>

        <v-btn value="justify2" class="subtitle-1 font-weight-bold" to="/location">
          위치
        </v-btn>
      </v-btn-toggle>
      <v-spacer/>
      <v-btn color="grey" icon ><v-icon>
        mdi-instagram
        </v-icon>  </v-btn>

    </v-app-bar>


    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list
        nav
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link to="/guide">
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-title>이용안내</v-list-item-title>
          </v-list-item>

          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-home-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>스튜디오</v-list-item-title>
            </template>
              <v-list-item link to="/aroom">
                <v-list-item-title> A Room</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/broom">
                <v-list-item-title> B Room</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/croom">
                <v-list-item-title> C Room</v-list-item-title>
              </v-list-item>
            </v-list-group>

          <v-list-item link to="/schedule">
            <v-list-item-icon>
              <v-icon>mdi-calendar-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>예약현황</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/reservation">
            <v-list-item-icon>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>예약신청</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/location">
            <v-list-item-icon>
              <v-icon>mdi-map-marker-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>위치</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  <v-footer 

  absolute
    padless 
    app
    color="white"
  >
    <v-col
      class="text-center"
      cols="12"
      dark
    >
      {{ new Date().getFullYear() }} — <strong>흥해라 정처럴러러</strong>
    </v-col>
  </v-footer>
    <v-fab-transition>
      <v-btn
        color="yellow"
        fab
        large
        dark
        bottom
        right
        fixed
        
      >
        <v-img src="../src/assets/kakao.png" height="64" width="64"></v-img>
        <!-- https://webruden.tistory.com/354 -->
      </v-btn>

    </v-fab-transition>
  </v-app>
</template>

<script>
import Header from '../src/components/Header.vue'

export default {
  name: 'App',

  data: () => ({
    group:null,
    drawer: null,
          items: [
        { title: 'A ROOM' },
        { title: 'B ROOM' },
        { title: 'C ROOM' },
      ],
      text: null, 


      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],

  }),

  components:{
    Header
  },

};
</script>
