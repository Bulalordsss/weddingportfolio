function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  GOOGLE_CLIENT_EMAIL: required(
    "GOOGLE_CLIENT_EMAIL",
    process.env.GOOGLE_CLIENT_EMAIL,
  ),
  GOOGLE_PRIVATE_KEY: required(
    "GOOGLE_PRIVATE_KEY",
    process.env.GOOGLE_PRIVATE_KEY,
  ).replace(/\\n/g, "\n"),
  GOOGLE_SHEET_ID: required("GOOGLE_SHEET_ID", process.env.GOOGLE_SHEET_ID),
  GOOGLE_SHEET_NAME: process.env.GOOGLE_SHEET_NAME || "RSVP",
};
