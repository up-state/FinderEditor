<template>
  <div class="dynamic-form">
    <GridSelect
      v-if="!!config && config.type == 'grid-select'"
      v-bind:config="config"
      v-on:status="getStatus"
    ></GridSelect>
    <DropDown
      v-if="!!config && config.type == 'select'"
      v-bind:config="config"
      v-on:status="getStatus"
    ></DropDown>
    <NumberInput
      v-if="!!config && config.type == 'number-input'"
      v-bind:config="config"
      v-on:status="getStatus"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import GridSelect from './DynamicForm/GridSelect.vue';
import NumberInput from './DynamicForm/NumberInput.vue';
import DropDown from './DynamicForm/DropDown.vue';

@Component({
  components: {
    GridSelect,
    NumberInput,
    DropDown,
  },
})
export default class DynamicForm extends Vue {
  @Prop() public config: any;
  mounted() {}
  @Emit('status')
  getStatus(status: any) {
    return status;
  }
}
</script>

<style scoped lang="scss">
.dynamic-form {
  padding: 0 32px;
  margin-bottom: 8px;
}
</style>
