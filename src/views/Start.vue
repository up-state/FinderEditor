<template>
  <div class="home container-xs screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <article>
      <h2>Was bieten wir?</h2>
      <p>Wir bieten weder Rechts- noch Steuerberatung an.</p>
      <p>
        Bei diesem
        <b>Angebot</b> handelt es sich lediglich um einen
        <b>kostenfreien und unverbindlichen Informationszugang</b> für alle, die aufgrund
        (drohender) Liquiditätsengpässe finanzielle Unterstützung benötigen.
      </p>
      <p>
        Die Plattform bietet diese Unterstützung nicht selbst an, hilft aber dabei, passende
        Angebote von Finanzinstituten einzugrenzen.
      </p>
      <p>
        Bei Fragen rechtlicher, steuerlicher oder finanzplanerischer Natur sollten Experten der
        jeweiligen Themenfelder oder die Finanzinstitute selbst konsultiert werden.
      </p>
    </article>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import Progress from '../components/Progress.vue';
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';
import { Route } from 'vue-router';
import AnalyticsService from '../shared/services/analytics.service';

@Component({
  components: {
    Progress,
  },
})
export default class Start extends Vue {
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig('Akzeptieren', false, () => {
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
      path: '/finder' + FinderService.parseValueToUrl(),
    });
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    if (FinderService.allValuesExist()) {
      this.buttonsConfig = [
        new ButtonConfig('Akzeptieren', false, () => {
          this.toResults();
        }),
        new ButtonConfig('Akzeptieren & Kriterien anpassen', false, () => {
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
