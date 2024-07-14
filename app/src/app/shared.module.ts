import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisPipe } from './pipes/ellipsis.pipe';


/**
 * Used to share stuff across modules
 */

@NgModule({
  declarations: [EllipsisPipe],
  imports: [
    CommonModule
  ],
  exports: [EllipsisPipe]
})
export class SharedModule { }
