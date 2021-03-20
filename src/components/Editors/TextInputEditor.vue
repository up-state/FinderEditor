<template>
  <section>
  <form class="text-input-editor">
    <h3>Title</h3>
    <input
      type="text"
      :value="question.title"
      @change="e => updateQuestion({title: e.target.value})"
    />
    <h3>Platzhalter</h3>
    <input
      type="text"
      :value="question.config.placeholder"
      @change="updatePlaceholder($event.target.value)"
    />
    <h3>Beschreibungstext</h3>
    <textarea
      type="text"
      :value="question.description"
      @change="updateDescription($event.target.value)"
    />
  </form>

  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';

@Component
export default class TextInputEditor extends Vue {
  @Prop() private question!: any;

  updateDescription(description: string) {
    this.question.description = description;
    this.$store.commit('updateQuestion', this.question);
  }
  updatePlaceholder(placeholder: string) {
    this.question.config.placeholder = placeholder;
    this.$store.commit('updateQuestion', this.question);
  }
  updateQuestion(x: any) {
    this.$store.commit('updateQuestion', {...this.question, ...x})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text-input-editor {
  display: flex;
  flex-direction: column;
  textarea {
    height: 100px;
  }
}
</style>
