<template>
  <div class="login-container">
    <img src="@/assets/title.png" id="logo-login" />

    <div style="margin: 10px">
      <label for="mail" class="login__label">E-Mail-Adresse/Benutzername</label>
      <el-input id="mail" type="text" class="login__input" value="mein@antrag.de" />
    </div>
    <div style="margin: 10px">
      <label for="password" class="login__label">Passwort</label>
      <el-input id="password" type="password" class="login__input" value="FakePSW" />
    </div>
    <el-button id="login-btn" type="primary" v-on:click="toEditor()">Login</el-button>
    <p style="font-size: 12px; text-align: center">
      Der Login funktioniert ohne Eingabe von Logindaten.
    </p>
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
.login__label {
  display: block;
}

.login__input {
  display: block;
  margin-top: 0.25rem;
  width: 250px;
}
#login-btn {
  width: 93%;
  margin: 10px;
  margin-top: 25px;
  button {
    margin-bottom: 16px;
    max-width: 320px;
    width: 100%;
    &:last-child {
      margin: 0;
    }
  }
}
.login-container {
  margin: auto;
  width: 20em !important;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 2rem;
}
#logo-login {
  width: 300px;
  margin-bottom: 25px;
}
</style>
