export class Answer {
  constructor(public isValid: boolean, public isActive: boolean = false, public errors: any = [], public value: any = null) {
    
  }
  public static empty(): Answer{
    return new Answer(false);
  }
  public static emptyList(len: number): Answer[]{
    let list = [];
    for (let i = 0; i < len; i++) {
      list.push(Answer.empty());
    }
    return list;
  }
}