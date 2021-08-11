<template>
  <v-container>
    <v-row class="py-0 px-0">
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <v-card>
          <v-img
            v-show="!done"
            lazy-src="../assets/test.jpg"
            :src="question_img_url"
          ></v-img>
          <v-carousel
            hide-delimiters
            transition="fade-transition"
            reverse-transition="fade-transition"
            v-show="done"
            height="auto"
          >
            <v-carousel-item>
              <v-img
                lazy-src="../assets/test.jpg"
                :src="question_img_url"
              ></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img
                lazy-src="../assets/test.jpg"
                :src="answer_img_url"
              ></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col sm="12" md="6" xl="6" lg="6">
        <v-card class="px-6 py-6">
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
          <v-divider v-show="done" />
          <p v-show="done">答案是{{ answer_value }}</p>
          <v-btn
            @click="
              load_question();
              selected_value = '';
              done = !done;
            "
            v-show="done"
            >next
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      question_id: -1,
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
    this.load_question();
    // this.get_question_id();
  },
  methods: {
    async get_question_id() {
      await this.axios.get("/question_id").then((res) => {
        if (res.status === 200) {
          this.question_id = res.data["question_id"];
        }
      });
    },
    async load_question() {
      await this.get_question_id();
      let question_id = this.question_id;
      await this.axios
        .get("/question", {
          params: { question_id: question_id },
        })
        .then((res) => {
          if (res.status === 200) {
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
    post_result() {
      let data = {
        question_id: this.question_id,
        selected_value: this.selected_value,
      };
      console.log("data=>", data);
      this.axios.post("/train/post_result", data).then((res) => {
        console.log("res=>", res);
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
        if (newValue) {
          this.post_result();
          this.show_answer();
        }
      },
    },
  },
};
</script>
