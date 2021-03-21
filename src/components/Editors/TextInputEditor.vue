<template>
  <section>
    <form class="text-input-editor">
      <h4>Title</h4>
      <el-input
        type="text"
        v-model="question.title"
        style="width: 100%"
        rows="5"
        clearable
        @change="(e) => updateQuestion({ title: e.target.value })"
      />

      <h4>Platzhalter</h4>
      <el-input
        type="text"
        v-model="question.config.placeholder"
        style="width: 100%"
        rows="5"
        clearable
        @change="updatePlaceholder($event.target.value)"
      />

      <h4>Beschreibungstext</h4>
      <el-input
        type="textarea"
        v-model="question.description"
        style="width: 100%"
        rows="5"
        clearable
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
    this.$store.commit('updateQuestion', { ...this.question, ...x });
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
