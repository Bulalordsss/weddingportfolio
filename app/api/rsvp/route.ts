import { appendRsvpToSheet } from "@/lib/google/append.lead";
import { rsvpSchema } from "@/lib/validation/rsvp.schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const normalized = {
      primaryName: String(body?.primaryName ?? "").trim(),
      email: String(body?.email ?? "").trim(),
      attendance: body?.attendance === "no" ? "no" : "yes",
      notes: String(body?.notes ?? body?.note ?? "").trim(),
    };

    const parsed = rsvpSchema.safeParse(normalized);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid payload",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    await appendRsvpToSheet(parsed.data);

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.error("RSVP submit failed:", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
