import { faker } from '@faker-js/faker';
import { prisma } from '../../server';

export const createTasks = async () => {
  await prisma.task.createMany({
    data: [
      {
        userId: 'student',
        title: 'professor',
        description: 'lorem ipsum',
      },
      {
        userId: 'student',
        title: 'student',
        description: 'lorem ipsum',
      },
      {
        userId: 'employee',
        title: 'Employee',
        description: 'lorem ipsum',
      },
    ],
  });
};

export const createRandomTasks = async () => {
  const taskArray = [];
  for (let i = 0; i <= 20; i++) {
    taskArray.push({
      userId: 'employee',
      title: faker.book.title(),
      description: faker.lorem.sentences(),
    });
  }
  await prisma.task.createMany({ data: taskArray });
};
