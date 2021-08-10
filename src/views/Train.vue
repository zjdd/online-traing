<template>
  <v-container>
    <info-card v-for="i in 12" :key="i" />
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
