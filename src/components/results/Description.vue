<template>
  <div class="description" v-bind:class="{ minimizable: minimizable }">
    <div
      class="content"
      ref="content"
      v-bind:style="{ '--height': !minimizable || min ? 200 + 'px' : maxHeight + 'px' }"
    >
      <p v-html="html"></p>
      <span
        class="gradient"
        v-bind:style="{ height: !minimizable || min ? 5 + 'px' : 0 + 'px' }"
      ></span>
    </div>
    <button class="btn" v-if="minimizable" v-on:click="min = !min">Mehr Informationen</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Description extends Vue {
  @Prop() public text!: string;
  @Prop() public resultsExist!: boolean;
  private min = true;
  private maxHeight = 0;
  public $refs: any;

  get html(): string {
    return this.text;
  }
  get minimizable(): boolean {
    return !!this.resultsExist;
  }
  beforeUpdate(): void {
    this.maxHeight = this.$refs.content.scrollHeight;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  box-sizing: border-box;
  padding: 16px;
  background-color: #f9f6f2;
  border-radius: 8px;
  border: 2px white solid;
  &.minimizable .content {
    .gradient {
      --size: 30px;
      position: absolute;
      bottom: 0;
      width: calc(100% - 2 * var(--size));
      height: 5px;
      box-shadow: #000000 0 calc(-2 * var(--size)) calc(2 * var(--size));
      margin-left: var(--size);
      margin-bottom: calc(-2 * var(--size));
      transition: height 0.5s;
    }
    position: relative;
    font-size: 24px !important;
    * {
      font-size: 24px !important;
    }
    height: var(--height, 200px);
    overflow-y: hidden;
    transition: 0.5s height;
    margin-bottom: 16px;
    table {
      border: none;
      tr {
        border: none !important;
        td {
          border: none;
          border-bottom: 4px solid var(--dark-brown);
        }
      }
    }
  }
}
</style>
