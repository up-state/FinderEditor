<template>
  <div class="dynamic-form">
    <NumberInputEditor
      v-if="!!question && question.config.type == 'number-input'"
      v-bind:question="question"
    />
    <div v-else>{{question.config.type}} - {{question.title}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import NumberInputEditor from './Editors/NumberInputEditor.vue';

@Component({
  components: {
    NumberInputEditor
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
