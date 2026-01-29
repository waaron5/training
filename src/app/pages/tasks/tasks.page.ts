import { Component, inject } from '@angular/core';
import { trpcResource } from '@fhss-web-team/frontend-utils';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
})
export class TasksPage {
  private readonly trpc = inject(trpcResource);

  private readonly taskResources = this.trpc.tasks.getTasksByUser({});
}
