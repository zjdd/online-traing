<template>
  <v-app>
    <Header />
    <v-container>
      <v-main>
        <v-slide-x-transition mode="out-in">
          <router-view />
        </v-slide-x-transition>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    Header,
  },
};
</script>
