<template>
  <v-container fluid >
    <v-row class="text-center"    >
      <v-col cols="12">
        <v-sheet height="64" :width="$vuetify.breakpoint.xs ? '463': '1250' " class="mx-auto">
            <v-toolbar
            flat
            >
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="prev"
                >
                    <v-icon small>
                    mdi-chevron-left
                    </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-btn
                    fab
                    text
                    small
                    color="grey darken-2"
                    @click="next"
                >
                    <v-icon small>
                    mdi-chevron-right
                    </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                    <v-chip color="green" dark>A </v-chip>
                    <v-chip color="orange" class="mx-1" dark>B</v-chip>
                    <v-chip color="blue" dark>C </v-chip>

                <v-spacer></v-spacer>
                <v-menu
                    bottom
                    right
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        outlined
                        color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>
                        mdi-menu-down
                        </v-icon>
                    </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="type = 'day'">
                            <v-list-item-title>일</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                            <v-list-item-title>주</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                            <v-list-item-title>월</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </v-sheet>
        <v-sheet height="740"  :width="$vuetify.breakpoint.xs ? '453': '1250' " class="mx-auto">
            <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="reservations"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
            />
            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
            >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                    <v-toolbar
                    :color="selectedEvent.color"
                    dark
                    >
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                    <p>성함  : {{selectedEvent.name}}</p>
                    <p>스튜디오 : {{colorToRoom(selectedEvent.color)}} ROOM</p>
                    <p>시작시간 : {{selectedEvent.start}}</p>
                    <p>종료시간 : {{selectedEvent.end}}</p>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                    >
                        확인
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import schedule from '../services/schedule'

  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: '월',
        week: '주',
        day: '일',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,

      reservations:[],
    }),

    created() {
      this.getSchedule()
    },

    mounted () {
      this.$refs.calendar.checkChange()
    },

    methods: {
      async getSchedule(){
          try {
            let result = await schedule.status()

            this.reservations = result

          } catch (e) {
            console.error(e)
          }
      },

      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },

      colorToRoom(color){
        let room
        switch(color){
            case 'green' :
                room = 'A'
                break;
            case 'orange' :
                room = 'B'
                break;
            case 'blue' :
                room = 'C'
                break;
        }
        return room
      },
    },
  }
</script>