import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAltPressed]'
})
export class AltPressedDirective {
  @HostListener('click', ['$event']) onclick(event: Event) { 
    let a = event as KeyboardEvent ;
    console.log(a);
    if(!a.altKey){
      event.stopImmediatePropagation();
      event.preventDefault();
      
    }
  }
  constructor() { }

}
