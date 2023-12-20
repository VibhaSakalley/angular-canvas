import { NgModule } from '@angular/core';
import { AngularCanvasComponent } from './angular-canvas.component';
import { TestViewComponent } from './test-view/test-view.component';



@NgModule({
  declarations: [
    AngularCanvasComponent,
    TestViewComponent
  ],
  imports: [
  ],
  exports: [
    AngularCanvasComponent,
    TestViewComponent
  ]
})
export class AngularCanvasModule { }
