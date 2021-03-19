<template>
  <div class="grid-select">
    <label v-for="(option, index) in config.options" :key="index">
      <input type="radio" :id="config.key+'_'+index" :value="option.value" v-model="value" />
      <span v-bind:class="{ active: option.value == value }" v-html="option.key"></span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { FinderService } from "../../shared/services/finder.service";

@Component
export default class GridSelect extends Vue {
  private status: any;
  @Prop() private config!: any;
  private value: any = null;

  mounted() {
    this.status = {};
    this.value = FinderService.getValue(this.config.key);
    this.valueChanged(this.value);
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
          message: v.message
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
.grid-select {
  input {
    display: none;
  }
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 10px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px + 20px) {
    grid-template-columns: repeat(3, 1fr);
  }
  label {
    display: block;
    // width: 50%;
    span {
      font-size: 1.5rem;
      &::before {
        content: "";
        display: inline-block;
        width: 0.6em;
        height: 0.6em;
        border-radius: 0.3em;
        background-color: var(--grey);
        margin-right: 8px;
      }
      &.active::before {
        background-color: var(--prim-700);
      }
    }
  }
}
</style>
