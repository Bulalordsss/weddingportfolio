'use client';

import * as React from 'react';

export default function RsvpSection() {
  const [primaryName, setPrimaryName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [attendance, setAttendance] = React.useState<'yes' | 'no'>('yes');
  const [note, setNote] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Hook up to your backend / Google Form later.
    console.log({ primaryName, email, attendance, note });
  };

  const deadline = 'April 10, 2026';

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
            'radial-gradient(rgba(68,98,74,0.22) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
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
                <span className="font-semibold text-[#44624a]">{deadline}</span>.
              </p>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#44624a]/75">
                Share your name, email, and whether you&apos;ll be celebrating with us.
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
                    <label className="block text-xs font-semibold tracking-[0.22em] text-[#44624a]/60">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="mt-2 w-full rounded-xl border border-[#44624a]/15 bg-white/60 px-4 py-3 text-sm text-[#44624a] outline-none placeholder:text-[#44624a]/35 focus:border-[#44624a]/30"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold tracking-[0.22em] text-[#44624a]/60">
                        ATTENDANCE
                      </label>
                    </div>

                    <div className="mt-3 space-y-3">
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#44624a]/15 bg-white/55 px-4 py-3 text-sm text-[#44624a] transition-colors hover:bg-white/70">
                        <input
                          type="radio"
                          name="attendance"
                          value="yes"
                          checked={attendance === 'yes'}
                          onChange={() => setAttendance('yes')}
                          className="mt-1 h-4 w-4 accent-[#44624a]"
                        />
                        <span>Yes, I will be there!</span>
                      </label>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#44624a]/15 bg-white/55 px-4 py-3 text-sm text-[#44624a] transition-colors hover:bg-white/70">
                        <input
                          type="radio"
                          name="attendance"
                          value="no"
                          checked={attendance === 'no'}
                          onChange={() => setAttendance('no')}
                          className="mt-1 h-4 w-4 accent-[#44624a]"
                        />
                        <span>No, Unfortunately I can&apos;t attend</span>
                      </label>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#44624a]/60">
                      Please note that bringing a plus one or a kid is not allowed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-[0.22em] text-[#44624a]/60">
                      NOTE (OPTIONAL)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Dietary restrictions or any concerns you would like us to know."
                      rows={4}
                      className="mt-2 w-full resize-none rounded-xl border border-[#44624a]/15 bg-white/60 px-4 py-3 text-sm text-[#44624a] outline-none placeholder:text-[#44624a]/35 focus:border-[#44624a]/30"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {submitted ? (
                      <p className="text-sm text-[#44624a]/75">
                        Submitted! (Currently logging to console)
                      </p>
                    ) : (
                      <p className="text-sm text-[#44624a]/55">
                        We can’t wait to celebrate with you.
                      </p>
                    )}

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
