<template>
  <section>
    <h1 class="mb-4">Создать новое тестирование</h1>
    <test-single-editor
        @submit="createTest"
    />
  </section>
</template>

<script>
import TestSingleEditor from "@/components/TestSingleEditor";

export default {
  name: "TestsCreate",
  components: {TestSingleEditor},
  methods: {
    createTest(newTest) {
      console.log(newTest)
    }
  }
}
</script>

<style scoped>

</style>