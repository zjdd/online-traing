<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <v-img
          v-show="!done"
          lazy-src="../assets/test.jpg"
          :src="question_img_url"
        ></v-img>
        <v-carousel hide-delimiters v-show="done" height="auto">
          <v-carousel-item>
            <v-img
              lazy-src="../assets/test.jpg"
              :src="question_img_url"
            ></v-img>
          </v-carousel-item>
          <v-carousel-item>
            <v-img lazy-src="../assets/test.jpg" :src="answer_img_url"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <!--      <v-col cols="4" sm="8" md="6" xl="6" lg="6">-->
      <!--      </v-col>-->
      <v-col sm="12" md="4" xl="4" lg="4">
        <p>{{ question_text }}</p>
        <v-radio-group v-model="selected_value">
          <v-radio
            v-for="(option, i) in options"
            :key="i"
            :color="color"
            :label="option.label"
            :value="option.value"
            :readonly="done"
          >
          </v-radio>
        </v-radio-group>
        <v-divider />
        <p v-show="done">答案是{{ answer_value }}</p>
        <v-btn
          @click="
            get_question_id();
            selected_value = '';
            done = !done;
          "
          v-show="done"
          >next</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selected_value: "",
      color: "primary",
      question_text: "",
      done: false,
      options: [],
      answer_value: "",
      question_img_url: "",
      answer_img_url: "",
    };
  },
  mounted() {
    this.get_question_id();
  },
  methods: {
    async get_question_id() {
      this.axios
        .get("/question_id")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            return res.data["question_id"];
          }
        })
        .then((id) => {
          this.load_question(id);
        });
    },
    load_question(id) {
      this.axios
        .get("/question", {
          params: { question_id: id },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("****" + id);
            let data = res.data;
            this.question_text = data["text"];
            this.options = data["options"];
            this.answer_value = data["answer"];
            this.question_img_url =
              this.$axios.defaults.baseURL +
              "/img/" +
              data["question_img_token"];
            this.answer_img_url =
              this.$axios.defaults.baseURL + "/img/" + data["answer_img_token"];
          }
        });
    },
    show_answer() {
      this.done = true;
      if (this.selected_value === this.answer_value) {
        this.color = "success";
      } else {
        this.color = "error";
      }
    },
  },
  watch: {
    selected_value: {
      handler(newValue) {
        if (newValue) this.show_answer();
      },
    },
  },
};
</script>
