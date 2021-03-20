<template>
  <section style="border: 2px solid black; padding: 2rem;">
    <h2>Nummerneingabe</h2>
    <label class="input">
      <span>Title</span>
      <input
        type="text"
        :value="question.title"
        @change="e => updateQuestion({ title: e.target.value })"
      />
    </label>

    <label class="input">
      <span>Einheit</span>
      <input
        type="text"
        :value="question.config.unit"
        @change="e => updateQuestionConfig({ unit: e.target.value })"
      />
    </label>

    <label class="input">
      <span>Zwingend erforderlich</span>
      <input
        type="checkbox"
        :value="question.config.required.value"
        @change="e => updateQuestionRequired(e.target.checked)"
      />
    </label>

    <label class="input">
      <span>Platzhalter</span>
      <input
        type="text"
        :value="question.config.placeholder"
        @change="e => updateQuestionConfig({ placeholder: e.target.value })"
      />
    </label>
  </section>
</template>

<script lang="ts">
import { Question } from '@/store/questions';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NumberInputEditor extends Vue {
  @Prop() private question!: any;

  updateQuestion(update: Partial<Question>) {
    this.$store.commit('updateQuestion', { ...this.question, ...update });
  }

  updateQuestionConfig(update: Question['config']) {
    this.$store.commit('updateQuestion', {
      ...this.question,
      config: { ...this.question.config, ...update },
    });
  }

  updateQuestionRequired(required: boolean) {
    this.$store.commit('updateQuestion', {
      ...this.question,
      config: {
        ...this.question.config,
        required: required ? { message: 'Bitte Wert auswählen' } : undefined,
      },
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
  input {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    font-size: 24px;
    letter-spacing: 1px;
    color: black;

    border: 2px solid #007d8c;
    border-radius: 6px;

    text-align: center;
    outline: none !important;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
  .unit {
    font-size: 24px;
    margin-bottom: 8px;
    &::after {
      content: ':';
    }
  }
  @media (min-width: 500px) {
    border: 2px solid #007d8c;
    border-radius: 6px;
    flex-direction: row;
    .unit {
      font-size: 24px;
      display: block;
      padding: 16px 24px;
      background: #007d8c;
      color: white;
      margin-bottom: 0;
      &::after {
        display: none;
      }
    }
    input {
      text-align: left;
      border: none;
    }
  }
}
</style>
