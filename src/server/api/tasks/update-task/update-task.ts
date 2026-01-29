import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma, Status } from '../../../../../prisma/server';
import { rethrowKnownPrismaError } from '@fhss-web-team/backend-utils';

const updateTaskInput = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(Status).optional(),
});

const updateTaskOutput = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(Status),
  completedDate: z.date().nullable(),
});

export const updateTask = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(updateTaskInput)
  .output(updateTaskOutput)
  .mutation(async opts => {
    try {
      const oldTask = await prisma.task.findUnique({
        where: { id: opts.input.id, userId: opts.ctx.userId },
      });

      return await prisma.task.update({
        where: { id: oldTask?.id },
        data: {
          title: opts.input.title,
          description: opts.input.description,
          completedDate: opts.input.status === 'complete' ? new Date() : null,
          status: opts.input.status,
        },
      });
    } catch (error) {
      rethrowKnownPrismaError(error);
      throw error;
    }
  });
