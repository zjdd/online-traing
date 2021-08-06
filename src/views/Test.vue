<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" md="6" xl="6" lg="6">
        <v-img lazy-src="../assets/test.jpg" src="../assets/test.jpg"></v-img>
      </v-col>
      <v-col>
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
      </v-col>
    </v-row>
    <v-row>
      <p v-show="done">答案是{{ answer_value }}</p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selected_value: "",
      color: "primary",
      question_text: "THIS IS A QUESTION:",
      done: false,
      options: [
        {
          value: "A",
          label: "A.TEXT OF A",
        },
        {
          value: "B",
          label: "B.TEXT OF B",
        },
        {
          value: "C",
          label: "C.TEXT OF C",
        },
        {
          value: "D",
          label: "D.TEXT OF D",
        },
      ],
      answer_value: "B",
    };
  },
  methods: {
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
