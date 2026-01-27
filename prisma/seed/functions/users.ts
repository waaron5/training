import { prisma } from '../../server';

export const createRandomUsers = async () => {
  await prisma.user.createMany({
    data: [
      {
        accountType: 'Student',
        netId: 'sjhay4',
        firstName: 'jay',
        lastName: 'stock',
        preferredFirstName: 'jay',
        preferredLastName: 'stock',
        id: 'student',
      },
      {
        accountType: 'Employee',
        netId: 'sasudh6',
        firstName: 'sudha',
        lastName: 'sas',
        preferredFirstName: 'su',
        preferredLastName: 'sas',
        id: 'employee',
      },
    ],
  });
};
