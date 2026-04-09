import { z } from "zod";

export const rsvpSchema = z.object({
  primaryName: z.string().min(2, "Primary name is required"),
  email: z.string().email("Valid email is required"),
  attendance: z.enum(["yes", "no"]),
  notes: z.string().max(2000).default(""),
});
export type RsvpSchema = z.infer<typeof rsvpSchema>;
