export abstract class NotificationService {
  public static async requestNotificationPermission() {
    const permission = await window.Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Permission not granted for Notification");
    } else {
    }
  }
  public static async registerServiceWorker() {
    console.log(123123123);
    
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw-test/sw.js"+location.search, { scope: "/sw-test/sw.js"+location.search })
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
    // const swRegistration = await navigator.serviceWorker.register(
    //   "/sw-test/sw.js"+location.search
    // );
    // return swRegistration;
  };
  public static unregister() {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        // console.log(registration);
        
        registration.unregister();
      }
    });
  }
  public static showLocalNotification(title: any, body: any, swRegistration: any) {
    const options = {
      body,
    };
    swRegistration.showNotification(title, options);
  };
  public static async main() {
    this.unregister();
     //Reaktion einfügen

    const swRegistration = await this.registerServiceWorker();
    // const permission = await this.requestNotificationPermission();
    // this.showLocalNotification(
    //   "This is title",
    //   "this is the message",
    //   swRegistration
    // );
  }

}

  //   if ("serviceWorker" in navigator) {

  //   }
  // }

  // handlePermission(permission: any) {}
  // askNotificationPermission() {
  //   if (!("Notification" in window)) {
  //     console.log("This browser does not support notifications.");
  //   } else {
  //     Notification.requestPermission((status) => {
  //       let i = 0;
  //       var interval = window.setInterval(function () {
  //         var n = new Notification("Hi! " + i);
  //         if (i++ == 9) {
  //           window.clearInterval(interval);
  //         }
  //       }, 200);
  //     });
  //   }