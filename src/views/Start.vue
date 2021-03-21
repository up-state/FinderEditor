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
    <el-button id="accept-btn" type="primary" v-on:click="toFinder()">Akzeptieren</el-button>
  </div>
</template>

<script lang="ts">
import Progress from '../components/Progress.vue';
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: {
    Progress,
  },
})
export default class Start extends Vue {
  public toFinder(): void {
    this.$router.push({ path: '/finder' });
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
</style>
