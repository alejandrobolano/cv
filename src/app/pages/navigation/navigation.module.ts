import { NgModule } from '@angular/core';

import { NavigationRoutingModule } from './navigation-routing.module';

import { NavigationComponent } from './navigation.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {NzSpaceModule} from 'ng-zorro-antd/space';


@NgModule({
  imports: [NavigationRoutingModule, NgZorroAntdModule, NzSpaceModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule { }
