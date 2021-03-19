<template>
  <div class="fs-description-card">
    <div class="background"></div>
    <OverlayScrollbarsComponent
      class="full-view"
      :options="{ scrollbars: { autoHide: 'scroll' } }"
      :extensions="[]"
    >
      <div class="content">
        <div class="result-card">
          <h3>{{ name }}</h3>
          <div v-html="text"></div>
        </div>
      </div>
    </OverlayScrollbarsComponent>
    <button class="close">
      <img v-on:click="close()" src="@/assets/close.svg" alt />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { FinderService } from '../../shared/services/finder.service';
@Component({
  components: {
    OverlayScrollbarsComponent,
  },
})
export default class FullscreenDescriptionCard extends Vue {
  @Prop() public name!: string;
  @Prop() public text!: any;
  // @Prop() public link!: string;
  close() {
    // FinderService.updateCurrentOffer(null);
    FinderService.updateValue('index', null, false);
    let query = FinderService.parseValueToUrl();
    this.$router.push({
      path: query,
    });
  }
  isLink(text: string): boolean {
    return text.startsWith('www.') || text.startsWith('http');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fs-description-card {
  &.fscard-enter-active,
  &.fscard-leave-active {
    transition: opacity 0.3s;
  }
  &.fscard-enter, &.fscard-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--prim-900);
    opacity: 0.8;
  }
  .full-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  button.close {
    position: fixed;
    z-index: 6;
    top: 16px;
    right: 16px;
    cursor: pointer;
    border: none;
    padding: 12px;
    outline: none;
    background: var(--prim-800);
    border-radius: 50%;
    img {
      display: block;
      width: 32px;
      height: 32px;
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .result-card {
    position: absolute;
    background-color: white;
    border-radius: 8px;
    padding: 32px 16px 16px 16px;
    margin: 128px 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 700px;
    h3 {
      font-weight: 500;
      font-size: 24px;
      border-bottom: var(--prim-700) 2px solid;
      margin: 0 0 24px 0;
      padding: 0 0 16px 0;
      overflow-wrap: anywhere;
    }
    .details {
    }
  }
}
</style>
