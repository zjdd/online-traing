<template>
  <v-container>
    <v-dialog
      :value="dialog"
      hide-overlay
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-dialog v-model="post_dialog" max-width="500">
          <v-card>
            <v-card-title class="text-h5"> 提交答案并退出测验 </v-card-title>
            <v-card-text>
              {{ post_card_text }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" text @click="post_dialog = false">
                取消
              </v-btn>
              <v-btn color="primary" text @click="quit_training"> 确定 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-navigation-drawer v-model="show_drawer" app temporary right>
          <v-container>
            <v-btn
              outlined
              depressed
              max-width="36px"
              v-for="i in question_list.length"
              :color="selected_value[i - 1] === '#' ? 'gray' : 'primary'"
              :key="i"
              class="mx-1 my-1"
              @click="
                index = i - 1;
                show_drawer = false;
              "
            >
              <v-icon left v-show="index === i - 1"> mdi-pencil </v-icon>
              {{ i }}
            </v-btn>
          </v-container>
        </v-navigation-drawer>
        <v-app-bar dark color="primary">
          <v-btn icon dark @click.stop="post_dialog = true">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-app-bar-title>提交并退出(倒计时{{ mm }}:{{ ss }})</v-app-bar-title>
          <v-spacer></v-spacer>
          <!--          <v-btn icon>-->
          <!--            <v-icon>mdi-cog</v-icon>-->
          <!--          </v-btn>-->
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
                    lazy-src="../assets/test.jpg"
                    :src="question_img_url"
                  />
                </v-card>
              </v-col>
              <v-col sm="12" md="6" xl="6" lg="6">
                <v-card class="px-0 py-0 mx-0 my-0">
                  <v-card-title class="pb-0"> {{ question_text }}</v-card-title>
                  <v-card-text class="pb-0">
                    <v-radio-group v-model="selected_value[index]">
                      <v-radio
                        v-for="(option, i) in options"
                        :key="i"
                        :value="option.value"
                        :label="option.label"
                      >
                      </v-radio>
                    </v-radio-group>
                  </v-card-text>
                  <v-card-actions>
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
  props: ["test_id", "question_list", "dialog", "duration"],
  data() {
    return {
      show_drawer: false,
      snackbar: false,
      post_dialog: false,
      snackbar_text: "",

      index: 0,
      selected_value: [],

      time: 0,
      start_time: "",
      end_time: "",

      question_text: "",
      question_img_url: "",
      answer_img_url: "",
      options: [],
      answer_value: "",
    };
  },
  mounted() {
    this.selected_value = new Array(this.question_list.length).fill("#");
    this.start_testing();
  },
  methods: {
    start_testing() {
      this.time = this.duration * 60;
      this.start_time = new Date();
      setInterval(this.countdown, 1000);
    },
    countdown() {
      this.time--;
    },
    padding(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
    load_prev_question() {
      if (this.index === 0) {
        this.snackbar_text = "已经是第一题";
        this.snackbar = true;
      } else --this.index;
    },
    load_next_question() {
      if (this.index === this.question_list.length - 1) {
        this.snackbar_text = "已经是最后一题";
        this.snackbar = true;
      } else ++this.index;
    },
    async load_question() {
      let question_id = this.question_list[this.index];
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
      this.selected = this.selected_value[this.index];
    },
    async post_result() {
      this.end_time = new Date();
      let data = {
        test_id: this.test_id,
        selected_value: this.selected_value.join(""),
        start_time: this.start_time.getTime(),
        end_time: this.end_time.getTime(),
      };
      await this.axios.post("/tests/post_result", data);
    },
    async quit_training() {
      await this.post_result();
      this.post_dialog = false;
      this.$emit("quit");
    },
  },
  watch: {
    index: {
      handler() {
        this.load_question();
      },
      immediate: true,
    },
  },
  computed: {
    ss() {
      let ss = this.time % 60;
      return this.padding(ss, 2);
    },
    mm() {
      let mm = Math.floor(this.time / 60);
      return this.padding(mm, 2);
    },
    post_card_text() {
      if (this.selected_value.includes("#"))
        return "检测到您还有尚未作答的题目，是否确定提交？";
      else return "检测到您已经完成所有作答，是否确定提交？";
    },
  },
};
</script>
