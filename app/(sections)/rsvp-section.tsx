"use client";

import { RsvpPayload } from "@/types/rsvp";
import * as React from "react";
import { toast } from "sonner";

export default function RsvpSection() {
  const [primaryName, setPrimaryName] = React.useState("");
  const [plusOnes, setPlusOnes] = React.useState<string[]>([]);
  const [note, setNote] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const addPlusOne = () => setPlusOnes((prev) => [...prev, ""]);
  const removePlusOne = (index: number) =>
    setPlusOnes((prev) => prev.filter((_, i) => i !== index));

  const updatePlusOne = (index: number, value: string) =>
    setPlusOnes((prev) => prev.map((v, i) => (i === index ? value : v)));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: RsvpPayload = {
      primaryName: primaryName.trim(),
      plusOnes: plusOnes.map((name) => name.trim()).filter(Boolean),
      notes: note.trim(),
    };

    const loading = toast.loading("Submitting RSVP...");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      toast.dismiss(loading);

      if (!res.ok || !data.ok) {
        toast.error(data?.error || "Failed to submit RSVP");
        return;
      }

      toast.success("RSVP submitted!");
      setSubmitted(true);
      setPrimaryName("");
      setPlusOnes([]);
      setNote("");
    } catch (err) {
      toast.dismiss(loading);
      toast.error("Network error while submitting RSVP");
      console.error(err);
    }
  };

  const deadline = "April 10, 2026";

  return (
    <section
      id="rsvp"
      aria-label="RSVP"
      className="relative overflow-hidden bg-[#f1ebe1] text-[#44624a]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="container relative mx-auto px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            <div className="lg:w-[360px] lg:flex-none lg:pt-6">
              <h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.06em] text-[#44624a] sm:text-6xl">
                RSVP
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#44624a]/75">
                Please submit your RSVP on or before
                <br />
                <span className="font-semibold text-[#44624a]">{deadline}</span>
                .
              </p>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#44624a]/75">
                Add your name, and if needed tap the plus to add a plus-one.
              </p>
            </div>

            <div className="min-w-0 flex-1">
              <div className="rounded-2xl bg-white/30 px-6 py-6 shadow-[0_18px_50px_rgba(68,98,74,0.10)] ring-1 ring-[#44624a]/15">
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-[0.22em] text-[#44624a]/60">
                      NAME
                    </label>
                    <input
                      value={primaryName}
                      onChange={(e) => setPrimaryName(e.target.value)}
                      required
                      placeholder="Enter your full name"
                      className="mt-2 w-full rounded-xl border border-[#44624a]/15 bg-white/60 px-4 py-3 text-sm text-[#44624a] outline-none placeholder:text-[#44624a]/35 focus:border-[#44624a]/30"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold tracking-[0.22em] text-[#44624a]/60">
                        PLUS ONE
                      </label>
                      <button
                        type="button"
                        onClick={addPlusOne}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#44624a]/15 bg-white/60 text-[#44624a]/80 transition-colors hover:bg-white"
                        aria-label="Add plus one"
                        title="Add plus one"
                      >
                        +
                      </button>
                    </div>

                    {plusOnes.length ? (
                      <div className="mt-3 space-y-3">
                        {plusOnes.map((value, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <input
                              value={value}
                              onChange={(e) =>
                                updatePlusOne(idx, e.target.value)
                              }
                              placeholder={`Plus one #${idx + 1} name`}
                              className="w-full rounded-xl border border-[#44624a]/15 bg-white/60 px-4 py-3 text-sm text-[#44624a] outline-none placeholder:text-[#44624a]/35 focus:border-[#44624a]/30"
                            />
                            <button
                              type="button"
                              onClick={() => removePlusOne(idx)}
                              className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#44624a]/15 bg-white/60 text-[#44624a]/60 hover:bg-white"
                              aria-label="Remove"
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-[#44624a]/55">
                        No plus one added.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-[0.22em] text-[#44624a]/60">
                      NOTE (OPTIONAL)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Dietary restrictions, song requests, etc."
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border border-[#44624a]/15 bg-white/60 px-4 py-3 text-sm text-[#44624a] outline-none placeholder:text-[#44624a]/35 focus:border-[#44624a]/30"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-[#44624a]/55">
                      We can’t wait to celebrate with you.
                    </p>

                    <button
                      type="submit"
                      className="rounded-full bg-[#44624a] px-7 py-3 text-xs font-semibold tracking-[0.22em] text-[#f1ebe1] shadow-[0_10px_30px_rgba(68,98,74,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
