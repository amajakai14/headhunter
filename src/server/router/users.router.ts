import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { resolve } from 'path';
import { requestVerifySchema, verifySchema } from '../../schema/user.schema';
import { createRouter } from './context';
import * as trpcServer from '@trpc/server';
import { baseUrl } from '../../constants/baseURL';
import { sendLoginEmail } from '../../utils/mailer';
import { useSession } from 'next-auth/react';
import { decode64, encode64 } from '../../utils/base64';
import { date } from 'zod';

export const userRouter = createRouter()
  .mutation('request-verify-user', {
    input: requestVerifySchema,
    async resolve({ ctx, input }) {
      try {
        const { email } = input;
        const result = await ctx.prisma.user.findFirst({
          where: {
            email: email,
          },
          select: {
            id: true,
            emailVerified: true,
          },
        });
        // if (result?.emailVerified) {
        //   throw new trpcServer.TRPCError({
        //     code: 'FORBIDDEN',
        //     message: 'this email has been verified already',
        //   });
        // }
        console.log('id', result?.id, 'email', email);
        // const token = encode64(`${result?.id}:${email}`);
        // console.log(token);
        sendLoginEmail({
          token: encode64(`${result?.id}:${email}`),
          email,
          url: baseUrl,
        });
        console.log(`email was sent to ${email}`);
        return true;
      } catch {
        console.log('error occurs sendding mail');
      }
    },
  })
  .mutation('verify-user', {
    input: verifySchema,
    async resolve({ input, ctx }) {
      console.log(input.hash);
      console.log(decode64(input.hash));
      const decoded = decode64(input.hash).split(':');
      const [id, email] = decoded;
      console.log('id', id, 'email', email);
      const getUser = await ctx.prisma.user.findFirst({
        where: {
          id,
          email,
        },
        select: { id: true },
      });
      console.log('user', getUser);
      if (getUser) {
        const updateUser = await ctx.prisma.user.update({
          where: {
            id,
          },
          data: {
            emailVerified: new Date(),
          },
        });
      }
    },
  });
