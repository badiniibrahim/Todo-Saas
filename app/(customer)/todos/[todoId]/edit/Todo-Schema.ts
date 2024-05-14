import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/)
    .min(5)
    .max(20),
  content: z.string(),
  reviewText: z.string().optional().nullable(),
});

export type TodoType = z.infer<typeof TodoSchema>;
