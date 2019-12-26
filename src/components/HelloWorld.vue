<template>
  <v-container>
    <h2>Randzeiten</h2>
    <v-col cols="5" class="d-inline-flex pa-2">
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
    </v-col>

    <v-col cols="5" class="d-inline-flex pa-2"> 
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
    </v-col>

    <v-col>
        <h2>Backzeit</h2>
      <v-col cols="5">
        <v-text-field label="hh:mm" v-model="duration" type="time" suffix="Dauer"></v-text-field>
      </v-col>
    </v-col>

    <v-spacer></v-spacer>
    <h2>Setze den Timer auf</h2>
    <h1 class=".display-3">{{calculateBakingTimer()}}</h1>
  </v-container>
</template>

<script>
let date = new Date();

export default {
  name: "HelloWorld",
  data: () => ({
    duration: "00:18",
    startTime: date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0"),
    endTime: "05:25",
    menu1: false,
    menu2: false
  }),
  methods: {
    calculateBakingTimer: function() {
      let startTimes = this.getTimeArray(this.startTime);
      let endTimes = this.getTimeArray(this.endTime);
      let durationTimes = this.getTimeArray(this.duration);

      let s = this.setDate(startTimes);
      let t = this.setDate(endTimes);

      if (endTimes[0] - startTimes[0]) t.setDate(t.getDate() + 1);
      var ms = t - s - durationTimes[0] * 60 * 60 * 1000 - durationTimes[1] * 60 * 1000;
      let hours = Math.floor(ms / (1000 * 60 * 60));
      let minutes = Math.floor((ms - hours * 1000 * 60 * 60) / 60000);

      return this.createTimeString(hours, minutes);
    },
    setTime: function(time, reference) {
      reference.save(time);
      this.calculateBakingTimer();
    },
    getTimeArray: function(timeString) {
      return timeString.split(":").map(x => Number(x));
    },
    setDate: function(timeArray) {
      let s = new Date();
      s.setHours(timeArray[0]);
      s.setMinutes(timeArray[1]);
      return s;
    },
    createTimeString: function(hours, minutes) {
      return (
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0")
      );
    }
  }
};
</script>
