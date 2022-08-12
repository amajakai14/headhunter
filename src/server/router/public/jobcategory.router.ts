import { createRouter } from '../context';
import {
  createJobCategorySchema,
  createJobCategory_BranchSchema,
} from '../../../schema/jobcategory.schema';

export const jobcategoryRouter = createRouter()
  .mutation('register-jobcategory', {
    input: createJobCategorySchema,
    async resolve({ ctx, input }) {
      const { job_Category } = input;
      try {
        await ctx.prisma.jobCategory.create({
          data: {
            job_Category,
          },
        });
        console.log('register jobCategory Successfully');
        return true;
      } catch {
        console.log('error register jobCategory');
        return false;
      }
    },
  })
  .mutation('register-jobbranch', {
    input: createJobCategory_BranchSchema,
    async resolve({ ctx, input }) {
      const { job_CategoryBranch, job_id } = input;
      try {
        await ctx.prisma.jobCategoryBranch.create({
          data: {
            job_CategoryBranch,
            job_cid: job_id,
          },
        });
      } catch {
        return false;
      }
    },
  })
  .query('getalljobCategory', {
    async resolve({ ctx }) {
      return ctx.prisma.jobCategory.findMany();
    },
  })
  .query('getalljobCategoryBranch', {
    async resolve({ ctx }) {
      return ctx.prisma.jobCategoryBranch.findMany();
    },
  });
