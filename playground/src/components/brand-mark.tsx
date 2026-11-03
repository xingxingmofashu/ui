export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 64"
      className={className}
    >
      <rect width="64" height="64" rx="16" fill="#0a0a0a" />
      <rect
        x="9"
        y="9"
        width="46"
        height="46"
        rx="12"
        fill="#f2f2f2"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="1.5"
      />
      <path
        d="M32 17 C33.7 25 38.9 30.3 47 32 C38.9 33.7 33.7 39 32 47 C30.3 39 25.1 33.7 17 32 C25.1 30.3 30.3 25 32 17 Z"
        fill="#0a0a0a"
      />
      <circle cx="32" cy="32" r="1.6" fill="#f2f2f2" />
    </svg>
  );
}
