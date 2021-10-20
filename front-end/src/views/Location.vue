<template>
  <v-container fluid >
    <v-row class="text-center"    >
      <v-col cols="12">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.662575285157!2d126.75860371564659!3d37.49228823613382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7d21fbec4aeb%3A0xd549c60e60aa33c0!2z6rK96riw64-EIOu2gOyynOyLnCDsm5Drr7jqtawg7IOB64-ZIDIyNi00!5e0!3m2!1sko!2skr!4v1634710005925!5m2!1sko!2skr" :height="$vuetify.breakpoint.xs ? '450px': '600px' " :width="$vuetify.breakpoint.xs ? '453': '1250'"  style="border:0;" allowfullscreen="" loading="lazy" ></iframe>
        <div>주소 : 경기도 부천시 원미구 상동 226-4 5층</div>
        <br/>
        <div class="title font-weight-bold"> 오시는 방법</div>
        <br/>
        <p><v-icon>mdi-subway-variant</v-icon>: 1호선 송내역 , 중동역</p>
        <p><v-icon>mdi-bus</v-icon>:  661 번 , 19 번 ,70-3 번 , 8 번 , 53 번</p>
        <p><v-icon>mdi-walk</v-icon>: 송내역 에서 16분 , 중동역 에서 13분 </p>
        <div>&#12685; 주차공간이 협소합니다. </div>
      </v-col>
    </v-row>
  </v-container>
</template>