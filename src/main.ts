import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import VueCookies from 'vue-cookies-ts';

Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
  router,
  store,
  created() {
    for (const question of defaultQuestions()) {
      this.$store.commit('addQuestion', question);
    }
  },
  render: h => h(App),
}).$mount('#app');

function defaultQuestions() {
  return [
    {
      title: 'Wo liegt dein Hauptfirmensitz?',
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
      },
      description: `
          Hiermit können wir dir helfen die Programme aus deinem Bundesland für dich zu finden.
          Bitte wähle das Bundesland aus,
          in dem der Sitz deines Unternehmens ist.
        `,
    },
    {
      title: 'Zu welcher Branche gehört dein Unternehmen?',
      config: {
        type: 'select',
        key: 'trade',
        options: [
          {
            key: 'Land- und Forstwirtschaft<br>(inkl. Aquakultur und Fischerei)',
            value: 1,
          },
          { key: 'Bergbau und Gewinnung<br>von Steinen und Erden', value: 2 },
          { key: 'Handel', value: 3 },
          { key: 'Hotel- und Gaststättengewerbe', value: 4 },
          { key: 'Handwerk', value: 5 },
          { key: 'Garten- und Landschaftsbau', value: 6 },
          { key: 'Künstler:in', value: 7 },
          { key: 'Heilberufe', value: 8 },
          { key: 'Venture Capital Gesellschaft', value: 12 },
          { key: 'Technologie', value: 13 },
          { key: 'Sonstiges', value: 11 },
        ],
      },
      description: `
          Für einige Branchen gibt es spezielle Förder- und Hilfsprogramme.
          Lass uns wissen in welcher Branche du tätig bist,
          damit wir dir genauere Vorschläge machen können.
        `,
    },
    {
      title: 'Welche Rechtsform hat dein Unternehmen?',
      config: {
        type: 'select',
        key: 'legal',
        options: [
          { key: 'Personen(gesellschaften)', value: null },

          { key: 'Einzelunternehmer:in', value: 8 },
          { key: 'Freiberufler & Heilberufler', value: 20 },
          { key: 'GbR (BGB-Gesellschaft)', value: 4 },
          { key: 'OHG', value: 7 },
          { key: 'GmbH & Co OHG', value: 18 },
          { key: 'Partnergesellschaft', value: 22 },
          { key: 'KG', value: 11 },
          { key: 'GmbH & Co KG', value: 6 },
          { key: 'AG & Co KG', value: 21 },
          { key: 'Eingetragener Kaufmann (e.K.)', value: 5 },

          { key: 'Kapitalgesellschaften', value: null },

          { key: 'GmbH', value: 1 },
          { key: 'gGmbH (gemeinnützig)', value: 23 },
          { key: 'UG', value: 2 },
          { key: 'gUG', value: 26 },
          { key: 'Verein', value: 27 },
          { key: 'e.V. mit wirtschaftlichem Geschäftsbetrieb', value: 12 },
          { key: 'eingetragen Genossenschaft (eG)', value: 10 },
          { key: 'Genossenschaft (nicht eingetragen)', value: 10 },
          { key: 'AG', value: 14 },
          { key: 'KGaA', value: 15 },

          { key: 'Sonstige', value: null },

          { key: 'Sonstige', value: 25 },
        ],
      },
      description: `
        Die Rechtsform ist der durch Gesetze zwingend vorgeschriebene rechtliche Rahmen von Gesellschaften, mit dem einige gesetzlich vorgegebene Strukturmerkmale verbunden sind und mit dem Gesellschaften am Wirtschaftsleben teilnehmen.
        `,
    },
    {
      title: 'Wie alt ist dein Unternehmen?',
      config: {
        type: 'input',
        key: 'age',
        unit: 'Jahre',
        placeholder: 'XX',
      },
      description: `
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
          Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
          und wir suchen für dich die passenden Angebote.
        `,
    },
  ];
}
