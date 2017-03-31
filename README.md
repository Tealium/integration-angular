# Tealium Angular Integration [Example]

This example shows how to implement Tealium iQ with your Angular (aka "Angular 2") App.  The code is a "Provider" service using Typescript.

This integration should be considered an example (for now) as opposed to an Angular library on NPM.

If you are looking for previous integration using AngularJS, please see http://github.com/Tealium/integration-angularjs

## Summary

The goal of this integration is to provide a simple wrapper for the Tealium utag.view and utag.link functions for use in Angular.  These functions are used to track link clicks and content view events in your App.  Tealium iQ is a Tag Management System which will subsequently execute "tags" (such as Google Analytics or Adobe Analytics) with the data layer passed through to these vendors.

The wrapper functions for use in an Angular app are 'this.tealium.view' and 'this.tealium.link'

The data layer is passed as an object of key/value pairs to these functions.  The first tracking event call will also invoke asynchronous download of your client-specific utag.js file from Tealium's CDN.

The provider service definition is found in example/src/app/tealium/utag.service.ts

An example of how to configure and invoke the services (i.e. an example of this.tealium.view call) is found in example/src/app/app.component.ts

## Steps to Add the Tealium Utag Service to Your App

1. Create the /tealium directory below your /src/app/ folder in your Angular App

2. Copy the utag.service.ts file to the tealium directory 

3. Use the example found in example/src/app/app.compontent.ts to define/invoke the tealium service in your App

4. Be sure to replace the ##TEALIUM_ACCOUNT##, ##TEALIUM_PROFILE##, ##TEALIUM_ENVIRONMENT## values to your specific values.  Typically the environment value is 'dev' or 'prod'

5. When you want to track a content view event use this.tealium.track

```javascript
  this.tealium.track( "view", { event_name : "prodview", my_key : "my_value", my_products_displayed : ["p1", "p2"] });
```


## Additional Information and Troubleshooting

* This module defines tealium.track which is a wrapper to utag.track

* Set the cookie document.cookie="utagdb=true" in your browser console for debugging output

* Only a specific set of tags in Tealium's Tag Marketplace support the utag.link event tracking and some (i.e. Google Analytics) will require mapping configuration

* Visit community.tealium.com for more details on Tealium iQ and tag-specific configuration


## Set Config

The follow configuration settings are required and passed in to the 'setConfig' function

- **##TEALIUM_ACCOUNT##** (String) Tealium iQ account
- **##TEALIUM_PROFILE##** (String) Tealium iQ profile
- **##TEALIUM_ENVIRONMENT##** (String) Tealium iQ environment ("dev", "qa", "prod")

```javascript
  // The example in app.component.js shows how to configure
  this.tealium.setConfig({ account: '##TEALIUM_ACCOUNT##', profile: '##TEALIUM_PROFILE##', environment: '##TEALIUM_ENVIRONMENT##' });
```

