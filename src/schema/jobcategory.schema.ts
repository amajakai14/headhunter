import z from 'zod';

export const createJobCategorySchema = z.object({
  job_Category: z.string(),
});

export const createJobCategory_BranchSchema = z.object({
  job_id: z.string(),
  job_CategoryBranch: z.string(),
});

export type CreateJobCatalogInput = z.TypeOf<typeof createJobCategorySchema>;
export type CreateJobCatalogBranchInput = z.TypeOf<
  typeof createJobCategory_BranchSchema
>;
