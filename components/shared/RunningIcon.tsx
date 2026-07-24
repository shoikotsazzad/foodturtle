interface RunningIconProps {
  size?: number;
  className?: string;
}

// Custom running-figure icon (drawn in-house, lucide's stroke style) for the
// Pick-up nav tab — avoids pulling in a third-party icon asset with its own
// license/attribution terms.
export default function RunningIcon({ size = 20, className }: RunningIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="16.5" cy="4.5" r="2" />
      <path d="M14.5 8.5 L18 11 L21 12.5" />
      <path d="M12.5 9.5 L8.5 11 L6.5 14" />
      <path d="M12.5 9.5 L14.5 13.5 L12 16.5 L14 21.5" />
      <path d="M14.5 13.5 L10.5 15.5 L7.5 14.5" />
      <path d="M12 16.5 L9 18.5 L5 18.5" />
      <line x1="1" y1="9.5" x2="4" y2="9.5" />
      <line x1="2" y1="12.5" x2="5" y2="12.5" />
      <line x1="3" y1="15.5" x2="6" y2="15.5" />
    </svg>
  );
}
