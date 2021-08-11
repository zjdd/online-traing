<template>
  <v-container>
    <v-app-bar color="primary accent-4" dark app clipped-right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>病理培训平台</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary app clipped>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text">
          <v-list-item>
            <v-list-item-title>我的</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>培训</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>测试</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: 0,
    };
  },
  watch: {
    group: {
      handler(newValue) {
        let tmp_map = {
          0: "/home",
          1: "/train",
          2: "/test",
        };
        this.$router.push(tmp_map[newValue]);
      },
      immediate: true,
    },
  },
};
</script>
