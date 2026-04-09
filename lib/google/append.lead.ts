import { env } from "../config/env";
import { RsvpPayload } from "@/types/rsvp";
import { getSheetsClient } from "./sheets.client";

export async function appendRsvpToSheet(data: RsvpPayload) {
  const sheets = getSheetsClient();

  const submittedAt = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  const values = [
    [
      submittedAt,
      data.primaryName,
      data.email,
      data.attendance,
      data.notes || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.GOOGLE_SHEET_ID,
    range: `${env.GOOGLE_SHEET_NAME}!A:E`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}
