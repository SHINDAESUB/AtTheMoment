<template>
  <v-container >
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="검색"
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="reservation"
        :search="search"
        item-key="uid"
        :sort-by="'uid'"
        :sort-desc="true"
      >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    예약 추가
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedReservation.name"
                            label="이름"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedReservation.phone"
                            label="연락처"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedReservation.startDate"
                            type="date"
                            label="예약날짜"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedReservation.startTime"
                            type="time"
                            label="예약시간"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedReservation.useTime"
                            type="number"
                            label="이용시간"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-select
                              v-model="editedReservation.room"
                              :items="rooms"
                              label="스튜디오"
                              required
                          ></v-select>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-checkbox
                            v-model="editedReservation.use"
                            label="입금 확인"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      취소
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      저장
                    </v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="400px">
              <v-card>
                <v-card-title class="text-h6">삭제 하시겠습니까?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">확인</v-btn>
                  <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.use`]="{ item }">
          <v-checkbox
            v-model="item.use"
            @click="updateUseItem(item)"
          ></v-checkbox>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            color="primary"
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="error"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import schedule from '../services/schedule'

  export default {
    data () {
      return {
        search: '',
        reservation: [],

        dialog: false,
        dialogDelete: false,
        rooms: [
          'A',
          'B',
          'C',
        ],

        editedIndex: -1,
        editedReservation: {
          name: '',
          phone: '',
          room: null,
          startDate: '',
          useTime: 1,
          startTime: null,
          use:false,
        },
        defaultReservation: {
          name: '',
          phone: '',
          room: null,
          startDate: '',
          useTime: 1,
          startTime: null,
          use:false,
        },

      }
    },

    created() {
      this.getSchedule()
    },

    computed: {
      headers () {
        return [
          { text: '이름', align: 'start', sortable: false, value: 'name'},
          { text: '연락처', value: 'phone'},
          { text: '예약 날짜', value: 'startDate'},
          { text: '예약 시간', value: 'startTime' },
          { text: '이용 시간', value: 'useTime' },
          { text: '스튜디오', value: 'room' },
          { text: '요금 확인', value: 'use' },
          { text: '액션', value: 'actions' },
        ]
      },

      formTitle () {
        return this.editedIndex === -1 ? '예약 추가' : '예약 변경'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods:{
      async getSchedule(){
          try {
            let result = await schedule.schedule()
            this.reservation = result
          } catch (e) {
            console.error(e)
          }
      },

      async updateSchedule(){
          try {
            let result = await schedule.schedule()
            this.reservation = result
          } catch (e) {
            console.error(e)
          }
      },

      editItem(item) {
        this.editedIndex = this.reservation.indexOf(item)
        this.editedReservation = Object.assign({}, item)
        this.dialog = true
      },

      updateUseItem(updateReservation){
        this.editedIndex = this.reservation.indexOf(updateReservation)
        this.editedReservation = Object.assign({}, updateReservation)
        this.updateConfirm(this.editedIndex ,this.editedReservation )
      },

      deleteItem (item) {
        this.editedIndex = this.reservation.indexOf(item)
        this.editedReservation = Object.assign({}, item)
        this.dialogDelete = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedReservation = Object.assign({}, this.defaultReservation)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedReservation = Object.assign({}, this.defaultReservation)
          this.editedIndex = -1
        })
      },

      async updateConfirm(index , updateReservation){
        try {
          let result = await schedule.update(index , updateReservation)
          if(result.status !== 200) throw new Error(result)
          Object.assign(this.reservation[index], updateReservation)
          alert('변경 완료')
        } catch (e) {
          alert(`변경 실패 \n${e}`)
        }
      },

      async deleteItemConfirm() {
          try {
            let result = await schedule.delete(this.editedIndex)
            if(result.status !== 200) throw new Error(result)
            this.reservation.splice(this.editedIndex, 1)
            alert('변경 완료')
          } catch (e) {
            alert(`변경 실패 \n${e}`)
          }finally{
            this.closeDelete()
          }
      },

      async addItemConfirm(reservation) {
          try {
            let result = await schedule.add(reservation)
            if(result.status !== 200) throw new Error(result)
            this.reservation.push(result.data)
          } catch (e) {
            console.error(e)
          }
      },

      async save () {
        if (this.editedIndex > -1) {
          this.updateConfirm(this.editedIndex ,this.editedReservation )
        } else {
          this.addItemConfirm(this.editedReservation)
        }
        this.close()
      },
    }
  }
</script>