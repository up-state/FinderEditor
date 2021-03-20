import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

type Question = any;

@Module({ namespaced: true, name: 'questions' })
class Questions extends VuexModule {
  public questions: Question[] = [];

  @Mutation
  public addQuestion(question: Question): void {
    this.questions.push(question);
  }
}

export default Questions;
