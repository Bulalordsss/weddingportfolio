'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-[#44624a]/15', className)}>
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={item.question} className="py-5">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 text-left"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              aria-expanded={open}
            >
              <span className="text-[15px] font-medium leading-snug text-[#44624a]">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  'mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-[#44624a]/20 text-[#44624a]/70 transition-transform',
                  open ? 'rotate-45' : 'rotate-0',
                )}
              >
                <span className="text-lg leading-none">+</span>
              </span>
            </button>

            <div
              className={cn(
                'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out',
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="min-h-0">
                <div className="mt-3 max-w-xl whitespace-pre-line text-sm leading-relaxed text-[#44624a]/75">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
