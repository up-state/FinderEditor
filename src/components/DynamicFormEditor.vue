<template>
  <div class="dynamic-form">
    <NumberInputEditor
      v-if="!!question && question.config.type == 'number-input'"
      v-bind:question="question"
    />
    <TextAreaEditor
      v-if="!!question && question.config.type == 'text-area'"
      v-bind:question="question"
    />
    <DropdownInputEditor
      v-if="!!question && question.config.type == 'select'"
      v-bind:question="question"
    />
    <div v-else>{{ question.config.type }} - {{ question.title }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import NumberInputEditor from './Editors/NumberInputEditor.vue';
import TextAreaEditor from './Editors/TextAreaEditor.vue';
import DropdownInputEditor from './Editors/DropdownInputEditor.vue';

@Component({
  components: {
    NumberInputEditor,
    TextAreaEditor,
    DropdownInputEditor,
  },
})
export default class DynamicFormEditor extends Vue {
  @Prop() public question: any;
}
</script>

<style scoped lang="scss">
.dynamic-form {
  padding: 0 32px;
  margin-bottom: 8px;
}
</style>
