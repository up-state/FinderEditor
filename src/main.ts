import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'overlayscrollbars/css/OverlayScrollbars.css';
// eslint-disable-next-line import/order
import VueCookies from 'vue-cookies-ts';

Vue.config.productionTip = false;
Vue.use(VueCookies);

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
    this.$store.commit('moveQuestion', { question: questions[2], toIndex: 3 });
    this.$store.commit('removeQuestion', questions[1]);
    this.$store.commit('updateQuestion', { ...questions[0], title: 'Hullebulle' });
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
        key: 'state',
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
        Bitte wähle das Bundesland aus,
        in dem der Sitz deines Unternehmens ist.
      `,
    },
    {
      title: 'Wie alt ist dein Unternehmen?',
      key: 'age',
      config: {
        type: 'number-input',
        key: 'age',
        unit: 'Jahre',
        placeholder: 'XX',
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
        Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
        und wir suchen für dich die passenden Angebote.
      `,
    },
    {
      title: 'Wie alt ist dein Unternehmen?',
      key: 'age2',
      config: {
        type: 'text-input',
        key: 'text',
        placeholder: 'XX',
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
        Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
        und wir suchen für dich die passenden Angebote.
      `,
    },
    {
      title: 'Wie alt ist dein Unternehmen?',
      key: 'age3',
      config: {
        type: 'text-area',
        key: 'text',
        placeholder: 'XX',
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
        Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
        und wir suchen für dich die passenden Angebote.
      `,
    },
    {
      title: 'Habt ihr eine Checkbox?',
      config: {
        type: 'checkbox',
        key: 'option',
        label: 'Informationen',
        description: 'Brauchen sie zusätzliche Informationen zu Ihrem angeforderten Formular?',
        checked: true,
      },
      description: `
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
        Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
        und wir suchen für dich die passenden Angebote.
      `,
    },
  ];
}
