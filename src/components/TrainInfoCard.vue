<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="6" xl="6" lg="6">
        <v-card class="mx-auto">
          <v-card-title>癌细胞判断训练</v-card-title>
          <v-card-subtitle>时间: 2021/08/05 - 2021/08/09</v-card-subtitle>
          <v-card-text>
            <v-row justify="center">
              <v-col>
                <div class="text--primary">已完成: 425/546</div>
              </v-col>
              <v-col>
                <v-progress-circular
                  rotate="-90"
                  :value="78"
                ></v-progress-circular>
              </v-col>
              <v-col>
                <div class="text--primary">正确率: 400/425</div>
              </v-col>
              <v-col>
                <v-progress-circular
                  rotate="-90"
                  :value="95"
                ></v-progress-circular>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary accent-4" @click="reveal = true">
              顺序练习
            </v-btn>
            <v-btn text color="primary accent-4" @click="reveal = true">
              查看错题
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
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
      </v-col>
    </v-row>
  </v-container>
</template>
