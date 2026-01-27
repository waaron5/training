import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';

const getTasksByUserInput = z.null();

const getTasksByUserOutput = z.void();

export const getTasksByUser = authorizedProcedure
  .meta({ requiredPermissions: [] })
  .input(getTasksByUserInput)
  .output(getTasksByUserOutput)
  .mutation( opts => {
    console.log(opts.input);
    // Your logic goes here
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' });
  });
