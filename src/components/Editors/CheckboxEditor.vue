<template>
  <section>
    <h4>Title</h4>
    <el-input
      type="text"
      v-model="question.title"
      style="width: 100%"
      rows="5"
      clearable
      @change="(e) => updateQuestion({ title: e.target.value })"
    />

    <h4>Description</h4>
    <el-input
      type="text"
      v-model="question.description"
      style="width: 100%"
      rows="5"
      clearable
      @change="(e) => updateQuestion({ title: e.target.value })"
    />

    <h4>Label</h4>
    <el-input
      type="text"
      v-model="question.config.label"
      style="width: 100%"
      rows="5"
      clearable
      @change="updateLabel($event.target.value)"
    />
    <h4>Label</h4>
    <el-input
      type="text"
      v-model="question.config.label"
      style="width: 100%"
      rows="5"
      clearable
      @change="updateLabel($event.target.value)"
    />

    <h4>Checked</h4>
    <el-checkbox
      v-model="question.config.checked"
      style="width: 100%"
      rows="5"
      @change="updateChecked($event.target.value)"
    ></el-checkbox>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';

@Component
export default class CheckboxEditor extends Vue {
  @Prop() private question!: any;

  updateQuestion(x: any) {
    this.$store.commit('updateQuestion', { ...this.question, ...x });
  }

  updateLabel(label: string) {
    this.question.config.label = label;
    this.$store.commit('updateQuestion', this.question);
  }

  updateChecked(checked: boolean) {
    this.question.config.checked = checked;
    this.$store.commit('updateQuestion', this.question);
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
