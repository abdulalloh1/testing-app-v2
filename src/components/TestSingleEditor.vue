<template>
  <div>
    <div class="mb-4">
      <p class="mb-2">
        Название тестирование
      </p>
      <v-text-field
          v-model.trim="test.name"
          solo
          dense
          flat
          outlined
          hide-details
      />
      <p
          :class="['error--text', {
            'active': checkForErrorExistence('test-name')
          }]"
      >
        Заполните полю!
      </p>
    </div>
    <div class="d-flex mb-6">
      <div style="width: 400px">
        <p class="mb-2">
          Продолжительность (минут)
        </p>
        <v-text-field
            type="number"
            v-model.number="test.duration"
            solo
            dense
            flat
            outlined
            hide-details
        />
        <p
            :class="['error--text', {
            'active': checkForErrorExistence('test-duration')
          }]"
        >
          Заполните полю!
        </p>
      </div>
      <div
          class="d-flex align-center ml-10 mt-7"
          style="min-height: 40px; height: fit-content"
      >
        <label
            for="randomSwitcher"
            style="width: 200px"
        >
          Отображать вопросы в случайном порядке
        </label>
        <v-switch
            id="randomSwitcher"
            v-model="test.randomize"
            hide-details
            class="ma-0"
        />
      </div>
    </div>
    <div class="d-flex">
    </div>
    <h3 class="mb-4">
      Вопросы ({{test.questions.length}})

    </h3>
    <p
        :class="['error--text', {
            'active': checkForErrorExistence('no-question')
          }]"
    >
      Добавьте минимум один вопрос!
    </p>
    <v-card
        class="pa-4 mb-6"
        v-for="(question, questionIndex) of test.questions"
        :key="question.id"
    >
      <div class="d-flex mb-2">
        <h4>
          Вопрос №{{questionIndex + 1}}
        </h4>
        <v-btn
            icon
            class="ml-auto"
            @click="deleteQuestion(questionIndex)"
        >
          <v-icon color="red">
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
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
              @click="deleteOptionFromQuestion(question.options, optionIndex)"
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
          @click="addOptionToQuestion(question.options)"
      >
        Добавить вариант
      </v-btn>
    </v-card>
    <v-card class="pa-4">
      <h4 class="mb-2">
        Новый вопрос №{{test.questions.length + 1}}
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
              @click="deleteOptionFromQuestion(newQuestion.options, optionIndex)"
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
          @click="addOptionToQuestion(newQuestion.options)"
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
        @click="submit"
    >
      Подтвердить
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "TestSingleEditor",
  props: {
    testForOverWrite: {
      type: Object,
      default: null
    }
  },
  data:() => ({
    test: {
      name: '',
      duration: '',
      randomize: false,
      questions: []
    },
    newQuestion: {
      title: '',
      options: [
        {
          id: 1,
          text: ''
        }
      ],
      correctAnswer: null
    },

    errors: []
  }),
  methods: {
    checkForErrorExistence(error) {
      return this.errors.includes(error);
    },

    testValidation() {
      let error = false

      if(!this.test.name) {
        this.errors.push('test-name');
        error = true;
      }
      if(!this.test.duration) {
        this.errors.push('test-duration');
        error = true;
      }
      if(!this.test.questions.length) {
        this.errors.push('no-question');
        error = true;
      }

      return error ? this.$toast.error('Заполните все необходимые поля!') : false;
    },

    addOptionToQuestion(options) {
      options.push({
        id: +new Date(),
        text: ''
      })
    },
    deleteOptionFromQuestion(options, optionIndex) {
      return options.splice(optionIndex, 1)
    },
    addNewQuestion() {
      this.test.questions.push(this.newQuestion);
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
    deleteQuestion(questionIndex) {
      this.test.questions.splice(questionIndex, 1)
    },

    submit(){
      this.testValidation()
      if (this.errors.length) return;
      this.$emit('submit', this.test);
    }
  },
  created() {
    if(this.testForOverWrite) this.test = this.testForOverWrite
  }
}
</script>

<style lang="scss" scoped>
.error--text{
  margin-top: 10px;
  margin-bottom: -24px;
  transition: all .4s ease;
  opacity: 0;
  &.active {
    margin-bottom: 16px;
    opacity: 1;
  }
}
</style>