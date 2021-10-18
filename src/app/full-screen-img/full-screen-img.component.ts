import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-full-screen-img',
  templateUrl: './full-screen-img.component.html',
  styleUrls: ['./full-screen-img.component.scss'],
})
export class FullScreenImgComponent implements OnInit {

    @Input()
    imgSrc: string;
    @Input()
    open: boolean;

    @Output()
    close: EventEmitter<boolean> = new EventEmitter();

    @HostListener('document:keydown', ['$event'])
    onKeyPress(event) {
      if ((event.key !== undefined && event.key === 'Esc') || event.key === 'Escape') {
        this.close.emit();
      }
    }

    constructor() {}
  
    ngOnInit() {
    
    }
}