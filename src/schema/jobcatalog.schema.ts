import z from "zod";

export const createJobCatalogSchema = z.object({
  job_Catalog: z.string(),
});

export const createJobCatalog_BranchSchema = z.object({
  job_id: z.string(),
  job_CatalogBranch: z.string(),
});

export type CreateJobCatalogInput = z.TypeOf<typeof createJobCatalogSchema>;
export type CreateJobCatalogBranchInput = z.TypeOf<
  typeof createJobCatalog_BranchSchema
>;
