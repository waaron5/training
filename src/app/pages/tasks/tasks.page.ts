import { Component, inject, signal, viewChild } from '@angular/core';
import { trpcResource } from '@fhss-web-team/frontend-utils';
import { TRPC_CLIENT } from '../../utils/trpc.client';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TaskCardComponent } from './task-card/task-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  imports: [
    MatProgressSpinnerModule,
    MatPaginator,
    TaskCardComponent,
    MatIconModule,
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  private readonly dialog = inject(MatDialog);

  protected openCreateDialog() {
    this.dialog
      .open(NewTaskComponent)
      .afterClosed()
      .subscribe(isSaved => {
        if (isSaved) {
          this.taskResource.refresh();
        }
      });
  }

  protected readonly PAGE_SIZE = 8 as const;
  private readonly pageOffset = signal(0);

  protected handlePageEvent(e: PageEvent) {
    this.pageOffset.set(e.pageIndex * e.pageSize);
  }

  private readonly trpc = inject(TRPC_CLIENT);
  protected readonly taskResource = trpcResource(
    this.trpc.tasks.getTasksByUser.mutate,
    () => ({
      pageSize: this.PAGE_SIZE,
      pageOffset: this.pageOffset(),
    }),
    { autoRefresh: true }
  );

  protected readonly paginator = viewChild.required(MatPaginator);

  protected async taskDeleted() {
    await this.taskResource.refresh();
    if (
      this.pageOffset() != 0 &&
      this.taskResource.value()?.data.length === 0
    ) {
      this.paginator().previousPage();
    }
  }
}
