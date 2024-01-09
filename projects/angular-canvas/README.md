# AngularCanvas

This easy-to-use package is designed to simplify the integration of digital signatures into your Angular applications. Whether you need to enhance the security of your forms, documents, or transactions, our package has got you covered.

## Install

```bash
npm i @e-signature/ng-signature-pad
```

## Quick Code Example

```html
<lib-sign-pad (onSaveImage)="getData($event)"></lib-sign-pad>
```

## Usage Example

```angular

//In Module.ts

....
import { AngularCanvasModule } from '@e-signature/ng-signature-pad';
...

@NgModule({
  imports: [
    AngularCanvasModule
  ]
})
export class AppModule { }

```

```html

//In HTML File

<lib-sign-pad (onSaveImage)="getData($event)"></lib-sign-pad>

//Implement if you want to customize Signature Pad Size

<lib-sign-pad [hgt]="200" [wdt]="400" (onSaveImage)="getData($event)"></lib-sign-pad>

```

```typescript

//In component.ts

getData(event : any){
    // Event contains base64 of image
}


```
