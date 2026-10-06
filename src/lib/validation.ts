import { z } from "zod";

export const voteQuantitySchema = z.object({
  votes: z.coerce
    .number({ invalid_type_error: "Enter a valid number of votes" })
    .int("Votes must be a whole number")
    .positive("Votes must be greater than zero")
    .max(10000, "Maximum is 10,000 votes"),
});

export const digitsOnlyOnChange = (value: string): string =>
  value.replace(/\D/g, "");
