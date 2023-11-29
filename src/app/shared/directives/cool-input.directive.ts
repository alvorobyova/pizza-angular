import {
  Directive,
  ElementRef, HostBinding,
  HostListener, Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[coolInput]'
})
export class CoolInputDirective implements OnInit {
  @Input() coolInputDefaultBgColor: string = 'white';
  @Input() coolInputFocusBgColor: string = 'orange';

  constructor(private el: ElementRef,
              private rend: Renderer2) {

  }

  private _backgroundColor: string = '';
  @HostBinding('style.backgroundColor')
  get getBgColor() {
    return this._backgroundColor;
  }

  private _isOnFocus: boolean = false;
  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }

  @HostListener('focus')
  onFocus() {
    this._isOnFocus = true;
    this.changeElementBgColor(this.coolInputFocusBgColor);
  }

  @HostListener('blur')
  onBlur() {
    this._isOnFocus = false;
      this.changeElementBgColor(this.coolInputDefaultBgColor);
  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    // console.log(target);
  }

  ngOnInit() {
    this.changeElementBgColor('white');
    this.rend.setAttribute(this.el.nativeElement, 'placeholder', this.el.nativeElement.getAttribute('placeholder') + '*')
  }

  changeElementBgColor(color: string) {
    this._backgroundColor = color;
    // this.rend.setStyle(this.el.nativeElement, 'background-color', color);
  }

}
