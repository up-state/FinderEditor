<template>
  <section>
    <label class="input">
      <h3>Title</h3>
      <input
        type="text"
        v-model="question.title"
        @change="(e) => updateQuestion({ title: e.target.value })"
      />
    </label>
    <label>
      <h3>Description</h3>
      <textarea type="text" v-model="question.description" />
    </label>
    <label>
      <h3>Optionen (mit , trennen)</h3>
      <textarea type="text" :value="options" @change="(e) => updateOptions(e.target.value)" />
    </label>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';

@Component
export default class NumberInputEditor extends Vue {
  @Prop() private question!: any;
  get options() {
    return this.question.config.options.map((e: any) => e.key).join(',');
  }

  updateQuestion(x: any) {
    this.$store.commit('updateQuestion', { ...this.question, ...x });
  }

  getOptions() {
    return this.question.config.options.size;
  }

  updateOptions(options: string) {
    const updatedOptions = options.split(',').map((opt) => ({ key: opt, value: 1 }));
    this.question.config.options = updatedOptions;
    this.$store.commit('updateQuestion', { ...this.question });
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
