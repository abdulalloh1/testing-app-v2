<template>
  <section>
    <h1 class="mb-4">Создать новое тестирование</h1>
    <test-single-editor v-model="newTest"/>
    <v-btn
        color="success"
        class="ml-auto mt-6 d-flex"
        :disabled="isSubmitBtnDisabled"
    >
      Создать новое тестирование
    </v-btn>
  </section>
</template>

<script>
import TestSingleEditor from "@/components/TestSingleEditor";

export default {
  name: "TestsCreate",
  components: {TestSingleEditor},
  data:() => ({
    newTest: {
      name: '',
      duration: '',
      randomize: false,
      questions: []
    },
  }),
  computed: {
    isSubmitBtnDisabled() {
      return !this.newTest.name || !this.newTest.questions.length
    }
  }
}
</script>

<style scoped>

</style>