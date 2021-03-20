<template>
  <div class="checkbox__container">
    <input
      type="checkbox"
      :id="question.key"
      :name="question.key"
      v-model="question.config.checked"
      ref="input"
    />
    <div>
      <label v-bind:for="question.key" class="">{{ question.config.label }}</label>
      <p v-if="question.description" class="">{{ question.description }}</p>
    </div>
  </div>
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
    if (!!this.question.config.required) {
      if (this.value == null || this.value == undefined) {
        this.status.errors.push(this.question.config.required);
      }
    }
    this.status.isValide = this.status.errors.length == 0;
    this.status.value = val;
  }
}
</script>

<style scoped lang="scss">
.checkbox__container {
  display: flex;
  input {
    margin-right: 1rem;
    height: 1rem;
    width: 1rem;
  }
  p {
    font-size: 1rem;
    color: gray;
  }
}
</style>
