import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import ElementUI from 'element-ui';
import './styles/variables/colors.scss';
//import 'element-ui/lib/theme-chalk/index.css';
// eslint-disable-next-line import/order
import VueCookies from 'vue-cookies-ts';

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  created() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const questions = defaultQuestions();
    // eslint-disable-next-line no-restricted-syntax
    for (const question of questions) {
      this.$store.commit('appendQuestion', question);
    }
  },
  render: (h) => h(App),
}).$mount('#app');

function defaultQuestions() {
  return [
    {
      title: 'Wo liegt dein Hauptfirmensitz?',
      key: 'state',
      config: {
        type: 'select',
        options: [
          { key: 'Baden-Württemberg', value: 1 },
          { key: 'Bayern', value: 2 },
          { key: 'Berlin', value: 3 },
          { key: 'Brandenburg', value: 4 },
          { key: 'Bremen', value: 5 },
          { key: 'Hamburg', value: 6 },
          { key: 'Hessen', value: 7 },
          { key: 'Mecklenburg-Vorpommern', value: 8 },
          { key: 'Niedersachsen', value: 9 },
          { key: 'Nordrhein-Westfalen', value: 10 },
          { key: 'Rheinland-Pfalz', value: 11 },
          { key: 'Saarland', value: 12 },
          { key: 'Sachsen', value: 13 },
          { key: 'Sachsen-Anhalt', value: 14 },
          { key: 'Schleswig-Holstein', value: 15 },
          { key: 'Thüringen', value: 16 },
        ],
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
Hiermit können wir dir helfen die Programme aus deinem Bundesland für dich zu finden.
Bitte wähle das Bundesland aus, in dem der Sitz deines Unternehmens ist.
      `.trim(),
    },
  ];
}
