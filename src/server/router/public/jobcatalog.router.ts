import { createRouter } from '../context';
import {
  createJobCatalogSchema,
  createJobCatalog_BranchSchema,
} from '../../../schema/jobcatalog.schema';

export const jobcatagoryRouter = createRouter()
  .mutation('register-jobcatalog', {
    input: createJobCatalogSchema,
    async resolve({ ctx, input }) {
      const { job_Catalog } = input;
      try {
        const jobCatalog = await ctx.prisma.jobCatalog.create({
          data: {
            job_Catalog,
          },
        });
        console.log('register jobCatalog Successfully');
        return true;
      } catch {
        console.log('error register jobCatalog');
        return false;
      }
    },
  })
  .mutation('register-jobbranch', {
    input: createJobCatalog_BranchSchema,
    async resolve({ ctx, input }) {
      const { job_CatalogBranch, job_id } = input;
      try {
        const jobCatalogBranch = await ctx.prisma.jobCatalogBranch.create({
          data: {
            job_CatalogBranch,
            job_cid: job_id,
          },
        });
      } catch {
        return false;
      }
    },
  })
  .query('getalljobCatalog', {
    async resolve({ ctx }) {
      return ctx.prisma.jobCatalog.findMany();
    },
  })
  .query('getalljobCatalogBranch', {
    async resolve({ ctx }) {
      return ctx.prisma.jobCatalogBranch.findMany();
    },
  });
