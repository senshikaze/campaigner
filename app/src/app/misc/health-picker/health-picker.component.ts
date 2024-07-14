import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'health-picker',
  standalone: true,
  imports: [
    FormsModule
  ],
  template:`
  <div class="flex flex-col m-2">
    <button (click)="increaseHealth(1)" title="Increase Health by 1" class="p-2 rounded-t-md bg-light-health-up-bg dark:bg-dark-health-up-bg dark:text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 block m-auto">
        <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
    <input
      [(ngModel)]="damage"
      class="grow dark:text-white p-2 placeholder:text-slate-600 dark:placeholder:text-slate-400 bg-light-input-bg dark:bg-dark-input-bg w-20 text-center"
      title="Current Health">
    <button (click)="decreaseHealth(1)" title="Decrease Health by 1" class="p-2 rounded-b-md bg-light-health-down-bg dark:bg-dark-health-down-bg dark:text-slate-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 block m-auto">
        <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  `,
  styles: []
})
export class HealthPickerComponent implements OnInit {
  @Input() maxHealth = 0;
  @Input() currentHealth = 0;
  @Input() allowNegative = false;
  @Output() currentHealthChange = new EventEmitter<number>();
  @Output() changed = new EventEmitter<boolean>();

  /**
   * Emits if this entity loses all health
   */
  @Output() died = new EventEmitter<boolean>();
  /**
   * Emits if this entity recover Health above 0
   */
  @Output() recovered = new EventEmitter<boolean>();
  /**
   * Emits if this entity is below half of maxHealth
   */
  @Output() bloodied = new EventEmitter<boolean>();


  damage = 0;
  ngOnInit(): void {
    if (this.currentHealth == undefined) {
      this.currentHealth = 0;
    }
  }

  decreaseHealth(value: number): void {
    let prevHealth = this.currentHealth;
    this.currentHealth = Math.min(
      this.currentHealth - value,
      (this.allowNegative) ? -Math.abs(this.maxHealth) : 0
    );
    if (prevHealth > 0 && this.currentHealth == 0) {
      this.died.emit(true);
    }
    this.changed.emit(true);
  }

  increaseHealth(value: number): void {
    let prevHealth = this.currentHealth;
    this.currentHealth = Math.max(this.currentHealth + value, this.maxHealth);

    if (prevHealth <= 0 && this.currentHealth > 0) {
      this.died.emit(false);
      this.recovered.emit(true);
    }

    this.changed.emit(true);
  }
}
