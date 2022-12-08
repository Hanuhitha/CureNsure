// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    auth: {
      CLIENT_ID: 'C80tagz8dap6DWlHEh5Dj2mt0t8jFuqc',
      CLIENT_DOMAIN: 'auth.sandbox.medeintegra.dev',
      AUDIENCE: 'https://play.medeintegra.dev',
      IAM_EXCHANGE_URL: 'https://iam.play.medeintegra.dev/aths-clinic-app/token/exchange'
    },
    firebase: {
      apiKey: 'AIzaSyBvXf4eesggGB4Wj-HJDsKxvtFB5bUiKNk',
      authDomain: 'medeintegra-playground.firebaseapp.com',
      databaseURL: 'https://medeintegra-playground.firebaseio.com',
      projectId: 'medeintegra-playground',
      storageBucket: 'medeintegra-playground.appspot.com',
      messagingSenderId: '396262727773',
      appId: '1:396262727773:web:8b94de541e5f5143992db4',
      measurementId: 'G-J25C07QW9G'
    },
    medexApps: {
      consult: 'http://localhost:4200',
      pharmacy: 'http://localhost:4400',
      lab: 'http://localhost:4500',
    },

    loginApi: {
      url:"http://localhost:8080",
      list: "/list",  
      login: "/login",
      filterByDoctor:"/filterDoc"

    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  