<template>
  <v-app>

    <v-navigation-drawer
        app
        v-model="showNavigation"
    >
      <v-list nav flat>
        <v-list-item
            link
            :to="{ name: nav.to }"
            v-for="(nav, i) in navs"
            :key="i"
            :disabled="!nav.to.length"
        >
          <v-list-item-icon>
            <v-icon v-if="nav.to.length">{{ nav.icon }}</v-icon>
            <v-icon v-else>mdi-sign-caution</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ nav.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <v-btn icon @click="showNavigation = !showNavigation">
        <v-icon v-if="showNavigation">
          mdi-backburger
        </v-icon>
        <v-icon v-else>
          mdi-menu
        </v-icon>
      </v-btn>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-if="$vuetify.theme.dark">
          mdi-lightbulb
        </v-icon>
        <v-icon v-else>
          mdi-lightbulb-outline
        </v-icon>
      </v-btn>
      <v-spacer/>
      <v-icon class="mr-2">mdi-flask-round-bottom</v-icon>
      Ivanov Lab
    </v-app-bar>

    <v-main>
      <v-expand-transition>
        <router-view/>
      </v-expand-transition>
    </v-main>

    <v-dialog
        v-model="browserIssuesNotify"
        width="500"
    >
      <v-card>
        <v-card-title>
          Браузер не поддерживается
        </v-card-title>
        <v-card-text>
          Ваш браузер не поддерживает в полной мере функционал требующийся для этого приложения.
          Для корректной работы требуется браузер реализующий стандарты как минимум 2019 года.
          Попробуйте обновить браузер или используйте последние версии Google Chrome, Mozilla Firefox
        </v-card-text>
        <v-card-text>
          <v-list>
            <v-list-item-subtitle>
              Проблемы:
            </v-list-item-subtitle>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="red">mdi-alert-octagon</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>BigInt API</v-list-item-title>
                <v-list-item-subtitle>Поддержка целых чисел более 63 бит</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
              color="primary"
              @click="browserIssuesNotify = false"
              text
          >
            Продолжить в любом случае
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
export default {
  components: {},

  data: () => ({
    showNavigation: true,
    browserIssuesNotify: false,
    navs: [
      {icon: 'mdi-cog', text: 'Задание', to: 'Home'},
      {icon: 'mdi-notebook', text: 'Примечание', to: 'Note'},
      {icon: 'mdi-numeric-1-box', text: 'Обнулить биты', to: 'Task1'},
      {icon: 'mdi-numeric-2-box', text: 'Склеить и вырезать', to: 'Task2'},
      {icon: 'mdi-numeric-3-box', text: 'Поменять местами', to: 'Task3'},
      {icon: 'mdi-numeric-4-box', text: 'Найти степень', to: 'Task4'},
      {icon: 'mdi-numeric-5-box', text: 'Найти "P"', to: 'Task5'},
      {icon: 'mdi-numeric-6-box', text: 'RC4', to: ''},
      {icon: 'mdi-numeric-7-box', text: 'Взлом XOR', to: ''},
      {icon: 'mdi-numeric-8-box', text: 'Взлом Цезарь', to: ''},
    ],
  }),

  mounted() {
    if (!('BigInt' in window)) this.browserIssuesNotify = true
  },
};
</script>
