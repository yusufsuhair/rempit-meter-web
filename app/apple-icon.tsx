import { ImageResponse } from "next/og";

// Static export (Cloudflare Pages): rendered once at build time, same helmet as app/icon.svg.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180">
        <rect width="64" height="64" fill="#05010f" />
        <path
          d="M12 40C12 20 20 10 32 10C44 10 52 20 52 40C52 46 47 50 40 50H24C17 50 12 46 12 40Z"
          fill="#e879f9"
        />
        <path
          d="M18 42C18 50 24 54 32 54C40 54 46 50 46 42C46 47 41 50 32 50C23 50 18 47 18 42Z"
          fill="#c94fd8"
        />
        <path
          d="M16 32C16 24 22 20 32 20C42 20 48 24 48 32C48 37 43 39 32 39C21 39 16 37 16 32Z"
          fill="#05010f"
        />
        <path d="M20 27C23 24 27 23 31 23" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
        <rect x="29" y="10" width="6" height="14" rx="3" fill="#05010f" opacity="0.35" />
        <circle cx="32" cy="46" r="2.4" fill="#05010f" />
      </svg>
    ),
    size,
  );
}
