<template>
  <label class="input">
    <input
      type="number"
      v-model.number="value"
      ref="input"
      :id="question.key"
      :placeholder="question.config.placeholder"
      @focus="setActive(true)"
      @blur="setActive(false)"
    />
    <span v-if="question.config.unit" class="unit">{{ question.config.unit }}</span>
  </label>
</template>

<script lang="ts">
import { Question } from '@/store/questions';
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';

@Component
export default class NumberInput extends Vue {
  private status: any;
  @Prop() private question!: Question;
  private value: any = null;
  public $refs: any;

  mounted() {
    this.status = {};
    this.valueChanged(this.value);
    this.$refs.input.focus();
  }

  setActive(val: boolean) {
    this.status.isActive = val;
    this.validate(this.value);
    this.emitStatusChange(this.status);
  }
  @Watch('value')
  valueChanged(newVal: any) {
    this.validate(newVal);
    this.emitStatusChange(this.status);
  }
  @Emit('status')
  emitStatusChange(status: any) {
    this.status = status;
  }
  public validate(val: any) {
    this.status.errors = [];
    if (!!this.question.config.required && (this.value == null || this.value == undefined)) {
      this.status.errors.push(this.question.config.required);
    }
    if (!!this.question.config.min && this.value < this.question.config.min.value) {
      this.status.errors.push(this.question.config.min);
    }
    if (!!this.question.config.max && this.value > this.question.config.max.value) {
      this.status.errors.push(this.question.config.max);
    }
    this.status.isValide = this.status.errors.length == 0;
    this.status.value = val;
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

    border: 2px solid var(--purple-dropdown);
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
    border: 2px solid var(--purple-dropdown);
    border-radius: 6px;
    flex-direction: row;
    .unit {
      font-size: 24px;
      display: block;
      padding: 16px 24px;
      background: var(--purple-dropdown);
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
