<template>
  <div class="home container-xs screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <div class="login__container">
      <label for="mail" class="login__label">E-Mail-Adresse/Benutzername</label>
      <input id="mail" type="text" class="login__input" value="test@meinantrag.de" />
    </div>
    <div class="login__container">
      <label for="password" class="login__label">Passwort</label>
      <input id="password" type="password" class="login__input" value="FakePSW" />
    </div>
    <el-button type="primary" v-on:click="toEditor()">Login</el-button>
  </div>
</template>

<script lang="ts">
import Progress from '../components/Progress.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Progress,
  },
})
export default class Login extends Vue {
  public toEditor(): void {
    this.$router.push({
      path: '/editor',
    });
  }
}
</script>
<style lang="scss">
.login__container {
  margin: 0rem auto 1rem auto;
}
.login__label {
  display: block;
}

.login__input {
  display: block;
  margin-top: 0.25rem;
  width: 250px;
}
</style>
