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
              v-for="i in question_list.length"
              :color="stat[i - 1] === '0' ? 'error' : 'primary'"
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
          <v-btn icon dark @click.stop="quit">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-app-bar-title>返回</v-app-bar-title>
          <v-spacer></v-spacer>
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
                  <v-carousel hide-delimiters height="auto">
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
                    <v-radio-group v-model="selected_value[index]">
                      <v-radio
                        v-for="(option, i) in options"
                        :key="i"
                        :value="option.value"
                        :label="option.label"
                        :readonly="true"
                        :color="stat[index] === '0' ? 'error' : 'primary'"
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
                  <v-expand-transition>
                    <div>
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
  props: ["question_list", "dialog", "selected_value", "stat"],
  data() {
    return {
      show_drawer: false,
      snackbar: false,
      snackbar_text: "",

      index: 0,

      question_text: "",
      question_img_url: "",
      answer_img_url: "",
      options: [],
      answer_value: "",
    };
  },
  methods: {
    load_prev_question() {
      console.log(this.stat);
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
    },
    async quit() {
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
};
</script>
