import { prisma } from '../../server';

export const deleteEverything = async () => {
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();
};
