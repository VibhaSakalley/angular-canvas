import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-angular-canvas',
  template: `
  <h3></h3>
    <lib-sign-pad [hgt]="hgt" [wdt]="wdt" (onSaveImage)="onSaveImage($event)"></lib-sign-pad>
  `,
  styles: [
  ]
})
export class AngularCanvasComponent {

  @Input() hgt : number | undefined;
  @Input() wdt : number | undefined;
  @Output() exportImg = new EventEmitter<string>();

  onSaveImage(eve : any){
    console.log('eve: ', eve);
    this.exportImg.emit(eve);
  }

}
