<template>
  <div class="home container-xs screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <div style="display: flex">
      <div style="flex-grow: 1; margin-right: 2rem">
        <ul style="list-style: none; margin: 0">
          <draggable tag="el-collapse">
            <li v-for="(question, index) in questions" :key="index">
              <el-collapse v-model="activeTab" accordion>
                <el-collapse-item :name="question.key">
                  <template slot="title">
                    <h4>{{ question.title }}</h4>
                    <el-button
                      id="delete-btn"
                      type="danger"
                      v-on:click="deleteQuestion(question)"
                      icon="el-icon-delete"
                      circle
                    />
                  </template>
                  <component
                    :is="editorComponent(question)"
                    :question="question"
                    class="editor-component-box"
                  />
                </el-collapse-item>
              </el-collapse>
            </li>
          </draggable>
        </ul>
      </div>
      <div style="width: 300px">
        <h3>Formelemente einfügen</h3>
        <ul style="list-style: none">
          <li class="add-element-button" v-for="element in elements" :key="element.name">
            <el-button type="primary" @click="element.append">{{ element.name }}</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import NumberInputEditor from '../components/Editors/NumberInputEditor.vue';
import TextInputEditor from '../components/Editors/TextInputEditor.vue';
import TextAreaEditor from '../components/Editors/TextAreaEditor.vue';
import DropdownInputEditor from '../components/Editors/DropdownInputEditor.vue';
import CheckboxEditor from '../components/Editors/CheckboxEditor.vue';
import Progress from '../components/Progress.vue';
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';
import { Route } from 'vue-router';
import AnalyticsService from '../shared/services/analytics.service';
import draggable from 'vuedraggable';
import { Question } from '@/store/questions';

function randomId(): string {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

@Component({
  components: {
    Progress,
    draggable,
  },
})
export default class Start extends Vue {
  public activeTab = this.questions[0]?.key;
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig('Weiter', false, () => {
      this.toFinder();
    }),
  ];

  public get questions() {
    return this.$store.state.Questions.questions;
  }

  editorComponent(question: Question): Vue {
    const inputType = question.config.type;
    const mapping: any = {
      select: DropdownInputEditor,
      'number-input': NumberInputEditor,
      'text-input': TextInputEditor,
      'text-area': TextAreaEditor,
      checkbox: CheckboxEditor,
    };
    return mapping[inputType];
  }

  public elements = [
    {
      name: 'Nummerneingabe',
      append: this.appendNumberInput,
    },
    {
      name: 'TextArea',
      append: this.appendTextArea,
    },
    {
      name: 'Auswahlliste',
      append: this.appendDropdown,
    },
    {
      name: 'Texteingabe',
      append: this.appendTextInput,
    },
    {
      name: 'Checkbox',
      append: this.appendCheckbox,
    },
  ];

  appendDropdown() {
    const key = `dropdown-${randomId()}`;
    const el = {
      title: 'Wo liegt dein Hauptfirmensitz?',
      key,
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
        Bitte wähle das Bundesland aus,
        in dem der Sitz deines Unternehmens ist.
      `,
    };

    this.$store.commit('appendQuestion', el);
  }

  appendNumberInput() {
    const key = `number-input-${randomId()}`;
    const el = {
      title: 'Wie alt ist dein Unternehmen?',
      key,
      config: {
        type: 'number-input',
        unit: 'Jahre',
        placeholder: 'XX',
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
          Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
          und wir suchen für dich die passenden Angebote.
        `,
    };

    this.$store.commit('appendQuestion', el);
  }
  appendTextArea() {
    const key = `text-area-${randomId()}`;
    const el = {
      title: 'Über dein Unternehmen?',
      key,
      config: {
        type: 'text-area',
        placeholder: 'XX',
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
          Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
          Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
          und wir suchen für dich die passenden Angebote.
        `,
    };
    this.$store.commit('appendQuestion', el);
  }

  appendTextInput() {
    const key = `text-input-${randomId()}`;
    const el = {
      title: 'Wie alt ist dein Unternehmen?',
      key,
      config: {
        type: 'text-input',
        placeholder: 'XX',
        required: { message: 'Bitte Wert auswählen' },
      },
      description: `
          Beschreibungstext
        `,
    };

    this.$store.commit('appendQuestion', el);
  }

  appendCheckbox() {
    const key = `number-input-${randomId()}`;
    const el = {
      title: 'Habt ihr eine Checkbox?',
      config: {
        type: 'checkbox',
        key,
        label: 'Informationen',
        description: 'Brauchen sie zusätzliche Informationen zu Ihrem angeforderten Formular?',
        checked: true,
      },
      description: `
        Für junge und bereits etablierte Unternehmen gibt es oft unterschiedliche Förderprogramme.
        Lass uns wissen seit wie vielen Jahren es dein Unternehmen bereits gibt
        und wir suchen für dich die passenden Angebote.
      `,
    };

    this.$store.commit('appendQuestion', el);
  }

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  public toResults(): void {
    FinderService.updateValue('index', null, false);
    this.$router.push({
      path: '/results' + FinderService.parseValueToUrl(),
    });
  }
  public toFinder(): void {
    FinderService.updateValue('index', 0, false);
    this.$router.push({
      path: '/finder' + FinderService.parseValueToUrl(),
    });
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    if (FinderService.allValuesExist()) {
      this.buttonsConfig = [
        new ButtonConfig('Weiter', false, () => {
          this.toResults();
        }),
        new ButtonConfig('Akzeptieren & Kriterien anpassen', false, () => {
          this.toFinder();
        }),
      ];
    }
    this.updateStatus();
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    AnalyticsService.sendGAEvent('Load', 'Start', 'Enter', FinderService.values);
  }
}
</script>
<style lang="scss">
.add-element-button {
  margin: 10px 0;
}
.editor-component-box {
  margin-bottom: 20px;
  border-radius: 4px;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
article {
  text-align: left;
  p {
    width: 100%;
  }
}
// article {
//   background-color: var(--brown);
//   padding: 16px;
//   box-sizing: border-box;
//   margin-bottom: 32px;
// }
@media (min-width: 768px + 20px) {
  // .home {
  //   align-items: center;
  // }
  // article {
  //   p {
  //     margin: 0;
  //     font-size: 24px;
  //   }
  // }
}
</style>
