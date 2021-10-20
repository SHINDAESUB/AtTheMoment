<template>
  <v-container >
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="reservation"
        :search="search"
        item-key="uid"
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
                    New Item
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
                            v-model="editedItem.name"
                            label="이름"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.phone"
                            label="연락처"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.startTime"
                            label="시작 시간"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.endTime"
                            label="종료 시간"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.room"
                            label="스튜디오"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.use"
                            label="입금확인"
                          ></v-text-field>
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
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">예약 삭제 하시겠습니까?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">취소</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">확인</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item  }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
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

        editedIndex: -1,
        editedItem: {
          name: '',
          phone: '',
          startTime: '',
          endTime: '',
          room: 'A',
          use:false,
        },
        defaultItem: {
          name: '',
          phone: '',
          startTime: '',
          endTime: '',
          room: 'A',
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
          { text: '시작 시간', value: 'startTime'},
          { text: '종료 시간', value: 'endTime' },
          { text: '스튜디오', value: 'room' },
          { text: '입금 확인', value: 'use' },
          { text: '변경', value: 'actions' },
        ]
      },

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
            let result = await schedule.list()
            this.reservation = result
          } catch (e) {
            console.error(e)
          }
      },
    
      editItem (item) {
        this.editedIndex = this.reservation.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.reservation.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
          try {
            let result = await schedule.delete(this.editedIndex)
            if(result) this.reservation.splice(this.editedIndex, 1)
          } catch (e) {
            console.error(e)
          }finally{
            this.closeDelete()
          }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.reservation[this.editedIndex], this.editedItem)
        } else {
          try {
            let result = await schedule.add(this.editedItem)
            if(result) this.reservation.push(this.editedItem)
          } catch (e) {
            console.error(e)
          }
        }
        this.close()
      },
    }
  }
</script>