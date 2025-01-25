import { Component, Directive, ViewChild, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[dynamicDirective]',
  standalone: true
})
export class DynamicDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
