<template>
  <div>
    <NumberInputEditor
      v-if="!!question && question.config.type == 'number-input'"
      v-bind:question="question"
    />
    <TextInputEditor
      v-else-if="!!question && question.config.type == 'text-input'"
      v-bind:question="question"
    />
    <TextAreaEditor
      v-else-if="!!question && question.config.type == 'text-area'"
      v-bind:question="question"
    />
    <DropdownInputEditor
      v-else-if="!!question && question.config.type == 'select'"
      v-bind:question="question"
    />
    <CheckboxEditor
      v-if="!!question && question.config.type == 'checkbox'"
      v-bind:question="question"
    />
    <div v-else>{{ question.config.type }} - {{ question.title }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import NumberInputEditor from './Editors/NumberInputEditor.vue';
import TextInputEditor from './Editors/TextInputEditor.vue';
import TextAreaEditor from './Editors/TextAreaEditor.vue';
import DropdownInputEditor from './Editors/DropdownInputEditor.vue';
import CheckboxEditor from './Editors/CheckboxEditor.vue';


@Component({
  components: {
    NumberInputEditor,
    TextInputEditor,
    TextAreaEditor,
    DropdownInputEditor,
    CheckboxEditor,
  },
})
export default class DynamicFormEditor extends Vue {
  @Prop() public question: any;
}
</script>

<style scoped lang="scss"></style>
