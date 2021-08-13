<template>
  <v-container>
    <v-row justify="center" v-for="i in 1" :key="i">
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <info-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InfoCard from "../components/TrainInfoCard";

export default {
  data() {
    return {
      show: false,
    };
  },
  components: {
    InfoCard,
  },
};
</script>
