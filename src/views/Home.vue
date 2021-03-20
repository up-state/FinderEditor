<template>
  <div class="home container-xs screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import Progress from '../components/Progress.vue';
import { FinderService } from '../shared/services/finder.service';
import AnalyticsService from '../shared/services/analytics.service';

@Component({
  components: {
    Progress,
  },
})
export default class Start extends Vue {
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig('Login', false, () => {
      this.toLogin();
    }),
    new ButtonConfig('Direkt zum Förderfinder', false, () => {
      this.toFinder();
    }),
  ];

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  public toResults(): void {
    FinderService.updateValue('index', null, false);
    this.$router.push({
      path: '/results' + FinderService.parseValueToUrl(),
    });
  }

  public toFinder(): void {
    FinderService.updateValue('index', 0, false);
    this.$router.push({
      path: '/start' + FinderService.parseValueToUrl(),
    });
  }

  public toLogin(): void {
    FinderService.updateValue('index', 0, false);
    this.$router.push({
      path: '/login' + FinderService.parseValueToUrl(),
    });
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    if (FinderService.allValuesExist()) {
      this.buttonsConfig = [
        new ButtonConfig('Login', false, () => {
          this.toLogin();
        }),
        new ButtonConfig('Direkt zum Förderfinder', false, () => {
          this.toFinder();
        }),
      ];
    }
    this.updateStatus();
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    AnalyticsService.sendGAEvent('Load', 'Start', 'Enter', FinderService.values);
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
article {
  text-align: left;
  p {
    width: 100%;
  }
}

// article {
//   background-color: var(--brown);
//   padding: 16px;
//   box-sizing: border-box;
//   margin-bottom: 32px;
// }
@media (min-width: 768px + 20px) {
  // .home {
  //   align-items: center;
  // }
  // article {
  //   p {
  //     margin: 0;
  //     font-size: 24px;
  //   }
  // }
}
</style>
