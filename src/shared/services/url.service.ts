export default abstract class URLService {
  public static getCurrentParams() {
    let params: any = {};
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const entries = urlParams.entries();
    for (const entry of entries) {
      params[entry[0]] = entry[1];
    }
    return params;
  }
  public static changeOneParam(key: string, value: any) {
    let params = URLService.getCurrentParams();
    params[key] = value;
    console.log(key);
  }
  public paramsToString(params: any) {
    // window.history.pushState({}, "", "?index=" + this.currentQuestion);
  }
}
