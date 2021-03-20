<template>
  <div class="finder screen">
    <h1>{{ $router.currentRoute.meta.title }}</h1>
    <Progress :steps="questions.length" :currentIndex="currentQuestion" />
    <div :name="'direction'" v-for="(question, index) in questions" :key="index">
      <div v-if="index === currentQuestion">
        <article>
          <h2>{{ question.title }}</h2>
          <DynamicForm v-if="renderComponent" :question="question" v-on:status="getStatus" />
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { ButtonConfig } from '../components/NavFooter/ButtonConfig.class';
import DynamicForm from '../components/DynamicForm.vue';
import Progress from '../components/Progress.vue';
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { FinderService } from '../shared/services/finder.service';
import AnalyticsService from '../shared/services/analytics.service';
import { Route } from 'vue-router';

@Component({
  components: {
    DynamicForm,
    Progress,
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
  public questions = this.$store.state.Questions.questions;
  public currentQuestion = 0;
  public status: any;

  // ForCalculator
  public renderComponent = true;
  public calcIsOpen = false;

  @Emit('updateStatus')
  updateStatus(): ButtonConfig[] {
    return this.buttonsConfig;
  }

  mounted() {
    FinderService.loadStatusFromUrl();
    console.log(FinderService.values);
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
    this.calcIsOpen = false;
    AnalyticsService.sendGAEvent('Click', 'Button', 'Previous', FinderService.values);
  }
  public next() {
    let key = this.questions[this.currentQuestion].key;
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
    this.calcIsOpen = false;
    AnalyticsService.sendGAEvent('Click', 'Button', 'Next', FinderService.values);
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
