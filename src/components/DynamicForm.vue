<template>
  <div class="dynamic-form">
    <!-- <GridSelect v-if="inputType === 'grid-select'" :question="question" @status="getStatus" /> -->
    <DropDown v-if="inputType === 'select'" :question="question" @status="getStatus" />
    <NumberInput v-if="inputType === 'number-input'" :question="question" @status="getStatus" />
    <TextInput v-if="inputType === 'text-input'" :question="question" @status="getStatus" />
    <TextArea v-if="inputType === 'text-area'" :question="question" @status="getStatus" />
    <Checkbox v-if="inputType === 'checkbox'" :question="question" @status="getStatus" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import GridSelect from './DynamicForm/GridSelect.vue';
import NumberInput from './DynamicForm/NumberInput.vue';
import TextInput from './DynamicForm/TextInput.vue';
import TextArea from './DynamicForm/TextArea.vue';
import DropDown from './DynamicForm/DropDown.vue';
import Checkbox from './DynamicForm/Checkbox.vue';
import { Question } from '@/store/questions';

@Component({
  components: {
    GridSelect,
    NumberInput,
    TextInput,
    TextArea,
    DropDown,
    Checkbox,
  },
})
export default class DynamicForm extends Vue {
  @Prop() public question!: Question;

  get inputType() {
    return this.question?.config?.type;
  }

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
