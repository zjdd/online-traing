<template>
  <v-container class="px-0 py-0">
    <Header />
    <router-view />
  </v-container>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
  },
};
</script>
