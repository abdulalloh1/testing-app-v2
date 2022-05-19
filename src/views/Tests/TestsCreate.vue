<template>
  <section>
    <h1 class="mb-4">Создать новое тестирование</h1>
    <test-single-editor
        v-model="newTest"
        @submit="createTest()"
    />
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
  methods: {
    createTest() {
      console.log(this.newTest)
    }
  }
}
</script>

<style scoped>

</style>