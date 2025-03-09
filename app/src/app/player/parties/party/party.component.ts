import { Component, Input, OnInit } from '@angular/core';
import { Party } from 'src/app/interfaces/party';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'party',
  standalone: true,
  imports: [],
  template: `
    <p>
      party works!
    </p>
  `,
  styles: ``
})
export class PartyComponent implements OnInit {
  @Input() party!: Party;


  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    
  }
}
