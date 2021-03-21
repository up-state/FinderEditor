<template>
  <nav id="action-footer">
    <el-button
      v-for="(button, index) in buttons"
      type="primary"
      :key="index"
      :disabled="button.disabled"
      v-on:click="button.listener"
    >
      {{ button.name }}
    </el-button>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { ButtonConfig } from './ButtonConfig.class';
@Component
export default class NavFooter extends Vue {
  @Prop()
  public buttons!: ButtonConfig[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#action-footer {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  // max-width: 1024px;
  box-sizing: border-box;
  button {
    margin-bottom: 16px;
    max-width: 320px;
    width: 100%;
    &:last-child {
      margin: 0;
    }
  }
  @media (min-width: 700px) {
    flex-direction: row;
    button {
      width: calc(50% - 8px);
      margin: 0 16px 0 0;
      // width: 100%;
    }
  }
}
</style>
