import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicDirective } from "./dynamic.directive";


@Component({
  template: `<ng-template dynamicDirective></ng-template>`
})
class TestComponent {
  @ViewChild(DynamicDirective, {static: true}) dynamicDirective!: DynamicDirective;
}

describe('DynamicDirectiveDirective', () => {
  it('should create an instance', () => {
    const directive = new TestComponent().dynamicDirective;
    expect(directive).toBeTruthy();
  });
});
