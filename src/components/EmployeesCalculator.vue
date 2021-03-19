<template>
  <div class="employees-calculator">
    <ul class="factors-table" v-if="!!question.factors">
      <li v-for="(factor, i) in question.factors" :key="i">
        <Input v-bind:config="getConfig(i, factor.time)" v-on:status="(bla)=>{calcStatus(bla, i)}" />
      </li>
    </ul>
    <button class="btn" v-on:click="getStatus()">Berechnen</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import Input from "./DynamicForm/Input.vue";
@Component({
  components: {
    Input,
  },
})
export default class EmployeesCalculator extends Vue {
  @Prop() public question: any;
  public values: number[] = [];
  public value: number = 0;
  mounted() {
    this.question.factors.forEach((el: any) => {
      this.values.push(0);
    });
  }
  getConfig(index: number, unit: string) {
    return {
      type: "input",
      key: "empl" + index,
      unit: unit,
      validators: [
        {
          isValide: (value: any) => {
            return value == null || value == undefined || value >= 0;
          },
          message: "Bitte keine negativen Zahlen einfügen",
        },
      ],
      placeholder: 0,
    };
  }
  calcStatus(bla: any, index: number) {
    let result = 0;
    this.values[index] = !!bla.value ? bla.value : 0;
    for (let i = 0; i < this.question.factors.length; i++) {
      result += this.values[i] * this.question.factors[i].value;
    }
    this.value = result;
  }

  @Emit("status")
  getStatus() {
    
    return Math.ceil(this.value);
  }
}
</script>

<style scoped lang="scss">
.factors-table {
  padding: 0;
  margin: 16px 0;
  list-style: none;
  li {
    margin-bottom: 16px;
  }
}
</style>
