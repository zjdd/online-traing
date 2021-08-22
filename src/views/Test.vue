<template>
  <v-container>
    <v-row justify="center" align="center" v-for="(test, i) in tests" :key="i">
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <info-card :test_id="test" />
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
    };
  },
  mounted() {
    this.load_tests();
  },
  methods: {
    async load_tests() {
      await this.axios.get("/tests").then((res) => {
        this.tests = res.data.tests;
      });
    },
  },
  components: {
    InfoCard,
  },
};
</script>
