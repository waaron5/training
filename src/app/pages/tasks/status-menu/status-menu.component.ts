import { Component, model, output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import type { Status } from '../../../../../prisma/app';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status-menu',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './status-menu.component.html',
  styleUrl: './status-menu.component.scss',
})
export class StatusMenuComponent {
  readonly status = model.required<Status>();
  readonly changed = output();

  protected setStatus(newStatus: Status) {
    this.status.set(newStatus);
    this.changed.emit();
  }
}
