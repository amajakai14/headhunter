// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { protectedExampleRouter } from './protected-example-router';
import { userRouter } from './public/users.router';
import { jobcategoryRouter } from './public/jobcategory.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('question.', protectedExampleRouter)
  .merge('user.', userRouter)
  .merge('jobcatagory.', jobcategoryRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
