<template>
  <div class="progress">
    <div class="progressbar">
      <div class="value" v-bind:style="{ width: progress + '%' }"></div>
    </div>
    <!-- {{values}} -->
    <!-- TODO: Add answers -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
  @Prop() private values!: any;
  private startZero = 0;

  public get progress() {
    return (this.startZero * 100 * (this.values.index + 1)) / (Object.keys(this.values).length - 1);
  }
  mounted() {
    setTimeout(() => {
      this.startZero = 1;
    }, 0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.progress {
  display: block;
  margin-bottom: 32px;
  .progressbar {
    display: block;
    position: relative;
    width: 100%;
    height: 24px;
    background-color: var(--light-grey);
    @media (min-width: 700px) {
      border-radius: 12px;
    }
  }
  .value {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: var(--prim-700);
    transition: 0.5s width;
    @media (min-width: 700px) {
      border-radius: 12px;
    }
  }
}
</style>
