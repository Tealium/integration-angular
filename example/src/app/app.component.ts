import { Component, OnInit } from '@angular/core';
import { TealiumUtagService } from './tealium/utag.service';

@Component({
  selector: 'app-root',
  providers: [TealiumUtagService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Testing App';
  
  constructor(private tealium: TealiumUtagService) {
    this.tealium.setConfig({ account: '##TEALIUM_ACCOUNT##', profile: '##TEALIUM_PROFILE##', environment: 'prod' });
  }

  ngOnInit(): void {
    // The tealium.view function will call the tealium.track function with 'view' as first param
    // Most tags support the 'view' event and many analytics tags also support the 'link' event
    this.tealium.view({event_name: 'init'});
    //this.tealium.track('view', {'event_name' : 'init'});
  }
  // TODO: Add function that will fire for mousedown on specifically tagged items

}

