<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link
          :to="{
            name: 'Tests Index'
          }"
          style="color: white"
      >
        <v-icon class="mr-2">
          mdi-format-list-checks
        </v-icon>
        Тестирование
      </router-link>
    </v-app-bar>
    <v-main>
      <div class="pa-4">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
<style lang="scss">
a {
  color: #000;
  text-decoration: none;
}
</style>