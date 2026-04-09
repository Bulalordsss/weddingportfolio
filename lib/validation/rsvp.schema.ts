import { z } from "zod";

export const rsvpSchema = z.object({
  primaryName: z.string().min(2, "Primary name is required"),
  plusOnes: z.array(z.string()).optional(),
  notes: z.string().max(2000).default(""),
});

export type RsvpSchema = z.infer<typeof rsvpSchema>;
