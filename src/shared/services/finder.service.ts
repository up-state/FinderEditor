import QuestionRequestService from './question-request.service';
import axios from 'axios';

export class FinderService {
  static config: any[] = [];
  static values: any = {};
  static currentOffer: any = null;
  static currentOfferListeners: ((offer: any) => void)[] = [];
  static currentDescriptionListeners: ((description: any) => void)[] = [];

  public static addCurrentOfferListener(listener: (offer: any) => void) {
    this.currentOfferListeners.push(listener);
  }
  public static addCurrentDescriptionListener(listener: (description: any) => void) {
    this.currentDescriptionListeners.push(listener);
  }

  public static loadStatusFromUrl() {
    this.config = QuestionRequestService.getQuestions();
    let queryParams = new URLSearchParams(window.location.search);
    this.values = {
      index: queryParams.get('index') == null ? 0 : parseInt('' + queryParams.get('index')),
    };
    this.config.forEach((element) => {
      let v = queryParams.get(element.config.key);
      this.values[element.config.key] = v == null ? null : parseInt(v);
    });
  }
  public static updateCurrentOffer(offers: any[]) {
    let queryParams = new URLSearchParams(window.location.search);
    let offerId = queryParams.get('offer');
    if (offerId != null) {
      for (let i = 0; i < offers.length; i++) {
        if (offers[i].id == parseInt(offerId)) {
          this.currentOffer = offers[i];
        }
      }
    } else {
      this.currentOffer = null;
    }
    this.currentOfferListeners.forEach((listener) => {
      listener(this.currentOffer);
    });
  }
  public static updateCurrentDescription(current: any) {
    let queryParams = new URLSearchParams(window.location.search);
    let descriptionFlag = !!queryParams.get('description');
    if (descriptionFlag) {
      this.currentDescriptionListeners.forEach((listener) => {
        listener({ name: current.name, text: current.description });
      });
    } else {
      this.currentDescriptionListeners.forEach((listener) => {
        listener(null);
      });
    }
  }
  public static parseValueToUrl(values = this.values): string {
    let params = [];
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        if (values[key] != null) {
          params.push(key + '=' + values[key]);
        }
      }
    }
    if (params.length > 0) {
      return '?' + params.join('&');
    }
    return '';
  }
  public static getValue(key: string): any {
    if (!Object.keys(this.values).length) {
      this.loadStatusFromUrl();
    }
    return this.values[key];
  }
  public static allValuesExist() {
    let condition = true;
    FinderService.config.forEach((element) => {
      let key = element.config.key;
      if (FinderService.values[key] == null || FinderService.values[key] == undefined) {
        // TODO: früher abbrechen
        condition = false;
      }
    });
    return condition;
  }
  public static updateValue(key: string, value: any, doReload: boolean = true) {
    this.values[key] = value;
    if (doReload) window.history.replaceState(null, '', this.parseValueToUrl(this.values));
  }
  public static transformValues() {
    let tmpValues: any = {};
    try {
      this.config.forEach((config) => {
        if (Object.prototype.hasOwnProperty.call(this.values, config.config.key)) {
          let value = this.values[config.config.key];
          let key = config.config.key;
          if (value == null || value == undefined) {
            //throw error
            throw new Error(value + ' ' + key);
          } else {
            if (!!config.config.transform) {
              tmpValues[key] = config.config.transform(value);
            } else {
              tmpValues[key] = value;
            }
          }
        } else {
          // throw error
          throw new Error('');
        }
      });
    } catch (err) {
      return null;
    }
    return tmpValues;
  }
  public static getResults(): any {
    let tmpValues = this.transformValues();

    if (tmpValues != null) {
      return axios.get(location.origin + '/api/offers' + this.parseValueToUrl(tmpValues));
    } else {
      return null;
    }
  }
  public static getTestResults(): any {
    return axios.get(location.origin + '/api/offers');
  }
  public static getDescriptions(): any {
    return axios.get(location.origin + '/api/descriptions');
  }
  public static filterText(text: string): string {
    let replacedText = text;
    this.config.forEach((con) => {
      if (con.config.type === 'select') {
        let replacement = '';
        con.config.options.forEach((option: any) => {
          if (option.value === this.values[con.config.key]) {
            replacement = option.key;
          }
        });
        replacedText = replacedText.replaceAll(
          '&lt;&lt;' + con.config.key + '&gt;&gt;',
          replacement,
        );
      } else {
        replacedText = replacedText.replaceAll(
          '&lt;&lt;' + con.config.key + '&gt;&gt;',
          this.values[con.config.key],
        );
      }
    });

    return replacedText;
  }
}
