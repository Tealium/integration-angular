import { Injectable } from '@angular/core';
@Injectable()
export class TealiumUtagService {
  script_src: string = '';
 
  // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
  constructor() {
    (<any>window).utag_cfg_ovrd = { noview : true };
    (<any>window).utag_data = {};
  }

  // Generic script loader with callback
  getScript( src : string, callback : Function ) {
    let d = document;
    let o = { callback: callback || function(){} };
    let s, t;

    if ( typeof src == "undefined" ) {
      return;
    }

    s = d.createElement("script");s.language="javascript";s.type="text/javascript";s.async=1;s.charset="utf-8";s.src=src;
    if ( typeof o.callback == "function" ) {
      if ( d.addEventListener ) {
        s.addEventListener("load",function(){o.callback()},false);
      } else {
        // old IE support
        s.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.callback()}};
      }
    }
    t = d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
  }

  // Config settings used to build the path to the utag.js file
  setConfig(config : {account : string, profile : string, environment : string}) {
    if ( config.account !== undefined && config.profile !== undefined && config.environment !== undefined ) {
      this.script_src = 'https://tags.tiqcdn.com/utag/' + config.account + '/' + config.profile + '/' + config.environment + '/utag.js';
    }
  }

  // Data layer is optional set of key/value pairs
  track(tealium_event: string, data? : any) {
    if ( this.script_src === '' ) {
      console.log("Tealium config not set.");
      return;
    }
    if ( (<any>window).utag === undefined ) {
      this.getScript( this.script_src, function(){
        (<any>window).utag.track( tealium_event, data );
      });
    } else {
      (<any>window).utag.track( tealium_event, data );
    }
  }

  view(data? : any) {
    this.track("view", data);
  }

  link(data? : any) {
    this.track("link", data);
  }
}
