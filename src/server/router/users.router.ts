import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { serialize } from 'cookie';
import { resolve } from 'path';
import {
  createUserSchema,
  requestOtpSchema,
  verifyOtpSchema,
} from '../../schema/user.schema';
import { createRouter } from './context';
import * as trpcServer from '@trpc/server';
import { decode64, encode64 } from '../../utils/base64';
import { baseUrl } from '../../constants';
import { sendLoginEmail } from '../../utils/mailer';
import { signJWT } from '../../utils/jwt';
import * as bcrypt from 'bcrypt';
