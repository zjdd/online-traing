<template>
  <v-menu offset-y bottom right min-width="160" transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.path" @click="click(item)">
        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <v-list-item-icon v-if="item.icon">
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "AccountIconMenu",
  data() {
    return {
      items: [
        {
          path: "/home",
          title: "用户信息",
          icon: "mdi-account-circle",
        },
        {
          path: "/login",
          title: "退出登录",
          icon: "mdi-logout-variant",
        },
      ],
    };
  },
  methods: {
    click(item) {
      if (this.$router.currentRoute.path !== item.path) {
        if (item.path === "/login") {
          this.$store.commit("del_token");
        }
        this.$router.replace(item.path);
      }
    },
  },
};
</script>

<style scoped></style>
