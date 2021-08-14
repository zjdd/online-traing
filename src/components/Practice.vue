<template>
  <v-container>
    <v-dialog
      :value="dialog"
      hide-overlay
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-navigation-drawer v-model="show_drawer" app temporary right>
          <v-container>
            <v-btn
              outlined
              depressed
              max-width="36px"
              v-for="i in complete_buffer.length"
              :key="i"
              :color="complete_buffer[i - 1].correct ? 'primary' : 'error'"
              class="mx-1 my-1"
              @click="
                index_p = i - 1;
                show_drawer = false;
              "
            >
              <v-icon left v-show="index_p === i - 1"> mdi-pencil </v-icon>
              {{ i }}
            </v-btn>
            <v-btn
              v-if="index_q < question_list.length - 1"
              outlined
              color="grey"
              class="mx-1 my-2"
              max-width="36px"
              @click="
                index_p = index_q + 1;
                show_drawer = false;
              "
            >
              <v-icon left v-show="index_p === index_q + 1">
                mdi-pencil
              </v-icon>
              {{ index_q + 2 }}
            </v-btn>
          </v-container>
        </v-navigation-drawer>
        <v-app-bar dark color="primary">
          <v-btn icon dark @click.stop="quit_training">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-app-bar-title>结束训练</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-btn icon @click.stop="show_drawer = true">
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="pt-2 px-2">
          <v-snackbar v-model="snackbar" timeout="2000">
            {{ snackbar_text }}
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                关闭
              </v-btn>
            </template>
          </v-snackbar>
          <v-container>
            <v-row class="">
              <v-col cols="12" sm="12" md="6" xl="6" lg="6">
                <v-card>
                  <v-img
                    v-show="!show_answer"
                    lazy-src="../assets/test.jpg"
                    :src="question_img_url"
                  />
                  <v-carousel
                    hide-delimiters
                    v-show="show_answer"
                    height="auto"
                  >
                    <v-carousel-item>
                      <v-img :src="question_img_url" />
                    </v-carousel-item>
                    <v-carousel-item>
                      <v-img :src="answer_img_url" />
                    </v-carousel-item>
                    <v-carousel-item>
                      <v-img :src="question_img_url" />
                    </v-carousel-item>
                    <v-carousel-item>
                      <v-img :src="answer_img_url" />
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-col>
              <v-col sm="12" md="6" xl="6" lg="6">
                <v-card class="px-0 py-0 mx-0 my-0">
                  <v-card-title class="pb-0"> {{ question_text }}</v-card-title>
                  <v-card-text class="pb-0">
                    <v-radio-group v-model="selected_value">
                      <v-radio
                        v-for="(option, i) in options"
                        :key="i"
                        :color="color"
                        :readonly="show_answer"
                        :value="option.value"
                        :label="option.label"
                      >
                      </v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-card-actions v-show="show_answer">
                    <v-btn
                      text
                      color="primary accent-4"
                      @click.stop="load_prev_question"
                    >
                      上一题
                    </v-btn>
                    <v-btn
                      text
                      color="primary accent-4"
                      @click.stop="load_next_question"
                    >
                      下一题
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="show_answer">
                      <v-divider></v-divider>
                      <v-card-text>正确答案是{{ answer_value }}</v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["question_list", "dialog"],
  data() {
    return {
      show_drawer: false,
      snackbar: false,
      snackbar_text: "",

      index_p: 0,
      index_q: -1,
      complete_buffer: [],

      question_text: "",
      question_img_url: "",
      answer_img_url: "",
      options: [],
      answer_value: "",
      selected_value: "",
      show_answer: false,
    };
  },
  mounted() {
    this.load_question();
  },
  methods: {
    load_prev_question() {
      if (this.index_p === 0) {
        this.snackbar_text = "已经是第一题";
        this.snackbar = true;
      } else --this.index_p;
    },
    load_next_question() {
      if (this.index_p === this.question_list.length - 1) {
        this.snackbar_text = "已经是最后一题";
        this.snackbar = true;
      } else ++this.index_p;
    },
    async load_question() {
      this.show_answer = false; // reset
      this.selected_value = "";

      let question_id = this.question_list[this.index_p];
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

      if (!this.is_new_question()) {
        this.selected_value =
          this.complete_buffer[this.index_p]["selected_value"];
      }
    },
    async post_result() {
      if (this.is_new_question()) {
        let data = {
          question_id: this.question_list[this.index_p],
          selected_value: this.selected_value,
        };
        await this.axios.post("/train/post_result", data).then(() => {
          let tmp = {
            selected_value: this.selected_value,
            correct: this.selected_value === this.answer_value,
          };
          this.complete_buffer.push(tmp);
          ++this.index_q;
        });
      }
    },
    is_new_question() {
      return !(this.index_p <= this.index_q);
    },
    quit_training() {
      this.$emit("quit");
    },
  },
  computed: {
    color() {
      if (this.show_answer && this.answer_value === this.selected_value)
        return "primary";
      else return "error";
    },
  },
  watch: {
    selected_value: {
      handler(newValue) {
        if (newValue) {
          this.post_result();
          this.show_answer = true;
        }
      },
    },
    index_p: {
      handler() {
        this.load_question();
      },
    },
  },
};
</script>
