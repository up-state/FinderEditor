import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

type Config = any;

type Question = {
  title: string;
  key: string;
  description: string;
  config: Config;
};

@Module({ namespaced: false, name: 'questions' })
class Questions extends VuexModule {
  public questions: Question[] = [];

  @Mutation
  public appendQuestion(question: Question): void {
    this.questions.push(question);
  }

  @Mutation
  public insertQuestion({ question, atIndex }: { question: Question; atIndex: number }): void {
    this.questions.splice(atIndex, 0, question);
  }

  @Mutation
  public removeQuestion(question: Question): void {
    this.questions = this.questions.filter((q) => q.key !== question.key);
  }

  @Mutation
  public updateQuestion(question: Question): void {
    this.questions = this.questions.map((q) => (question.key === q.key ? question : q));
  }

  @Mutation
  public moveQuestion({ question, toIndex }: { question: Question; toIndex: number }): void {
    const from = this.questions.findIndex((q) => q.key === question.key);
    this.questions.splice(toIndex, 0, this.questions.splice(from, 1)[0]);
  }
}

export default Questions;
