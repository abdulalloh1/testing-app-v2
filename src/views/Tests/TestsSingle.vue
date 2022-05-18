<template>
  <section>
    <h1 class="mb-4">Основная информация</h1>
    <test-single-editor v-model="test"/>
  </section>
</template>

<script>
import TestSingleEditor from "@/components/TestSingleEditor";
export default {
  name: "TestsSingle",
  components: {TestSingleEditor},
  data:() => ({
    test: {
      name: 'First test',
      duration: 120,
      randomize: true,
      questions: [
        {
          title: 'Question 1',
          options: [
            {
              id: 1,
              text: 'option 1'
            },
            {
              id: 2,
              text: 'option 2'
            },
            {
              id: 3,
              text: 'option 3'
            },
            {
              id: 4,
              text: 'option 4'
            }
          ],
          correctAnswer: 2
        }
      ]
    }
  })
}
</script>

<style scoped>

</style>