import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma, Status } from '../../../../../prisma/server';

const getTasksByUserInput = z.object({
  pageOffset: z.number(),
  pageSize: z.number(),
});

const getTasksByUserOutput = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      status: z.enum(Status),
      completedDate: z.date().nullable(),
    })
  ),
  totalCount: z.number(),
});

export const getTasksByUser = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(getTasksByUserInput)
  .output(getTasksByUserOutput)
  .mutation(async opts => {
    const totalCount = await prisma.task.count({
      where: {
        userId: opts.ctx.userId,
      },
    });

    const data = await prisma.task.findMany({
      where: {
        userId: opts.ctx.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        completedDate: true,
      },
    });
    return { data, totalCount };
  });
