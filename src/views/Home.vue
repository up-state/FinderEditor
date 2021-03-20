<template>
  <div class="home container-xs screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <nav id="action-footer">
      <button v-on:click="toLogin()" class="btn">Login</button>
      <button v-on:click="toFinder()" class="btn">Direkt zum Förderfinder</button>
    </nav>
  </div>
</template>

<script lang="ts">
import { ButtonConfig } from '@/components/NavFooter/ButtonConfig.class';
import { FinderService } from '@/shared/services/finder.service';
import { Component, Emit, Vue } from 'vue-property-decorator';
import Progress from '../components/Progress.vue';

@Component({
  components: {
    Progress,
  },
})
export default class Start extends Vue {
  public buttonsConfig: ButtonConfig[] = [];

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  public toFinder(): void {
    this.$router.push({
      path: '/start',
    });
  }

  public toLogin(): void {
    this.$router.push({
      path: '/login',
    });
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    if (FinderService.allValuesExist()) {
      this.buttonsConfig = [];
    }
    this.updateStatus();
  }
}
</script>
