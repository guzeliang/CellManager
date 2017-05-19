import { NgModule } from '@angular/core';
import {  RouterLinkStubDirective } from '../testing/router.link.stub.directive';
import {  RouterOutletStubComponent } from '../testing/router.outlet.stub.component';
import { AppModule } from '../app.module';

@NgModule({
    imports: [
        AppModule
    ],
    declarations: [
        RouterLinkStubDirective,
        RouterOutletStubComponent
    ]
})
// fix error: Cannot determine the module for class...
export class FakeRouterModule {
}
