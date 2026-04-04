'use client';

import * as React from 'react';

export type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
};

export function BottomSheet({
  open,
  onOpenChange,
  title,
  children,
}: BottomSheetProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/30"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-2xl">
        <div className="rounded-t-3xl bg-[#f7f0e6] text-[#34271f] shadow-2xl">
          <div className="px-6 pt-3">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-[#34271f]/25" />
          </div>

          <div className="px-6 pb-8 pt-6">
            {title ? (
              <h3 className="font-serif text-3xl tracking-[-0.04em]">
                {title}
              </h3>
            ) : null}
            <div className={title ? 'mt-4' : ''}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
