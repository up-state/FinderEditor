<template>
  <div id="app">
    <OverlayScrollbarsComponent
      class="view"
      :options="{ scrollbars: { autoHide: 'scroll' } }"
      :extensions="[]"
    >
      <div class="contend">
        <router-view @updateStatus="updateStatus" />
        <NavFooter v-bind:buttons="buttons"></NavFooter>
        <footer>
          ©2020 taxy.io GmbH |
          <a href="https://www.taxy.io/impressum">Impressum</a> |
          <a href="https://www.wir-bleiben-liquide.de/datenschutz">Datenschutz</a> |
          <a href="mailto:hallo@wir-bleiben-liqui.de">hallo@wir-bleiben-liqui.de</a>
        </footer>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import { Route } from 'vue-router';
import { ButtonConfig } from './components/NavFooter/ButtonConfig.class';
import NavHeader from './components/NavHeader.vue';
import NavFooter from './components/NavFooter/NavFooter.vue';
import FullscreenResultCard from './components/results/FullscreenResultCard.vue';
import FullscreenDescriptionCard from './components/results/FullscreenDescriptionCard.vue';
import AnalyticsService from './shared/services/analytics.service';

@Component({
  components: {
    NavHeader,
    NavFooter,
    OverlayScrollbarsComponent,
    FullscreenResultCard,
    FullscreenDescriptionCard,
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

  updateStatus(buttons: ButtonConfig[]) {
    this.buttons = buttons;
  }

  mounted() {
    // console.log(this.$router);

    // this.$cookies.remove('allow');
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

  // disableCookies() {
  //   this.cookieBannerVisible = false;
  //   // AnalyticsService.disableCookies();
  //   this.$cookies.set("allow", true, { expires: "365d" });
  //   AnalyticsService.allowed = true;
  // }
  // enableCookies() {
  //   this.cookieBannerVisible = false;
  //   // AnalyticsService.enableCookies();
  //   this.$cookies.set("allow", false, { expires: "365d" });
  //   AnalyticsService.allowed = false;
  //   let g = (function (w: any, d: any, s: any, l: any, i: any) {
  //     w[l] = w[l] || [];
  //     w[l].push({
  //       "gtm.start": new Date().getTime(),
  //       event: "gtm.js",
  //     });
  //     var f = d.getElementsByTagName(s)[0],
  //       j = d.createElement(s),
  //       dl = l != "dataLayer" ? "&l=" + l : "";
  //     j.async = true;
  //     j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  //     f.parentNode.insertBefore(j, f);
  //   })(window, document, "script", "dataLayer", this.gtmProperty);
  //   console.log(g);

  // }
}
</script>

<style lang="scss">
@import './styles/index.scss';
#app {
  display: flex;
  flex-direction: column;
  .view {
    // TODO: custom styling https://kingsora.github.io/OverlayScrollbars/#!documentation/styling
    // margin-top: 86px;
    // height: calc(100vh - 86px);
    height: 100vh;
    padding: 0;
    &.onscroll {
      margin-right: calc(100vw - 100%);
    }
    @media (min-width: 700px) {
      // margin-top: 120px;
      // height: calc(100vh - 120px);
      // height: 100vh;
    }
    @media (min-width: 1024px) {
      // padding: 0 64px;
    }
    .contend {
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      > * {
        width: 100%;
      }
      footer {
        text-align: center;
        a {
          padding: 16px;
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
// $extra-small: 700px; xs
// $small: 200px; s
// $medium: 400px; m
// $large: 500px; l
// $extra-large: 1000px; xl
</style>
