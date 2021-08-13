<template>
  <v-container>
    <v-app-bar color="primary accent-4" dark app clipped-right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>病理培训平台</v-toolbar-title>
      <v-spacer></v-spacer>
      <AccountIconMenu v-if="logged_in" />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary app clipped>
      <v-list class="pt-0">
        <v-list-item-group v-model="selected" active-class="primary--text">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import AccountIconMenu from "./AccountIconMenu";
export default {
  data() {
    return {
      drawer: false,
      selected: 1,
      items: [
        { title: "训练", icon: "mdi-school", to: "/train" },
        { title: "测试", icon: "mdi-ab-testing", to: "/test" },
        { title: "我的", icon: "mdi-home", to: "/home" },
      ],
    };
  },
  components: {
    AccountIconMenu,
  },
  computed: {
    logged_in() {
      console.log(this.$store.state.token === "");
      return !(this.$store.state.token === "");
    },
  },
};
</script>
