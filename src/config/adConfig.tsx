import React from 'react';

/**
 * Global flag to toggle reserved advertisement slots.
 * Disabled by default (false) so no placeholder boxes, layout shifts, or clutter appear to visitors.
 * When set to true, fixed-height containers render below the tool and within the article area,
 * strictly away from interactive controls and download buttons.
 */
export const ADS_ENABLED = false;

export interface ReservedAdSlotProps {
  position: 'below-tool' | 'in-article';
  label?: string;
}

export const ReservedAdSlot: React.FC<ReservedAdSlotProps> = ({
  position,
  label = 'Advertisement',
}) => {
  if (!ADS_ENABLED) {
    return null;
  }

  const heightClass = position === 'below-tool' ? 'h-[90px] sm:h-[100px]' : 'h-[250px]';

  return (
    <aside
      aria-label={label}
      data-ad-slot={position}
      className={`my-8 w-full max-w-4xl mx-auto rounded-lg border border-[#e5e5e5] bg-[#f8f9fa] flex flex-col items-center justify-center overflow-hidden ${heightClass}`}
    >
      <span className="text-[11px] uppercase tracking-widest text-[#14213d]/50 font-mono mb-1">
        {label}
      </span>
      <div className="w-full flex-1 flex items-center justify-center text-xs text-[#14213d]/40">
        {/* Ad network script mounts here when ADS_ENABLED is true */}
      </div>
    </aside>
  );
};
