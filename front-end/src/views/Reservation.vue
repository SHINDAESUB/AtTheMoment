<template>
    <v-container >
        <v-card
            width="1250"
            class="mx-auto px-2 elevation-0"
            height="100%"
            outlined
        >
            <form>
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
                    v-model="useTime"
                    :error-messages="useTimeErrors"
                    label="사용 시간"
                    type="time"
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
                    class="mr-4"
                    @click="submit"
                >
                submit
                </v-btn>
                <v-btn @click="clear">
                    clear
                </v-btn>
                <v-spacr/>
            </form>
        </v-card>
    </v-container>
</template>

<script>
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
      checkbox: {
        checked (val) {
          return val
        },
      },

    },

    data: () => ({
      name: '',
      phone: '',
      room: null,
      startDate: '',
      useTime:null,
      rooms: [
        'A Room',
        'B Room',
        'C Room',
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
      useTimeErrors () {
        const errors = []
        if (!this.$v.useTime.$dirty) return errors
        !this.$v.useTime.numeric && errors.push('숫자만 입력 가능합니다.')
        !this.$v.useTime.required && errors.push('입력해주세요')
        return errors
      },

    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.phone = ''
        this.room = null
        this.startDate = ''
        this.useTime = null
        this.checkbox = false
      },
    },
  }
</script>