<template>
  <div class="results max-screen">
    <h1>Deine Resultate</h1>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import { Route } from 'vue-router';
import AnalyticsService from '../shared/services/analytics.service';

@Component({
  components: {},
})
export default class Results extends Vue {
  public query: string = '';

  $refs: any;
  public type: boolean = false;

  backToFinder() {
    FinderService.updateValue('index', 0, false);
    this.$router.push({
      path: '/finder' + this.query,
    });
  }

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return [
      new ButtonConfig('Zurück zum Finder', false, () => {
        this.backToFinder();
      }),
    ];
  }

  checkNavType(type: string): void {
    this.type = type == 'vertical';
  }
  mounted() {
    this.updateStatus();
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    AnalyticsService.sendGAEvent('Load', 'Results', 'Navigate', FinderService.values);
  }
}
</script>

<style scoped lang="scss">
.results {
}
</style>
