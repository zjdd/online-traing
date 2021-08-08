<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4" sm="8" md="6" xl="6" lg="6">
        <v-img lazy-src="../assets/test.jpg" :src="question_img_url"></v-img>
      </v-col>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" sm="8" md="6" xl="6" lg="6">
        <v-img
          lazy-src="../assets/test.jpg"
          :src="answer_img_url"
          v-show="done"
        ></v-img>
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
    this.load_question(6);
  },
  methods: {
    async load_question(question_id) {
      let res = await this.$axios.get("/api/question", {
        params: { question_id: question_id },
      });
      if (res.status === 200) {
        let data = res.data;
        this.question_text = data["text"];
        this.options = data["options"];
        this.answer_value = data["answer"];
        this.question_img_url =
          "http://127.0.0.1:8000/api/img/" + data["question_img_token"];
        this.answer_img_url =
          "http://127.0.0.1:8000/api/img/" + data["answer_img_token"];
      }
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
      handler() {
        this.show_answer();
      },
    },
  },
};
</script>
