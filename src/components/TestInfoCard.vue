<template>
  <v-container class="px-0 py-0">
    <v-card class="px-0">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>时间: {{ duration }}分钟</v-card-subtitle>
      <v-card-actions>
        <v-btn text color="primary accent-4" @click.stop="start_testing">
          开始测验
        </v-btn>
      </v-card-actions>
    </v-card>
    <Exam
      v-if="dialog"
      :dialog="dialog"
      :test_id="test_id"
      :question_list="question_list"
      :duration="duration"
      @quit="quit_testing"
    />
  </v-container>
</template>

<script>
import Exam from "@/components/Exam";

export default {
  props: ["test_id"],
  data() {
    return {
      show: false,
      dialog: false,
      snackbar: false,
      title: "",
      description: "",
      duration: 0,
      question_list: [],
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
        }
      });
    },
    async start_testing() {
      this.dialog = true;
    },
    async quit_testing() {
      this.dialog = false;
    },
  },
  components: {
    Exam,
  },
};
</script>
