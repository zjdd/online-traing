<template>
  <v-container> {{ mm }}:{{ ss }} </v-container>
</template>

<script>
export default {
  props: ["duration"],
  data() {
    return {
      time: 0,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.time = this.duration * 60;
      this.countdown();
      setInterval(this.countdown, 1000);
    },
    countdown() {
      this.time--;
    },
    padding(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
  },
  computed: {
    ss() {
      let ss = this.time % 60;
      return this.padding(ss, 2);
    },
    mm() {
      let mm = Math.floor(this.time / 60);
      return this.padding(mm, 2);
    },
  },
};
</script>
