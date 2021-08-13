<template>
  <v-container>
    <v-card class="mx-auto mt-3" max-width="344" outlined>
      <v-list-item>
        <v-list-item-avatar size="80" color="grey">
          <v-img
            height="100px"
            src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
          />
        </v-list-item-avatar>
        <v-list-item-content class="pl-3">
          <v-list-item-subtitle class="text-body-1 font-weight-medium"
            >用户名:</v-list-item-subtitle
          >
          <v-list-item-title class="text-h6 mb-1">
            {{ this.$store.state.username }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-body-1 font-weight-medium"
            >账号:</v-list-item-subtitle
          >
          <v-list-item-title class="text-h6 mb-1">
            123456@mail.com
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-list subheader two-line flat>
      <v-subheader>详细设置</v-subheader>
      <v-list-item-group>
        <v-list-item>
          <template>
            <v-list-item-content class="pt-0">
              <v-list-item-title>修改密码</v-list-item-title>
              <v-list-item-subtitle>更改当前的密码</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list-item inactive color="none">
      <v-btn
        class="mx-auto"
        depressed
        color="error"
        bottom
        @click.stop="logout"
      >
        退出登录
      </v-btn>
    </v-list-item>
  </v-container>
</template>
