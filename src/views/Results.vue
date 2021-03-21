<template>
  <div class="results max-screen">
    <h1 style="text-align: left">Resultateseite</h1>
    <h4>Auf Basis Ihrer Eingaben haben wir folgende Angebote für Sie.</h4>
    <el-collapse id="results-list" v-for="(result, index) in resultItems" :key="index">
      <el-collapse-item>
        <template slot="title" id="result-header" style="background: #dfefff">
          <div style="">
            <i class="el-icon-notebook-2"></i>
            <h4 style="display: inline; margin-left: 10px">{{ result.title }}</h4>
          </div>
        </template>
        <div class="collapse-content">
          <div style="background: #fff400; width: 5px" />
          <div>
            <h4 class="result-title-sub">{{ result.titleA }}</h4>
            <div>{{ result.descriptionA }}</div>
          </div>
          <div>
            <h4 class="result-title-sub">{{ result.titleB }}</h4>
            <div>{{ result.descriptionB }}</div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-button style="margin: 20px" type="primary" v-on:click="toHome()">Startseite</el-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator';

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
      titleA: 'Wohnberechtigungsschein beantragen',
      descriptionA:
        'In Ihrer Lebenslage können Sie beim zuständigen Amt einen Wohnberechtigungsschein beantragen.',
      descriptionB:
        'In Ihrer Lebenslage können Sie beim zuständigen Amt einen Zuschuss zum Umzug beantragen.',
      titleB: 'Zuschuss zum Umzug beantragen',
    },
    {
      title: 'Familie',
      titleA: 'Lorem ipsum dolor sit amet',
      descriptionA:
        'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      titleB: 'Lorem ipsum dolor sit amet',
      descriptionB:
        'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Arbeit',
      titleA: 'Lorem ipsum dolor sit amet',
      descriptionA:
        'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      titleB: 'Lorem ipsum dolor sit amet',
      descriptionB:
        'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
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
.collapse-content {
  padding: 10px;
}
.el-collapse-item__header {
  background: #dfefff !important;
  margin-left: 5px !important;
}
.result-title-sub {
  margin-bottom: 0;
}
</style>
