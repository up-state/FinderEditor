<template>
  <div class="finder screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <Progress v-bind:values="progressValues" />
    <!-- <transition :name="'direction'" v-for="(question, index) in questions" :key="index"> -->
    <div :name="'direction'" v-for="(question, index) in questions" :key="index">
      <div v-if="index === currentQuestion">
        <article>
          <h2>{{ question.title }}</h2>
          <DynamicForm
            v-if="renderComponent"
            v-bind:config="question.config"
            v-on:status="getStatus"
          ></DynamicForm>
        </article>
        <article>
          <h3>Anmerkungen:</h3>
          <p class="factors-title" v-if="!!question.factorsTitle">
            {{ question.factorsTitle }}
          </p>
          <table class="factors-table" v-if="!!question.factors">
            <tr>
              <th>Arbeitszeit</th>
              <th>Faktor</th>
            </tr>
            <tr v-for="(factor, i) in question.factors" :key="i">
              <td>{{ factor.time }}</td>
              <td>{{ factor.value }}</td>
            </tr>
          </table>
          <p v-html="question.description"></p>
          <button
            class="btn"
            v-if="question.config.key == 'employees'"
            v-on:click="calcIsOpen = true"
          >
            VZÄ-Hilfsrechner öffnen
          </button>
          <EmployeesCalculator
            v-if="question.config.key == 'employees' && calcIsOpen"
            v-bind:question="question"
            v-on:status="setEmployees"
          ></EmployeesCalculator>
        </article>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import DynamicForm from '../components/DynamicForm.vue';
import Progress from '../components/Progress.vue';
import EmployeesCalculator from '../components/EmployeesCalculator.vue';
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import QuestionRequestService from '../shared/services/question-request.service';
import { FinderService } from '../shared/services/finder.service';
import URLService from '../shared/services/url.service';
import AnalyticsService from '../shared/services/analytics.service';
import { Route } from 'vue-router';

@Component({
  components: {
    DynamicForm,
    Progress,
    EmployeesCalculator,
  },
})
export default class Finder extends Vue {
  public buttonsConfig: ButtonConfig[] = [
    new ButtonConfig('Zurück', false, () => {
      this.previous();
    }),
    new ButtonConfig('Weiter', true, () => {
      this.next();
    }),
  ];
  public currentQuestion = 0;
  public questions = QuestionRequestService.getQuestions();
  public status: any;
  public progressValues: any = {};

  // ForCalculator
  public renderComponent = true;
  public calcIsOpen = false;

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    this.progressValues = FinderService.values;
    this.currentQuestion = FinderService.getValue('index');
    this.updateStatus();

    if (this.currentQuestion == this.questions.length - 1) {
      this.buttonsConfig[1].name = 'Fertig';
    } else {
      this.buttonsConfig[1].name = 'Weiter';
    }
  }
  public previous() {
    this.buttonsConfig[1].name = 'Weiter';
    if (this.currentQuestion > 0) {
      FinderService.updateValue('index', --this.currentQuestion);
    } else {
      FinderService.updateValue('index', null, false);
      this.$router.push({
        path: '/' + FinderService.parseValueToUrl(),
      });
    }
    this.progressValues = FinderService.values;
    this.calcIsOpen = false;
    AnalyticsService.sendGAEvent('Click', 'Button', 'Previous', FinderService.values);
  }
  public next() {
    let key = this.questions[this.currentQuestion].config.key;
    if (this.currentQuestion < this.questions.length) {
      FinderService.updateValue(key, this.status.value, false);
      if (this.currentQuestion < this.questions.length - 1) {
        FinderService.updateValue('index', ++this.currentQuestion);
        if (this.currentQuestion == this.questions.length - 1) {
          this.buttonsConfig[1].name = 'Fertig';
        } else {
          this.buttonsConfig[1].name = 'Weiter';
        }
      } else {
        FinderService.updateValue('index', null, false);
        this.$router.push({
          path: '/results' + FinderService.parseValueToUrl(),
        });
      }
    }
    this.progressValues = FinderService.values;
    this.calcIsOpen = false;
    AnalyticsService.sendGAEvent('Click', 'Button', 'Next', FinderService.values);
  }

  public setEmployees(bla: any) {
    let key = this.questions[this.currentQuestion].config.key;
    FinderService.updateValue(key, bla, false);
    this.$router
      .push({
        path: '/finder' + FinderService.parseValueToUrl(),
      })
      .catch(() => {});
    this.progressValues = FinderService.values;
    this.renderComponent = false;
    this.$nextTick().then(() => {
      this.renderComponent = true;
    });
    this.calcIsOpen = false;
  }
  getStatus(status: any) {
    this.status = status;
    if (!status.isValide) {
      this.buttonsConfig[1].disabled = true;
    } else {
      this.buttonsConfig[1].disabled = false;
    }
    this.updateStatus();
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    AnalyticsService.sendGAEvent('Load', 'Finder', 'Enter', FinderService.values);
  }
}
</script>
<style lang="scss">
.finder {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
article {
  background-color: var(--brown);
  padding: 32px 32px 24px 32px;
  box-sizing: border-box;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  // >* {
  //   width: 100%;
  // }
  .factors-title {
  }
  .factors-table {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
    border-spacing: 16px 8px;
    // tr {
    //   >*:first-child {
    //     text-align: right;
    //   }
    //   >*:last-child {
    //     text-align: left;
    //   }
    // }
  }
}
@media (min-width: 768px + 20px) {
}
</style>
