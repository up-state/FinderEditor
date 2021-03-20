<template functional>
  <div style="display: flex; justify-content: center;">
    <div style="width: 2px; height: 200px; background-color: black;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({})
export default class DownArrow extends Vue {}
</script>

<style scoped lang="scss"></style>
