<template>
  <div class="home container-xs screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <div class="login__container">
      <label for="mail" class="login__label"
        >E-Mail-Adresse/Benutzername</label
      >
      <input
        id="mail"
        type="text"
        class="login__input"
        value="test@meinantrag.de"
      />
    </div>
    <div class="login__container">
      <label for="password" class="login__label">Passwort</label>
      <input
        id="password"
        type="password"
        class="login__input"
        value="FakePSW"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import Progress from '../components/Progress.vue';
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: {
    Progress,
  },
})
export default class Login extends Vue {
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig('Login', false, () => {
      this.toEditor();
    }),
  ];

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  public toEditor(): void {
    this.$router.push({
      path: '/editor',
    });
  }

  mounted() {
    this.updateStatus();
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
