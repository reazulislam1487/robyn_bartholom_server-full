import { z } from "zod";

const create = z.object({
  title: z.string("Title is required"),
  network: z.string("Network is required"),
  year: z.coerce
    .number("Year is required") // coerce string -> number
    .int("Year must be an integer")
    .min(1900, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  role: z.string("Role is required"),
  description: z.string("Description is required"),
  status: z.string().default("published"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  createdAt: z.preprocess(() => new Date(), z.date()).default(() => new Date()),
});

// ✅ Update Blog Schema (Partial of Create)
export const update = create.partial();
export const portfolio_validations = { create, update };
