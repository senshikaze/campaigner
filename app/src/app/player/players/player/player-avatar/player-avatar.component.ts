import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { UploadButtonComponent } from "../../../../misc/upload-button/upload-button.component";
import { ToastService } from 'src/app/services/toast.service';
import { CommonModule } from '@angular/common';
import { Buffer } from 'buffer';

@Component({
  selector: 'player-avatar',
  standalone: true,
  imports: [
    UploadButtonComponent,
    CommonModule,
  ],
  template: `
    <div
      class="w-32 h-32 border-2 bg-slate-700 border-slate-500 relative"
      title="Character Avatar"
      (mouseenter)="showUpload = true"
      (mouseleave)="showUpload = false"
    >
      @if (player.avatar) {
        <img src="data:image/png; base64, {{player.avatar}}">
      }
      <upload-button
        class="absolute bottom-1 right-1"
        [ngClass]="{'hidden': !showUpload}"
        file_filter="image/*"
        [file_size_limit]="256 * 1024"
        title="Upload Player Avatar"
        (upload)="uploadAvatar($event)"
      ></upload-button>
    </div>
  `,
  styles: ``
})
export class PlayerAvatarComponent implements OnInit {
  @Input() player!: Player;
  @Output() avatarChanged = new EventEmitter<Player>();
  
  showUpload = false;

  constructor(
    private toast: ToastService
  ) {}

  ngOnInit(): void {
  }

  uploadAvatar(blob: ArrayBuffer): void {
    // base64 encode blob for storage in 
    const b64blob = Buffer.from(blob).toString('base64');
    this.player.avatar = b64blob;
    this.avatarChanged.emit(this.player);
  }
}
