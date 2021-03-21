<template>
  <div class="results max-screen">
    <h1 style="text-align: left">Resultateseite</h1>
    <h4>Auf Basis Ihrer Eingaben haben wir folgende Angebote für Sie.</h4>
    <el-collapse id="results-list" v-for="(result, index) in resultItems" :key="index" accordion>
      <el-collapse-item>
        <template slot="title" style="margin-left: 5px">
          <h4 class="editor__header">{{ result.title }}</h4>
        </template>
        <div class="collapse-content">
          <div style="background: #fff400; width: 5px" />
          <div>{{ result.description }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-button style="margin: 20px" type="primary" v-on:click="toHome()">Startseite</el-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';

@Component({
  components: {},
})
export default class Results extends Vue {
  public query: string = '';
  $refs: any;
  public type: boolean = false;

  public resultItems: any[] = [
    {
      title: 'Wohnen',
      description: 'Wohnberechtigungsschein beantragen',
    },
    {
      title: 'Familie',
      description: 'Wohnberechtigungsschein beantragen',
    },
    {
      title: 'Arbeit',
      description: 'Wohnberechtigungsschein beantragen',
    },
  ];

  toHome() {
    this.$router.push({
      path: '/',
    });
  }
}
</script>

<style scoped lang="scss">
#results-list {
  width: 60em;
}
</style>
