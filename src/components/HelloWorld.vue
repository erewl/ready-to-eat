<template>
  <v-container>
    <v-row>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="startTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field v-model="startTime" label="Startzeit" readonly v-on="on"></v-text-field>
        </template>
        <v-time-picker
          v-if="menu1"
          format="24hr"
          v-model="startTime"
          full-width
          @click:minute="setTime(startTime, $refs.menu1)"
        ></v-time-picker>
      </v-menu>
    </v-row>

    <v-row>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="endTime"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field v-model="endTime" label="Endzeit" readonly v-on="on"></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          format="24hr"
          v-model="endTime"
          full-width
          @click:minute="setTime(endTime, $refs.menu2)"
        ></v-time-picker>
      </v-menu>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-subheader>Backzeit</v-subheader>
      </v-col>
      <v-col cols="5">
        <v-text-field label="hh:mm" v-model="duration" type="time" suffix="Dauer"></v-text-field>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>
    <h2>Setze den Timer auf</h2>
    <p>{{calculateBakingTimer()}}</p>
  </v-container>
</template>

<script>
let date = new Date();

export default {
  name: "HelloWorld",
  data: () => ({
    duration: "00:18",
    startTime: date.getHours() + ":" + date.getMinutes(),
    endTime: "05:25",
    menu1: false,
    menu2: false
  }),
  methods: {
    calculateBakingTimer: function() {
      let startTimes = this.startTime.split(":").map(x => Number(x));
      let endTimes = this.endTime.split(":").map(x => Number(x));
      let durationTimes = this.duration.split(":").map(x => Number(x));
      let s = new Date();
      s.setHours(startTimes[0]);
      s.setMinutes(startTimes[1]);

      let t = new Date();
      t.setHours(endTimes[0]);
      t.setMinutes(endTimes[1]);
      if (endTimes[0] - startTimes[0]) t.setDate(t.getDate() + 1);
      // return bakingHours +":"+ bakingMinutes;
      var ms = (t - s) - (durationTimes[0]*60*60*1000) - (durationTimes[1]*60*1000);
      let hours = Math.floor(ms / (1000*60*60));
      let minutes = Math.floor((ms-(hours*1000*60*60)) / 60000);

      return hours.toString().padStart(2, '0') +":"+minutes.toString().padStart(2, '0');
    },
    setTime: function(time, reference) {
      reference.save(time);
      this.calculateBakingTimer();
    }
  }
};
</script>
