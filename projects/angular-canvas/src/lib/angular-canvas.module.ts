import { NgModule } from '@angular/core';
import { AngularCanvasComponent } from './angular-canvas.component';
import { SignPadComponent } from './sign-pad/sign-pad.component';

@NgModule({
  declarations: [
    AngularCanvasComponent,
    SignPadComponent
  ],
  imports: [
  ],
  exports: [
    AngularCanvasComponent,
    SignPadComponent
  ]
})
export class AngularCanvasModule { }
