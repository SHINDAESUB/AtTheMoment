<template>
  <v-container >
    <v-card
      width="1250"
      class="mx-auto px-2 elevation-0"
      height="100%"
    >
    <v-timeline
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        fill-dot
        icon="mdi-calendar-check-outline"
        color="deep-purple accent-4"
      >
        <v-card
          color="deep-purple darken-1"
        >
          <v-card-title class="text-h6 font-weight-bold white--text">
            예약현황 확인
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>'<strong>예약현황</strong>' 메뉴에 가서 일정을 확인해주세요</p>
            <v-btn
              class="mx-0"
              outlined
              color="deep-purple accent-4"
              to="/schedule"
            >
              예약현황
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        fill-dot
        icon="mdi-calendar-edit"
        color="deep-purple accent-4"
      >
        <v-card
          color="deep-purple darken-1"
        >
          <v-card-title class="text-h6 font-weight-bold white--text">
            예약하기
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>'<strong>예약신청</strong>' 가서 작성 하거나 '<strong>카카오톡</strong>' 으로 문의 해주세요</p>
            <v-btn
              class="mx-0"
              outlined
              color="deep-purple accent-4"
              to="/reservation"
            >
              예약신청
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        fill-dot
        icon="mdi-currency-krw"
        color="deep-purple accent-4"
      >
        <v-card
          color="deep-purple darken-1"
        >
          <v-card-title class="text-h6 font-weight-bold white--text">
            결제
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>
            <p>이용금액 전액을 입금합니다 [신한은행[렌탈스튜디오 어여쁜] : 100-034-725532)] </p>

          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        fill-dot
        icon="mdi-playlist-check"
        color="deep-purple accent-4"
      >
        <v-card
          color="deep-purple darken-1"
        >
          <v-card-title class="text-h6 font-weight-bold white--text">
            입금 확인
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>입금 확인 후 안내 문자 발송 해드립니다.</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>

    </v-timeline> 

    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Guide',

    data: () => ({
      items: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star',
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-book-variant',
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-airballoon',
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
        },
      ],
    }),
  }
  </script>