<template>
  <div id="app">
    <OverlayScrollbarsComponent
      class="view"
      :options="{ scrollbars: { autoHide: 'scroll' } }"
      :extensions="[]"
    >
      <div class="content">
        <router-view @updateStatus="updateStatus" />
        <NavFooter v-if="!isResultsPage" :buttons="buttons" />
      </div>
    </OverlayScrollbarsComponent>
    <transition name="fscard">
      <FullscreenResultCard v-if="!!offer" v-bind:offer="offer"></FullscreenResultCard>
    </transition>
    <transition name="fscard">
      <FullscreenDescriptionCard
        v-if="!!description"
        v-bind:name="description.name"
        v-bind:text="description.text"
      ></FullscreenDescriptionCard>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { ButtonConfig } from './components/NavFooter/ButtonConfig.class';
import NavHeader from './components/NavHeader.vue';
import FullscreenResultCard from './components/results/FullscreenResultCard.vue';
import FullscreenDescriptionCard from './components/results/FullscreenDescriptionCard.vue';
import AnalyticsService from './shared/services/analytics.service';
import NavFooter from './components/NavFooter/NavFooter.vue';

@Component({
  components: {
    NavHeader,
    OverlayScrollbarsComponent,
    FullscreenResultCard,
    FullscreenDescriptionCard,
    NavFooter,
  },
})
export default class App extends Vue {
  public buttons: ButtonConfig[] = [];
  public scrollMode = true;
  public offer: any = false;
  public description: any = false;
  public cookieBannerVisible = true;
  public gtmProperty = 'UA-180130811-1';
  public gtmTrackerName = 'gtmDefaultTracker';
  $refs: any;

  get isResultsPage(): boolean {
    // yolo
    return this.$route.path.includes('/results');
  }

  updateStatus(buttons: ButtonConfig[]) {
    this.buttons = buttons;
  }

  mounted() {
    AnalyticsService.init(this.$cookies);
    this.cookieBannerVisible = AnalyticsService.cookieBannerVisible;
  }

  enable() {
    AnalyticsService.enable();
    this.cookieBannerVisible = AnalyticsService.cookieBannerVisible;
  }

  disable() {
    AnalyticsService.disable();
    this.cookieBannerVisible = AnalyticsService.cookieBannerVisible;
  }
}
</script>

<style lang="scss">
@import './styles/index.scss';

body {
  background: #f8f9fa;
  color: #00124c;
}

#app {
  display: flex;
  flex-direction: column;
  .view {
    height: 100vh;
    padding: 0;
    &.onscroll {
      margin-right: calc(100vw - 100%);
    }
    @media (min-width: 700px) {
    }
    @media (min-width: 1024px) {
    }
    .content {
      min-height: 100%;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      > * {
        width: 100%;
      }
      footer {
        margin-top: auto;
        text-align: center;
        padding: 1rem;
        a {
          color: #021343;
          padding: 1rem;
        }
        a:hover {
          color: #02134381;
        }
      }
      @media (min-width: 700px) {
        > * {
          width: calc(100% - 32px);
        }
        > .max-screen {
          max-width: 1770px;
        }
        > .screen {
          max-width: 900px;
        }
      }
    }
  }
}
.cookies-banner {
  position: fixed;
  bottom: 0;
  z-index: 100;
  font-size: 20px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  opacity: 1;
  background-color: white;
  &.fscard-enter-active,
  &.fscard-leave-active {
    transition: opacity 0.3s;
  }
  &.fscard-enter, &.fscard-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}

.editor__section {
  padding: 1rem 2rem;
}
</style>
