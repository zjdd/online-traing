<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title>癌细胞判断训练</v-card-title>
      <v-card-subtitle>时间: 2021/08/05 - 2021/08/09</v-card-subtitle>
      <v-card-text>
        <v-row justify="center">
          <v-col>
            <div class="text--primary">
              已完成: {{ count.completed }}/{{ count.total }}
            </div>
          </v-col>
          <v-col>
            <v-progress-circular
              rotate="-90"
              :value="(count.completed / count.total) * 100"
            ></v-progress-circular>
          </v-col>
          <v-col>
            <div class="text--primary">
              正确率: {{ count.correct }}/{{ count.completed }}
            </div>
          </v-col>
          <v-col>
            <v-progress-circular
              rotate="-90"
              :value="(count.correct / count.completed) * 100"
            ></v-progress-circular>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary accent-4" @click.stop="start_training">
          顺序练习
        </v-btn>
        <v-btn text color="primary accent-4" @click.stop="reveal = true">
          查看错题
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            训练说明：每次给出一张细胞病理图片，请判断图中是否有癌细胞。
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card height="100%">
        <div style="display: flex; flex-direction: column; height: 100%">
          <v-toolbar dark color="secondary">
            <v-btn icon dark @click.stop="quit_training">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>结束训练</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <div class="area-practice">
            <Test :question_list="question_list" />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Practice from "./Practice";

export default {
  data() {
    return {
      show: false,
      dialog: false,
      count: {
        total: 0,
        completed: 0,
        correct: 0,
      },
      question_list: [],
      wrong_list: [],
      incomplete_list: [],
    };
  },
  mounted() {
    this.load_status();
  },
  methods: {
    async load_status() {
      await this.axios.get("/train/status").then((res) => {
        if (res.status === 200) {
          this.count.total = res.data["total"];
          this.count.correct = res.data["correct"].length;
          this.count.completed =
            res.data["correct"].length + res.data["wrong"].length;
          this.incomplete_list = res.data["incomplete"];
          this.wrong_list = res.data["wrong"];
        }
      });
    },
    start_training() {
      this.question_list = this.incomplete_list;
      this.dialog = true;
    },
    quit_training() {
      this.dialog = false;
      this.load_status();
    },
  },
  components: {
    Test: Practice,
  },
};
</script>

<style scoped lang="scss">
.area-practice {
  width: 100%;
  height: 100%;
  position: relative;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
