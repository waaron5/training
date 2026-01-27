import { defineOptions, SeedArguments } from './types';
import { deleteEverything } from './functions/delete';
import { createRandomTasks, createTasks } from './functions/tasks';
import { createRandomUsers } from './functions/users';

export const options = defineOptions({
  seedRandomTasks: {
    type: 'boolean',
    description: 'Seeds Many Tasks',
    short: 'T',
  },
});

export async function seed(args?: SeedArguments) {
  await deleteEverything();
  await createRandomUsers();
  await createTasks();

  if (args?.seedRandomTasks) createRandomTasks();
}
