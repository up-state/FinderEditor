export default abstract class QuestionRequestService {
  public static getQuestions() {
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
          required: {message: 'Bitte Wert auswählen'},
        },
        description: `
          Hiermit können wir dir helfen die Programme aus deinem Bundesland für dich zu finden.
          Bitte wähle das Bundesland aus,
          in dem der Sitz deines Unternehmens ist.
        `,
      },
      {
        title: 'Wie alt ist dein Unternehmen?',
        config: {
          type: 'input',
          key: 'age',
          unit: 'Jahre',
          placeholder: 'XX',
          required: {message: 'Bitte Wert auswählen'},
        },
        description: `
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
          Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
          und wir suchen für dich die passenden Angebote.
        `,
      },
    ];
  }
}
