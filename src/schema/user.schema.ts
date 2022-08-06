import z from 'zod';

export const requestOtpSchema = z.object({
  email: z.string(),
  redirect: z.string().default('/'),
});

export const verifyOtpSchema = z.object({
  hash: z.string(),
});
