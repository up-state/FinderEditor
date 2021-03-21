<template>
  <div id="home">
    <img src="@/assets/title.png" id="title" />
    <nav id="buttons">
      <el-button type="primary" v-on:click="toLogin()">Login</el-button>
      <el-button type="primary" v-on:click="toFinder()">Direkt zum Förderfinder</el-button>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import Progress from '../components/Progress.vue';

@Component({
  components: {
    Progress,
  },
})
export default class Start extends Vue {
  public toFinder(): void {
    this.$router.push({
      path: '/finder',
    });
  }

  @Emit('updateStatus')
  updateStatus(): [] {
    return [];
  }

  mounted(){
    this.updateStatus();
  }

  public toLogin(): void {
    this.$router.push({
      path: '/login',
    });
  }
}
</script>
<style scoped lang="scss">
#home {
  margin: auto;
  width: 55em !important;
}
#title {
  width: 30em;
  float: left;
  margin-right: 5em;
}
#buttons {
  width: 20em;
  float: right;
  button {
    margin-bottom: 16px;
    max-width: 320px;
    width: 100%;
    &:last-child {
      margin: 0;
    }
  }
}
</style>
