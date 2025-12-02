import { z } from "zod";

const create = z.object({
  attorneyName: z.string(),
  firm: z.string(),
  email: z.string().email(),
  phone: z.string(),
  caseType: z.enum(["Criminal", "Civil", "Family", "Corporate"]),
  retainerInterest: z
    .enum(["Consultation", "Full Retainer", "Expert Witness"])
    .optional(),
  briefCaseSummary: z.string().max(500),
  documents: z.array(z.string()).optional(),
});

export const case_review_requtest_validations = { create };
