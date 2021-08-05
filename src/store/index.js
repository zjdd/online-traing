import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    logged_in: false,
    username: "None",
  },
  mutations: {
    set_token(state, token) {
      state.logged_in = true;
      state.token = token;
    },
    del_token(state) {
      state.token = "";
      state.logged_in = false;
    },
    set_username(state, username) {
      state.username = username;
    },
  },
});
