<template>
  <nav class="template-list">
    <h2 class="box-headline">Wählen Sie Ihre Module aus</h2>
    <ul>
      <li v-for="mockupPatternKey in Object.keys(mockupPatterns)" :key="mockupPatternKey">
        <el-button
          class="template-btn"
          type="secondary"
          @click="append(mockupPatterns[mockupPatternKey])"
          >{{ mockupPatternKey }}</el-button
        >
      </li>
    </ul>
    <h2 class="box-headline">Leere Formelemente</h2>
    <ul>
      <li v-for="patternKey in Object.keys(emptyPatterns)" :key="patternKey">
        <el-button
          class="template-btn"
          type="secondary"
          @click="append(emptyPatterns[patternKey])"
          >{{ patternKey }}</el-button
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';

function randomId(): string {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

@Component({
  components: {},
})
export default class TemplateList extends Vue {
  @Emit('append')
  public append(element: any): void {
    return element.elements;
  }

  public emptyPatterns = {
    Nummerneingabe: [this.NumberInputPattern()],
    TextArea: [this.TextAreaPattern()],
    Auswahlliste: [this.dropdownPattern()],
    Texteingabe: [this.textInputPattern()],
    Checkbox: [this.checkboxPattern()],
  };

  public mockupPatterns = {
    Postleitzahl: [
      this.NumberInputPattern(
        'Wie lautet Ihre Postleitzahl',
        '000000',
        null,
        'Eine Postleitzahl besteht aus 6 Ziffern von 6 Ziffern von 0 bis 9.',
      ),
    ],
    Wohnort: [
      this.textInputPattern(
        'Wie lautet Ihr Wohnort',
        'Name des Ortes',
        'Bitte geben Sie hier den Namen des Ortes ein. Nur der Erstwohnsitz',
      ),
    ],
    'Vor- und Nachname': [
      this.textInputPattern('Wie lautet Ihr Vorname', 'Vorname', ''),
      this.textInputPattern('Wie lautet Ihr Nachname', 'Nachname', ''),
    ],
  };

  checkboxPattern(
    title: string = 'Neue Kontrollbox',
    label: string = '',
    checked: boolean = false,
    description: string = '',
  ) {
    return {
      title,
      config: {
        type: 'checkbox',
        key: `number-input-${randomId()}`,
        label,
        description,
        checked,
      },
      description,
    };
  }

  dropdownPattern(
    title: string = 'Neue Listenauswahl',
    options: { key: string; value: number }[] = [],
    description: string = '',
  ) {
    return {
      title,
      key: `dropdown-${randomId()}`,
      config: {
        type: 'select',
        options,
        required: { message: 'Bitte Wert auswählen' },
      },
      description,
    };
  }

  NumberInputPattern(
    title: string = 'Neues Zahleneingabefeld',
    placeholder: string = '',
    unit: string | null = null,
    description: string = '',
  ) {
    return {
      title,
      key: `number-input-${randomId()}`,
      config: {
        type: 'number-input',
        unit,
        placeholder,
        required: { message: 'Bitte Wert auswählen' },
      },
      description,
    };
  }
  TextAreaPattern(
    title: string = 'Neues Freitextfeld',
    placeholder: string = '',
    description: string = '',
  ) {
    return {
      title,
      key: `text-area-${randomId()}`,
      config: {
        type: 'text-area',
        placeholder,
        required: { message: 'Bitte Wert auswählen' },
      },
      description,
    };
  }

  textInputPattern(
    title: string = 'Neues Textfeld',
    placeholder: string = '',
    description: string = '',
  ) {
    return {
      title,
      key: `text-input-${randomId()}`,
      config: {
        type: 'text-input',
        placeholder,
        required: { message: 'Bitte Wert auswählen' },
      },
      description,
    };
  }
}
</script>
<style lang="scss">
.template-list {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 32px;
  }

  .box-headline {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }

  .template-btn {
    max-width: 320px;
    width: 100%;
  }
}
</style>
