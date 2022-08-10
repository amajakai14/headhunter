import z from 'zod';

export const requestVerifySchema = z.object({
  email: z.string(),
});

export const verifySchema = z.object({
  hash: z.string(),
});
