<template>
  <v-container class="px-0 py-0">
    <v-card class="px-0">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle
        >共{{ question_list.length }}题 时间{{ duration }}分钟</v-card-subtitle
      >
      <v-card-text class="text--primary" v-if="done">
        {{ card_text }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="primary accent-4"
          v-if="!done"
          @click.stop="start_testing"
        >
          开始测验
        </v-btn>
        <v-btn
          text
          color="primary accent-4"
          v-if="done"
          @click.stop="result_dialog = true"
        >
          查看结果
        </v-btn>
      </v-card-actions>
    </v-card>
    <Exam
      v-if="exam_dialog"
      :dialog="exam_dialog"
      :test_id="test_id"
      :question_list="question_list"
      :duration="duration"
      @quit="quit_testing"
    />
    <ExamResult
      v-if="result_dialog"
      :dialog="result_dialog"
      :question_list="question_list"
      :selected_value="selected_value"
      :stat="stat"
      @quit="result_dialog = false"
    />
  </v-container>
</template>

<script>
import Exam from "@/components/Exam";
import ExamResult from "@/components/ExamResult";

export default {
  props: ["test_id", "done"],
  data() {
    return {
      show: false,
      exam_dialog: false,
      result_dialog: false,
      snackbar: false,
      title: "",
      description: "",
      duration: 0,
      question_list: [],
      selected_value: null,
      stat: null,
      score: 0,

      card_text: "",
    };
  },
  mounted() {
    this.load_test_info();
  },
  methods: {
    async load_test_info() {
      let test_id = this.test_id;
      await this.axios.get("/tests/" + test_id).then((res) => {
        if (res.status === 200) {
          this.title = res.data.title;
          this.description = res.data.description;
          this.duration = res.data.duration;
          this.question_list = res.data["questions"];
          if (this.done) {
            this.score = res.data.score;
            this.selected_value = res.data.selected_value;
            this.stat = res.data.stat;
            this.card_text =
              "测验成绩:" +
              res.data.score +
              "分, 用时" +
              res.data.time +
              ", 完成于" +
              res.data.end_time;
          }
        }
      });
    },
    async start_testing() {
      this.exam_dialog = true;
    },
    async quit_testing() {
      this.exam_dialog = false;
      this.$emit("refresh");
    },
  },
  components: {
    Exam,
    ExamResult,
  },
};
</script>
