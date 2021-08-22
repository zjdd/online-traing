<template>
  <v-container>
    <v-row
      justify="center"
      align="center"
      v-for="(test, i) in tests"
      :key="'t' + i"
    >
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <info-card :test_id="test" @refresh="load_tests" :done="false" />
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      v-for="(test, i) in done_tests"
      :key="'d' + i"
    >
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <info-card :test_id="test" @refresh="load_tests" :done="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfoCard from "../components/TestInfoCard";
export default {
  data() {
    return {
      tests: [],
      done_tests: [],
    };
  },
  mounted() {
    this.load_tests();
  },
  methods: {
    async load_tests() {
      this.tests = [];
      this.done_tests = [];
      await this.axios.get("/tests").then((res) => {
        this.tests = res.data.tests;
        this.done_tests = res.data.done_tests;
      });
    },
  },
  components: {
    InfoCard,
  },
};
</script>
