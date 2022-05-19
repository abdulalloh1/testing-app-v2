<template>
  <div v-if="loaded">
    <div class="mb-4">
      <p class="mb-2">
        Название тестирование
      </p>
      <v-text-field
          v-model.trim="testData.name"
          solo
          dense
          flat
          outlined
          hide-details
      />
    </div>
    <div class="d-flex align-end mb-6">
      <div style="width: 400px">
        <p
            class="mb-2"
        >
          Продолжительность (минут)
        </p>
        <v-text-field
            type="number"
            v-model.number="testData.duration"
            solo
            dense
            flat
            outlined
            hide-details
        />
      </div>
      <div
          class="d-flex align-center ml-10"
          style="min-height: 40px"
      >
        <label
            for="randomSwitcher"
            style="width: 200px"
        >
          Отображать вопросы в случайном порядке
        </label>
        <v-switch
            id="randomSwitcher"
            v-model="testData.randomize"
            hide-details
            class="ma-0"
        />
      </div>
    </div>
    <div class="d-flex">
    </div>
    <h3 class="mb-4">
      Вопросы ({{testData.questions.length}})
    </h3>
    <v-card
        class="pa-4 mb-6"
        v-for="(question, questionIndex) of testData.questions"
        :key="question.id"
    >
      <h4 class="mb-2">
        Вопрос №{{questionIndex + 1}}
      </h4>
      <p class="mb-2">
        Название вопроса
      </p>
      <v-text-field
          v-model.trim="question.title"
          solo
          dense
          flat
          outlined
          hide-details
      />
      <v-radio-group
          v-model="question.correctAnswer"
          class="ma-0"
      >
        <div
            v-for="(option, optionIndex) of question.options"
            :key="option.id"
            class="d-flex align-center mt-4"
        >
          <v-radio
              :value="option.id"
          />
          <v-text-field
              v-model.trim="option.text"
              solo
              dense
              flat
              outlined
              hide-details
              :placeholder="`Вариант ${optionIndex + 1}`"
          />
          <v-btn
              icon
              class="ml-2"
              @click="deleteOptionFromQuestion(optionIndex, questionIndex)"
          >
            <v-icon color="red">
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </v-radio-group>
      <v-btn
          depressed
          class="ml-8 d-flex"
          small
          @click="addOptionToQuestion(question)"
      >
        Добавить вариант
      </v-btn>
    </v-card>
    <v-card class="pa-4">
      <h4 class="mb-2">
        Новый вопрос №{{testData.questions.length + 1}}
      </h4>
      <p class="mb-2">
        Название вопроса
      </p>
      <v-text-field
          v-model.trim="newQuestion.title"
          solo
          dense
          flat
          outlined
          hide-details
      />
      <v-radio-group
          v-model="newQuestion.correctAnswer"
          class="ma-0"
      >
        <div
            v-for="(option, optionIndex) of newQuestion.options"
            :key="option.id"
            class="d-flex align-center mt-4"
        >
          <v-radio
              :value="option.id"
          />
          <v-text-field
              v-model.trim="option.text"
              solo
              dense
              flat
              outlined
              hide-details
              :placeholder="`Вариант ${optionIndex + 1}`"
          />
          <v-btn
              icon
              class="ml-2"
              @click="deleteOptionFromQuestion(optionIndex)"
          >
            <v-icon color="red">
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </v-radio-group>
      <v-btn
          depressed
          class="ml-8 d-flex"
          small
          @click="addOptionToQuestion()"
      >
        Добавить вариант
      </v-btn>
      <v-btn
          depressed
          color="primary"
          class="ml-auto d-flex"
          @click="addNewQuestion"
      >
        <v-icon class="mr-2">
          mdi-plus-circle
        </v-icon>
        Добавить вопрос
      </v-btn>
    </v-card>
    <v-btn
        color="success"
        class="ml-auto mt-6 d-flex"
        :disabled="isSubmitBtnDisabled"
        @click="submitData"
    >
      Подтвердить
    </v-btn>
  </div>
</template>

<script>
import {minOptionsAmount} from "@/constants/minOptionsAmount";

export default {
  name: "TestSingleEditor",
  props: {
    value: {
      type: [Array, Object],
      default: () => {}
    }
  },
  computed: {
    isSubmitBtnDisabled() {
      return !this.value.name || !this.value.questions.length
    }
  },
  data:() => ({
    loaded: false,

    testData: '',
    newQuestion: {
      title: '',
      options: [
        {
          id: 1,
          text: ''
        }
      ],
      correctAnswer: null
    }
  }),
  methods: {
    addOptionToQuestion(question) {
      let options = question ? question.options : this.newQuestion.options;
      options.push({
        id: +new Date(),
        text: ''
      })
    },
    deleteOptionFromQuestion(deletingOptionIndex, deletingFromQuestionIndex) {
      if(deletingFromQuestionIndex !== undefined) {
        return this.testData.questions[deletingFromQuestionIndex].options.splice(deletingOptionIndex, 1)
      }
      return this.newQuestion.options.splice(deletingOptionIndex, 1)
    },
    addNewQuestion() {
      if(this.newQuestion.options.length < minOptionsAmount) return;
      let error = false;
      for(let option of this.newQuestion.options) {
        if(!option.text) {
          error = true;
          break;
        }
      }
      if(!this.newQuestion.title || error) return;
      this.testData.questions.push(this.newQuestion);
      this.newQuestion = {
        title: '',
        options: [
          {
            id: 1,
            text: ''
          }
        ],
        correctAnswer: null
      }
    },

    submitData(){
      this.$emit('submit');
    }
  },
  created() {
    this.testData = this.value;
    this.loaded = true;
  },
  watch: {
    testData(newValue) {
      this.$emit('update:value', newValue)
    }
  }
}
</script>

<style scoped>

</style>