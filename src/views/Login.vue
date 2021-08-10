<template>
  <v-container fill-height fluid>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/zjdd/online-training"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row align="center" justify="center">
      <v-col sm="12" md="4" xl="4" lg="4">
        <v-card :loading="loading">
          <v-progress-linear
            class="px-0 py-0"
            slot="progress"
            indeterminate
          ></v-progress-linear>
          <div class="px-5 py-5">
            <v-card-subtitle class="display-1"> 注册/登陆 </v-card-subtitle>
            <v-text-field
              label="用户名"
              outlined
              prepend-icon="mdi-account"
              v-model="login_form.username"
              :rules="[rules.username_required]"
            />
            <v-text-field
              label="密码"
              outlined
              prepend-icon="mdi-lock"
              v-model="login_form.password"
              :rules="[rules.password_required]"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            />
            <v-btn block large color="primary" @click.stop="login">登录</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from "qs";

export default {
  name: "Login",
  data() {
    return {
      show: false,
      loading: false,
      //   username_rules: [],
      //   password_rules: [],
      login_form: {
        username: "",
        password: "",
      },
      rules: {
        username_required: (value) => !!value || "用户名不能为空",
        password_required: (value) => !!value || "密码不能为空",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      if (!!this.login_form.username && !!this.login_form.password) {
        this.loading = true;
        this.$axios
          .post("/auth/token", qs.stringify(this.login_form))
          .then((res) => {
            if (res.status === 200) {
              this.$store.commit("set_token", res.data["access_token"]);
              this.$router.push("/");
            }
          })
          .catch((e) => {
            if (e.response) {
              if (e.response.status === 401) alert("用户名或密码错误");
              else alert("登陆失败");
              this.loading = false;
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
