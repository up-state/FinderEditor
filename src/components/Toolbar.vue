<template>
  <div class="toolbar">
    <ul class="tool-list">
      <li><el-button icon="el-icon-plus" circle></el-button></li>
      <li><el-button @click="deleteQuestion" icon="el-icon-delete" circle></el-button></li>
      <li><el-button icon="el-icon-top-right" circle></el-button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Question } from '@/store/questions';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Toolbar extends Vue {
  @Prop() private question!: Question;

  deleteQuestion(): void {
    this.$store.commit('removeQuestion', this.question);
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  border-radius: 5px;
  padding: 1rem 0.5rem;
  background-color: var(--light-blue);
}
.tool-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
