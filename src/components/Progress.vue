<template>
  <div class="progress">
    <div class="progressbar">
      <div class="value" v-bind:style="{ width: progress  + '%' }">
        <div class="progressposition" v-bind:class="progressposition" >{{ currentIndex + 1 }} / {{ steps }}</div>
      </div>
    </div>

    <!-- {{values}} -->
    <!-- TODO: Add answers -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
  @Prop() private steps!: number;
  @Prop() private currentIndex!: number;

  public get progress() {
    return ((this.currentIndex + 1)  / this.steps) * 100;
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
    color: #ffffff;
    background-color: var(--light-grey);
    @media (min-width: 700px) {
      border-radius: 12px;
    }

    .progressposition {
      line-height: 24px;
      color: #ffffff;
      font-weight: bold;
      height: 24px;
      width:50px;
      text-align: center;
      float: right;
    }

  }
  .value {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: var(--purple);
    transition: 0.5s width;
    @media (min-width: 700px) {
      border-radius: 12px;
    }
  }
}
</style>
