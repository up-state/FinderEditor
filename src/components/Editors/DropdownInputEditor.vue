<template>
  <section>
    <h4>Titel</h4>
    <el-input
      v-model="question.title"
      @change="e => updateQuestion({ title: e.target.value })"
      clearable
    />

    <h4>Beschreibung</h4>
    <el-input type="text" v-model="question.description" style="width: 100%" rows="5" clearable />

    <h4>Optionen (Komma-getrennt)</h4>
    <el-input
      type="textarea"
      :value="options"
      @change="e => updateOptions(e.target.value)"
      style="width: 100%"
      rows="5"
    />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DropdownInputEditor extends Vue {
  @Prop() private question!: any;

  get options() {
    return this.question.config.options.map((e: any) => e.key).join(',');
  }

  get title() {
    return (
      'Auswahlliste: ' +
      this.question.title +
      "<el-button type='info' icon='el-icon-delete' circle></el-button>"
    );
  }

  updateQuestion(x: any) {
    this.$store.commit('updateQuestion', { ...this.question, ...x });
  }

  getOptions() {
    return this.question.config.options.size;
  }

  updateOptions(options: string) {
    const updatedOptions = options.split(',').map(opt => ({ key: opt, value: 1 }));
    this.question.config.options = updatedOptions;
    this.$store.commit('updateQuestion', { ...this.question });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#delete-btn {
  margin-left: auto;
  color: #021343;
}
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
