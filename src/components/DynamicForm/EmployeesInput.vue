<template>
  <label class="input">
    <input
      type="number"
      v-model.number="value"
      ref="input"
      :id="config.key"
      :placeholder="config.placeholder"
      @focus="setActive(true)"
      @blur="setActive(false)"
    />
    <span v-if="!!config.unit" class="unit">{{config.unit}}</span>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderService } from "../../shared/services/finder.service";

@Component
export default class EmployeesInput extends Vue {
  private status: any;
  @Prop() private config!: any;
  private value: any = null;
  public $refs: any;

  mounted() {
    this.status = {};
    this.value = FinderService.getValue(this.config.key);
    this.valueChanged(this.value);
    this.$refs.input.focus();
  }

  setActive(val: boolean) {
    this.status.isActive = val;
    this.validate(this.value);
    this.emitStatusChange(this.status);
  }
  @Watch("value")
  valueChanged(newVal: any) {
    this.validate(newVal);
    this.emitStatusChange(this.status);
  }
  @Emit("status")
  emitStatusChange(status: any) {
    this.status = status;
  }
  public validate(val: any) {
    this.status.errors = [];
    this.config.validators.forEach((v: any) => {
      if (!v.isValide(val)) {
        this.status.errors.push({
          message: v.message,
        });
      }
    });
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
  border: 2px solid #007d8c;
  border-radius: 6px;
  overflow: hidden;
  input {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    font-size: 24px;
    letter-spacing: 1px;
    color: black;
    border: none;
      text-align: center;
    outline: none !important;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
  .unit {
    display: none;
  }
  @media (min-width: 500px) {
    .unit {
    font-size: 24px;
    display: block;
    padding: 16px 24px;
    background: #007d8c;
    color: white;
    }
    input {
      text-align: left;
    }
  }
}
</style>
