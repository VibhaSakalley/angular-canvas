import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent {
  
  @ViewChild('signatureCanvas', { static: true }) signatureCanvas!: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D | any;
  private isDrawing: boolean = false;
  @Input() hgt : number | undefined;
  @Input() wdt : number | undefined;
  @Input() canvasSpecs : any | undefined;
  @Output() onSaveImage = new EventEmitter<string>();

  ngAfterViewInit() {
    this.context = this.signatureCanvas.nativeElement.getContext('2d');
    this.context.lineWidth = 2;
    this.context.lineCap = 'round';

    this.signatureCanvas.nativeElement.addEventListener('mousedown', this.onTouchStart.bind(this));
    this.signatureCanvas.nativeElement.addEventListener('mousemove', this.onTouchMove.bind(this));
    this.signatureCanvas.nativeElement.addEventListener('mouseup', this.onTouchEnd.bind(this));
    this.signatureCanvas.nativeElement.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.signatureCanvas.nativeElement.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.signatureCanvas.nativeElement.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  clearSignature() {
    this.context.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
  }

  saveSignature() {
    let trimmedCanvas = this.trimCanvas(this.signatureCanvas.nativeElement);
    
    this.onSaveImage.emit(trimmedCanvas.toDataURL());
  }

  onTouchStart(event: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    this.context.beginPath();
    this.updateCoordinates(event);
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    this.updateCoordinates(event);
    this.context.lineTo(this.clientX, this.clientY);
    this.context.stroke();
  }

  onTouchEnd() {
    this.isDrawing = false;
    this.context.closePath();
  }

  private clientX: number | any;
  private clientY: number | any;

  private updateCoordinates(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      this.clientX = event.clientX - this.signatureCanvas.nativeElement.offsetLeft;
      this.clientY = event.clientY - this.signatureCanvas.nativeElement.offsetTop;
    } else if (event instanceof TouchEvent) {
      this.clientX = event.touches[0].clientX - this.signatureCanvas.nativeElement.offsetLeft;
      this.clientY = event.touches[0].clientY - this.signatureCanvas.nativeElement.offsetTop;
    }
  }

  trimCanvas(c : any) {
    let ctx = c.getContext('2d'),
    copy: any = document.createElement('canvas').getContext('2d'),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
        top: c.height,
        left: c.width,
        right: 0,
        bottom: 0
    },
    x, y;

    for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
        x = (i / 4) % c.width;
        y = ~~((i / 4) / c.width);

        if (bound.top === c.height) {
            bound.top = y;
        } else if (y < bound.top) {
            bound.top = y;
        }

        if (x > bound.right) {
            bound.right = x;
        }

        if (x < bound.left) {
            bound.left = x;
        }

        if (bound.bottom < y) {
            bound.bottom = y;
        }
      }
    }

    let trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    return copy.canvas;
  }

}
