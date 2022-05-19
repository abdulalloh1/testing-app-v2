<template>
  <section>
    <h1 class="mb-2">Мои тестирование</h1>
    <v-text-field
        placeholder="Поиск по названию"
        solo
        hide-details
        flat
        outlined
        style="max-width: 400px"
        append-icon="mdi-magnify"
        v-model="searchingTestName"
        class="mb-4"
    />
    <v-row>
      <v-col
          lg="4"
          md="6"
          sm="12"
      >
        <router-link
            :to="{
              name: 'Tests Create'
            }"
            class="d-flex align-center justify-center"
            style="min-height: 128px; height: 100%; border: 1px dashed #7e7e7e; border-radius: 8px; color: #ff5151"
        >
          <v-icon
              color="#ff5151"
              class="mr-2"
          >
            mdi-plus-circle
          </v-icon>
          Создать новое тестирование
        </router-link>
      </v-col>
      <v-col
          lg="4"
          md="6"
          sm="12"
          v-for="(test, index) of searchTest"
          :key="test.id"
      >
        <router-link
            :to="'tests/' + test.id"
            class="d-flex flex-column pa-4"
            style="border: 1px solid #7e7e7e; border-radius: 8px;"
        >
          <h3
              class="d-flex justify-space-between mb-10"
              style="color: #000"
          >
            {{ test.name }}

            <v-menu
                offset-y
                left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    x-small
                    depressed
                    height="30px"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent
                >
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </template>
              <v-list
                  class="pa-0"
              >
                <v-btn
                    class="d-flex"
                    style="width: 100%; text-align: left; justify-content: flex-start"
                    @click="duplicateTest(test, index)"
                >
                  <v-icon
                      class="mr-2"
                  >
                    mdi-delete
                  </v-icon>
                  Дублировать
                </v-btn>
                <v-btn
                    class="d-flex"
                    style="width: 100%; text-align: left; justify-content: flex-start; color: white"
                    color="red"
                    @click="deleteTest(index)"
                >
                  <v-icon
                      color="white"
                      class="mr-2"
                  >
                    mdi-delete
                  </v-icon>
                  Удалить
                </v-btn>
              </v-list>
            </v-menu>
          </h3>
          <div class="d-flex align-center">
            <p
                class="mr-6 mb-0"
                style="color: #7e7e7e"
            >
              Вопросы: {{ test.questions }}
            </p>
            <p
                class="mb-0"
                style="color: #7e7e7e"
            >
              Время: {{ test.timer }}
            </p>
          </div>
        </router-link>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import {deepClone} from "@/utils/dataManipulations";

export default {
  name: "TestsIndex",
  data: () => ({
    searchingTestName: '',
    testsData: [
      {
        id: 1,
        name: 'First Tests',
        questions: 25,
        timer: 120
      },
      {
        id: 2,
        name: 'Second test',
        questions: 25,
        timer: 120
      },
      {
        id: 3,
        name: 'Third test',
        questions: 25,
        timer: 120
      },
      {
        id: 4,
        name: 'Fourth test',
        questions: 25,
        timer: 120
      },
      {
        id: 5,
        name: 'Fifth test',
        questions: 25,
        timer: 120
      }
    ]
  }),
  computed: {
    searchTest() {
      return this.testsData.filter(test => {
        let testName = test.name.toLowerCase(),
            searchingName = this.searchingTestName.toLowerCase();

        return testName.includes(searchingName);
      })
    }
  },
  methods: {
    deleteTest(index) {
      this.testsData.splice(index, 1)
    },
    duplicateTest(test, selectedTestIndex) {
      let selectedTest = deepClone(test);
      selectedTest.id = +new Date();
      selectedTest.name = '(Duplicated) ' + selectedTest.name
      this.testsData.splice(selectedTestIndex + 1, 0, selectedTest)
    }
  }
}
</script>

<style scoped>

</style>