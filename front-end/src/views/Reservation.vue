<template>
    <v-container >
        <v-card
            width="1250"
            class="mx-auto px-2 elevation-0 pa-2"
            height="100%"
            outlined
        >
            <form >
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="입금자 성함 / 상호명 "
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="phone"
                    :error-messages="phoneErrors"
                    label="연락처"
                    required
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="startDate"
                    :error-messages="startDateErrors"
                    label="예약 날짜"
                    type="date"
                    required
                    @input="$v.startDate.$touch()"
                    @blur="$v.startDate.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="startTime"
                    :error-messages="startTimeErrors"
                    label="예약 시간"
                    type="time"
                    required
                    @input="$v.startTime.$touch()"
                    @blur="$v.startTime.$touch()"
                ></v-text-field>
                <v-text-field
                    v-model="useTime"
                    :error-messages="useTimeErrors"
                    label="이용 시간"
                    type="number"
                    min="1"
                    max="5"
                    required
                    @input="$v.useTime.$touch()"
                    @blur="$v.useTime.$touch()"
                ></v-text-field>
                <v-select
                    v-model="room"
                    :items="rooms"
                    :error-messages="roomsErrors"
                    label="스튜디오"
                    required
                    @change="$v.room.$touch()"
                    @blur="$v.room.$touch()"
                ></v-select>
                <p class="font-weight-black">주의 사항</p>
                <p class="subtitle-2">&#12685; 예약 취소 / 변경은 최소 5일전 까지 해주셔야 하며 이후 취소/변경 시 예약금은 환불 되지 않습니다.</p>
                <p class="subtitle-2">&#12685; 문의는 <strong>010-4444-4444</strong>문자 또는 오픈 채팅으로 부탁드립니다. </p>
                <p class="subtitle-2">&#12685; 입금확인 후 '<strong>예약확인</strong>' 메뉴에서 가능합니다. </p>
                <v-checkbox
                    v-model="checkbox"
                    :error-messages="checkboxErrors"
                    label="주의사항 확인"
                    required
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                ></v-checkbox>
                
                <v-btn
                    class="mr-4 "
                    color="primary"
                    block
                    @click="submit"
                >
                  신청
                </v-btn>
            </form>
        </v-card>
    </v-container>
</template>

<script>
  import schedule from '../services/schedule'

  import { validationMixin } from 'vuelidate'
  import { required, maxLength ,numeric } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      phone: { required },
      room: { required },
      startDate: { required },
      useTime: { required ,numeric },
      startTime:{required },
      checkbox: {
        checked (val) {
          return val
        },
      },

    },

    data: () => ({
      name:'',
      phone:'',
      room: null,
      startDate:'',
      startTime:'',
      useTime:1,
      rooms: [
        'A',
        'B',
        'C',
      ],
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('확인 후 눌러주세요')
        return errors
      },
      roomsErrors () {
        const errors = []
        if (!this.$v.room.$dirty) return errors
        !this.$v.room.required && errors.push('스튜디오를 선택해주세요')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('최소 10 자 이상 적어주세요')
        !this.$v.name.required && errors.push('입력해주세요')
        return errors
      },
      startDateErrors () {
        const errors = []
        if (!this.$v.startDate.$dirty) return errors
        !this.$v.startDate.required && errors.push('입력해주세요')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) return errors
        !this.$v.phone.required && errors.push('입력해주세요')
        return errors
      },
      startTimeErrors () {
        const errors = []
        if (!this.$v.startTime.$dirty) return errors
        !this.$v.startTime.required && errors.push('입력해주세요')
        return errors
      },

      useTimeErrors () {
        const errors = []
        if (!this.$v.useTime.$dirty) return errors
        !this.$v.useTime.numeric && errors.push('숫자만 입력 가능합니다.')
        !this.$v.useTime.required && errors.push('입력해주세요')
        return errors
      },

    },

    methods: {
      async submit () {
        this.$v.$touch();

        if(process.env.VUE_APP_ADMIN === this.name && process.env.VUE_APP_PHONE === this.phone )  this.$router.push('user' )

        if (this.$v.$invalid) {
          return;
        }else{
          let reservation = { 'name':this.name , 'phone':this.phone , 'room':this.room , 'startDate':this.startDate , 'startTime':this.startTime, 'useTime': this.useTime , 'room': this.room}
          try{
            let response =  await schedule.add(reservation)              
              if(response.status !== 200) throw new Error(response)
              this.clear()
              alert('신청 되었습니다. \n입금확인 후 연락 드리겠습니다.')
            }catch(e){
              alert(`서버에 문제가 발생했습니다 \n카카오톡으로 문의 주시면 감사하겠습니다. \n${e}`)
            }

          }
      },

      clear () {
        this.$v.$reset()
        this.name = ''
        this.phone = ''
        this.room = null
        this.startDate = ''
        this.useTime = 1
        this.startTime = null
        this.checkbox = false
      },
    },
  }
</script>