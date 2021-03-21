<template>
  <div class="editor max-screen">
    <nav class="nav">
      <el-button type="primary"><i class="el-icon-back"></i>Familie</el-button>
      <el-button type="primary" v-on:click="toFinder()"
        ><i class="el-icon-right" />Zum Finder</el-button
      >
    </nav>

    <div class="editor-main">
      <!-- Templates -->
      <div class="box" style="width: 300px; margin-right: 2rem">
        <template-list @append="append" />
      </div>

      <!-- Edit Module -->
      <div class="box" style="flex-grow: 1; margin-right: 2rem">
        <h2 class="box-headline">Module bearbeiten</h2>
        <ul style="list-style: none; margin: 0; padding-left: 0">
          <draggable tag="el-collapse">
            <li v-for="(question, index) in questions" :key="index">
              <el-collapse v-model="activeTab" accordion>
                <el-collapse-item :name="question.key">
                  <template slot="title">
                    <h4 class="editor__header">{{ question.title }}</h4>
                  </template>
                  <div class="collapse-content">
                    <component
                      :is="editorComponent(question)"
                      :question="question"
                      class="editor-component-box"
                    />
                    <toolbar :question="question" class="collapse-toolbar" />
                  </div>
                </el-collapse-item>
              </el-collapse>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import NumberInputEditor from '../components/Editors/NumberInputEditor.vue';
import TextInputEditor from '../components/Editors/TextInputEditor.vue';
import TextAreaEditor from '../components/Editors/TextAreaEditor.vue';
import DropdownInputEditor from '../components/Editors/DropdownInputEditor.vue';
import CheckboxEditor from '../components/Editors/CheckboxEditor.vue';
import TemplateList from '../components/TemplateList.vue';
import Progress from '../components/Progress.vue';
import Toolbar from '../components/Toolbar.vue';
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';
import { Route } from 'vue-router';
import AnalyticsService from '../shared/services/analytics.service';
import draggable from 'vuedraggable';
import { Question } from '@/store/questions';

@Component({
  components: {
    Progress,
    Toolbar,
    draggable,
    TemplateList,
  },
})
export default class Start extends Vue {
  public activeTab = this.questions[0]?.key;

  public append(elements: []) {
    elements.forEach((element) => {
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

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    AnalyticsService.sendGAEvent('Load', 'Start', 'Enter', FinderService.values);
  }
}
</script>
<style scoped lang="scss">
.editor {
  height: 100%;
  max-width: none;
}
.nav {
  margin-top: 40px;
  i {
    margin-right: 1rem;
  }
}
.editor-main {
  display: flex;
  flex-grow: 1;
  margin-top: 3rem;
}

.box {
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  border-radius: 10px;
  padding: 2rem;
  min-height: 60vh;
}

.box-headline {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.collapse-content {
  display: flex;
}
.collapse-toolbar {
  align-self: flex-start;
}

#delete-btn {
  margin-left: auto;
}
.add-element-button {
  margin: 10px 0;
}
.editor-component-box {
  margin-bottom: 20px;
  border-radius: 4px;
  flex-grow: 1;
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
</style>
