"use client";

import * as React from "react";
import { useTheme } from "./hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    return (
      <div 
        style={{ 
          width: "72px", 
          height: "36px", 
          borderRadius: "9999px", 
          border: "1.5px solid var(--color-border-subtle)",
          background: "var(--color-bg-subtle)",
          opacity: 0.5 
        }} 
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: "72px",
        height: "36px",
        borderRadius: "9999px",
        border: `1.5px solid ${isDark ? "rgba(242,240,236,0.15)" : "rgba(15,14,12,0.22)"}`,
        background: isDark
          ? "linear-gradient(135deg, #1A1815 0%, #232018 100%)"
          : "linear-gradient(135deg, #F0EFEA 0%, #E3E1DB 100%)",
        cursor: "pointer",
        padding: "3px",
        outline: "none",
        transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
        boxShadow: isDark
          ? "0 2px 8px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "0 2px 8px rgba(15,14,12,0.08), inset 0 1px 0 rgba(255,255,255,0.80)",
      }}
    >
      {/* Track icons — sol y luna */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: "10px",
          fontSize: "11px",
          opacity: isDark ? 0 : 0.45,
          transition: "opacity 200ms ease",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        ☀
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "10px",
          fontSize: "11px",
          opacity: isDark ? 0.55 : 0,
          transition: "opacity 200ms ease",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        ☽
      </span>

      {/* Thumb — ampolleta */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "9999px",
          background: isDark
            ? "linear-gradient(135deg, #2B2820 0%, #333028 100%)"
            : "#FFFFFF",
          boxShadow: isDark
            ? "0 3px 8px rgba(0,0,0,0.60), 0 2px 4px rgba(0,0,0,0.40)"
            : "0 3px 10px rgba(15,14,12,0.18), 0 1px 4px rgba(15,14,12,0.12)",
          transform: isDark ? "translateX(36px)" : "translateX(0)",
          transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1), background 200ms ease, box-shadow 200ms ease",
          willChange: "transform",
        }}
      >
        <BulbIcon isDark={isDark} />
      </span>
    </button>
  );
}

/* ── Ícono SVG de ampolleta inline ──────────────────────── */
function BulbIcon({ isDark }: { isDark: boolean }) {
  const accent      = isDark ? "#FF5722" : "#E8420A";
  const fillGlass   = isDark ? "#333028" : "#FAFAF9";
  const strokeColor = isDark ? "rgba(242,240,236,0.35)" : "rgba(15,14,12,0.20)";
  const filament    = isDark ? "#FFB300" : "#E8420A";
  const glow        = isDark ? "#FF5722" : "transparent";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "all 200ms ease" }}
    >
      {/* Glow detrás solo en dark */}
      {isDark && (
        <circle cx="12" cy="10" r="8" fill={glow} opacity="0.08" />
      )}

      {/* Cuerpo del bulbo */}
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"
        fill={fillGlass}
        stroke={strokeColor}
        strokeWidth="1.2"
      />

      {/* Filamento / efecto de luz */}
      <path
        d="M10 13.5c0-1.1.9-2 2-2s2 .9 2 2"
        stroke={filament}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity={isDark ? 1 : 0.7}
      />

      {/* Base / rosca */}
      <rect x="9" y="17" width="6" height="1.5" rx="0.5" fill={accent} opacity="0.8" />
      <rect x="9.5" y="19" width="5" height="1.5" rx="0.5" fill={accent} opacity="0.6" />

      {/* Rayos de luz — solo dark */}
      {isDark && (
        <>
          <line x1="12" y1="0.5" x2="12" y2="2"   stroke={filament} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <line x1="19" y1="3"   x2="17.8" y2="4.2" stroke={filament} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <line x1="5"  y1="3"   x2="6.2"  y2="4.2" stroke={filament} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </>
      )}
    </svg>
  );
}
