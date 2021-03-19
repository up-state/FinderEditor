// cookiesAllowed.subscribe(allowed => {
//   if (allowed)
//     optin();
// });

// export default {
//   cookiesAllowed,
//   optin,
//   optout,
//   sendGAEvent
// }
export default class AnalyticsService {
  private static gtmProperty = 'GTM-THC2RPB';
  private static gtmTrackerName = 'gtmDefaultTracker'; // this name must be explicitly configured in the Tag Manager.
  private static disableStr = 'ga-disable';
  public static allowed: any = null;
  public static cookieBannerVisible: any = true;
  public static $cookies: any;

  public static init($cookies: any) {
    this.$cookies = $cookies;
    if(this.$cookies.get("allow") != undefined) {
      this.allowed = this.$cookies.get("allow");
      this.cookieBannerVisible = false;
    }
    this.sendGAEvent('Page', 'enter');
  }

  public static enable() {
    // console.log('enabled');
    
    this.cookieBannerVisible = false;
    this.allowed = true;
    this.$cookies.set("allow", true, { expires: "365d" });
    this.sendGAEvent('Cookies', 'allow');
  }

  public static disable() {
    // console.log('disabled');
    this.cookieBannerVisible = false;
    this.allowed = false;
    this.$cookies.set("allow", false, { expires: "365d" });
  }

  public static sendGAEvent(name: string, category: any, label?: any, value?: any) {
    
    let w: any = window;
    // console.log(w.gtag);
    // console.log(this.allowed);
    
    if (this.allowed) {
      let config: any = {
        event_category: category
      }
      if(!!value) {
        config['event_value'] = value;
      }
      if(!!label) {
        config['event_label'] = label;
      }
      // console.log(123);
      
      // console.log(config);
      w.gtag("event", name, config);
    }
  }
}