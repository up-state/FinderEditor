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
                    <h4 class="editor__header">{{ question.title }}</h4>
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
      <template-list @append="append"/>
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
import TemplateList from '../components/TemplateList.vue';
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
    TemplateList,
  },
})
export default class Start extends Vue {
  public activeTab = this.questions[0]?.key;
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig('Weiter', false, () => {
      this.toFinder();
    }),
  ];

  public append(elements: []) {
    elements.forEach(element => {
      this.$store.commit('appendQuestion', element);
    });
  }

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
