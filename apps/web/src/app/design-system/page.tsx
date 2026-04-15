"use client";

import { ThemeToggle } from "@repo/ui/theme-toggle";
import { MagneticButton } from "@repo/ui/magnetic-button";
import { RevealOnScroll, StaggerChildren, HoverScale } from "@repo/ui/animations";
import { Header } from "@repo/ui/header";

/* ── Swatch helper ──────────────────────────────────────── */
function Swatch({
  bg,
  label,
  border,
  textColor,
}: {
  bg: string;
  label: string;
  border?: string;
  textColor?: string;
}) {
  return (
    <HoverScale scale={1.05}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div
        style={{
          width: "100%",
          height: "64px",
          borderRadius: "var(--radius-md)",
          background: bg,
          border: border ?? "1.5px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-sm)",
        }}
      />
      <span
        style={{
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-wide)",
          textTransform: "uppercase",
          color: textColor ?? "var(--color-text-tertiary)",
          fontWeight: "var(--weight-semibold)",
        }}
      >
        {label}
      </span>
    </div>
    </HoverScale>
  );
}

/* ── Scale row helper ───────────────────────────────────── */
function ScaleRow({
  label,
  value,
  preview,
}: {
  label: string;
  value: string;
  preview?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        padding: "var(--space-3) 0",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <span
        style={{
          minWidth: "120px",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-tertiary)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "var(--tracking-wide)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          minWidth: "80px",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {value}
      </span>
      {preview && <div style={{ flex: 1 }}>{preview}</div>}
    </div>
  );
}

/* ── Section wrapper ────────────────────────────────────── */
function Section({
  title,
  tag,
  children,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <RevealOnScroll direction="up" viewportMargin={0.1}>
      <section
      style={{
        padding: "var(--space-16) 0",
        borderBottom: "1.5px solid var(--color-border-subtle)",
      }}
    >
      <div style={{ marginBottom: "var(--space-8)" }}>
        <span
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-accent)",
          }}
        >
          {tag}
        </span>
        <h2
          style={{
            marginTop: "var(--space-2)",
            fontSize: "var(--text-xl)",
            fontWeight: "var(--weight-bold)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-text-primary)",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
      </section>
    </RevealOnScroll>
  );
}

/* ── PÁGINA PRINCIPAL ───────────────────────────────────── */
export default function DesignSystemPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Header />

      {/* ── Hero ───────────────────────────────────────── */}
      <div
        style={{
          marginTop: "100px", // offset for fixed header
          maxWidth: "var(--container-xl)",
          margin: "0 auto",
          padding: "var(--space-24) var(--space-8) 0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-4)",
          }}
        >
          v1.0 · 2026
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--text-3xl), 7vw, var(--text-5xl))",
            fontWeight: "var(--weight-regular)",
            lineHeight: "var(--leading-tight)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--color-text-primary)",
            maxWidth: "16ch",
            marginBottom: "var(--space-6)",
          }}
        >
          Sistema de{" "}
          <span
            style={{
              backgroundColor: "var(--color-highlight)",
              color: "var(--color-text-primary)",
              padding: "0 0.15em",
              borderRadius: "var(--radius-sm)",
            }}
          >
            diseño
          </span>
        </h1>
        <p
          style={{
            fontSize: "var(--text-md)",
            color: "var(--color-text-secondary)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "50ch",
            marginBottom: "var(--space-32)",
          }}
        >
          Tokens, tipografía, espaciado y componentes base para{" "}
          <em>Te lo imprimo</em> — estudio de diseño de objetos.
        </p>

        {/* ─────────────────────────────────────────── */}
        {/* SECCIÓN: COLORES                            */}
        {/* ─────────────────────────────────────────── */}
        <Section title="Paleta cromática" tag="01 — Colores">
          {/* Fondos & Superficies */}
          <div style={{ marginBottom: "var(--space-8)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Fondos
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              <Swatch bg="var(--color-bg-base)"     label="bg-base" />
              <Swatch bg="var(--color-bg-subtle)"   label="bg-subtle" />
              <Swatch bg="var(--color-bg-muted)"    label="bg-muted" />
              <Swatch bg="var(--color-surface-1)"   label="surface-1" />
              <Swatch bg="var(--color-surface-2)"   label="surface-2" />
              <Swatch bg="var(--color-surface-3)"   label="surface-3" />
            </div>
          </div>

          {/* Acento */}
          <div style={{ marginBottom: "var(--space-8)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Acento rojo-naranja
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              <Swatch bg="var(--color-accent)"       label="accent" textColor="var(--color-bg-base)" />
              <Swatch bg="var(--color-accent-hover)"  label="accent-hover" textColor="var(--color-bg-base)" />
              <Swatch bg="var(--color-accent-muted)"  label="accent-muted" />
              <Swatch bg="var(--color-accent-light)"  label="accent-light" />
            </div>
          </div>

          {/* Highlight */}
          <div style={{ marginBottom: "var(--space-8)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Highlight / Cursor
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              <Swatch bg="var(--color-highlight)"       label="highlight" />
              <Swatch bg="var(--color-highlight-muted)" label="highlight-muted" />
              <Swatch bg="var(--color-highlight-bg)"    label="highlight-bg" />
            </div>
          </div>

          {/* Texto */}
          <div>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-4)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Texto
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              <Swatch bg="var(--color-text-primary)"   label="text-primary"   textColor="var(--color-bg-base)" />
              <Swatch bg="var(--color-text-secondary)"  label="text-secondary" textColor="var(--color-bg-base)" />
              <Swatch bg="var(--color-text-tertiary)"   label="text-tertiary"  textColor="var(--color-bg-base)" />
              <Swatch bg="var(--color-text-disabled)"   label="text-disabled" />
            </div>
          </div>
        </Section>

        {/* ─────────────────────────────────────────── */}
        {/* SECCIÓN: TIPOGRAFÍA                         */}
        {/* ─────────────────────────────────────────── */}
        <Section title="Escala tipográfica" tag="02 — Tipografía">
          {/* Display */}
          <div style={{ marginBottom: "var(--space-10)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Display — DM Serif Display
            </p>
            {(
              ["display-2xl", "display-xl", "display-lg"] as const
            ).map((cls) => (
              <div
                key={cls}
                style={{
                  borderBottom: "1px solid var(--color-border-subtle)",
                  paddingBottom: "var(--space-4)",
                  marginBottom: "var(--space-4)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className={cls}
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Te lo imprimo
                </span>
                <code
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "var(--tracking-wide)",
                    whiteSpace: "nowrap",
                  }}
                >
                  .{cls}
                </code>
              </div>
            ))}
          </div>

          {/* Headings */}
          <div style={{ marginBottom: "var(--space-10)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Headings — Inter
            </p>
            {(
              ["heading-xl", "heading-lg", "heading-md", "heading-sm"] as const
            ).map((cls) => (
              <div
                key={cls}
                style={{
                  borderBottom: "1px solid var(--color-border-subtle)",
                  paddingBottom: "var(--space-3)",
                  marginBottom: "var(--space-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className={cls}
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Diseño de objetos únicos
                </span>
                <code
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "var(--tracking-wide)",
                    whiteSpace: "nowrap",
                  }}
                >
                  .{cls}
                </code>
              </div>
            ))}
          </div>

          {/* Body */}
          <div>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Body & Labels
            </p>
            {(
              ["body-lg", "body-base", "body-sm", "label-lg", "label-sm"] as const
            ).map((cls) => (
              <div
                key={cls}
                style={{
                  borderBottom: "1px solid var(--color-border-subtle)",
                  paddingBottom: "var(--space-3)",
                  marginBottom: "var(--space-3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className={cls}
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Minimal, moderno, premium — impresión 3D
                </span>
                <code
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "var(--tracking-wide)",
                    whiteSpace: "nowrap",
                  }}
                >
                  .{cls}
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ─────────────────────────────────────────── */}
        {/* SECCIÓN: SOMBRAS                            */}
        {/* ─────────────────────────────────────────── */}
        <Section title="Sombras premium" tag="03 — Shadows">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            {[
              { name: "--shadow-xs", label: "xs" },
              { name: "--shadow-sm", label: "sm" },
              { name: "--shadow-md", label: "md" },
              { name: "--shadow-lg", label: "lg" },
              { name: "--shadow-xl", label: "xl" },
              { name: "--shadow-2xl", label: "2xl" },
              { name: "--shadow-accent-sm", label: "accent-sm" },
              { name: "--shadow-accent-md", label: "accent-md" },
            ].map(({ name, label }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", alignItems: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--color-surface-1)",
                    border: "1px solid var(--color-border-subtle)",
                    boxShadow: `var(${name})`,
                  }}
                />
                <code
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  shadow-{label}
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ─────────────────────────────────────────── */}
        {/* SECCIÓN: ESPACIADO                          */}
        {/* ─────────────────────────────────────────── */}
        <Section title="Sistema de espaciado" tag="04 — Spacing">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              ["--space-1",  "4px"],
              ["--space-2",  "8px"],
              ["--space-3",  "12px"],
              ["--space-4",  "16px"],
              ["--space-6",  "24px"],
              ["--space-8",  "32px"],
              ["--space-10", "40px"],
              ["--space-12", "48px"],
              ["--space-16", "64px"],
              ["--space-20", "80px"],
              ["--space-24", "96px"],
            ].map(([token, px]) => (
              <ScaleRow
                key={token}
                label={token!}
                value={px!}
                preview={
                  <div
                    style={{
                      height: "12px",
                      width: `var(${token})`,
                      background: "var(--color-accent)",
                      borderRadius: "var(--radius-sm)",
                      opacity: 0.75,
                      minWidth: "4px",
                    }}
                  />
                }
              />
            ))}
          </div>
        </Section>

        {/* ─────────────────────────────────────────── */}
        {/* SECCIÓN: COMPONENTES                        */}
        {/* ─────────────────────────────────────────── */}
        <Section title="Componentes interactivos" tag="05 — Componentes">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-8)",
              padding: "var(--space-10)",
              background: "var(--color-bg-subtle)",
              borderRadius: "var(--radius-xl)",
              border: "1.5px solid var(--color-border-subtle)",
              flexWrap: "wrap",
            }}
          >
            <ThemeToggle />
            <div>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--weight-semibold)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Interruptor de tema
              </p>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-tertiary)",
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                Persiste en <code style={{ fontFamily: "var(--font-mono)", background: "var(--color-highlight-bg)", padding: "0 4px", borderRadius: "var(--radius-sm)" }}>localStorage</code>.
                Lee <code style={{ fontFamily: "var(--font-mono)", background: "var(--color-highlight-bg)", padding: "0 4px", borderRadius: "var(--radius-sm)" }}>prefers-color-scheme</code> como fallback.
                Sin flash de hidratación.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "var(--space-12)" }}>
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                marginBottom: "var(--space-6)",
                fontWeight: "var(--weight-semibold)",
              }}
            >
              Botones Magnéticos
            </p>
            <div
              style={{
                display: "flex",
                gap: "var(--space-4)",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <MagneticButton variant="primary" size="lg">
                Botón Primario
              </MagneticButton>
              <MagneticButton variant="secondary" size="md">
                Secundario
              </MagneticButton>
              <MagneticButton variant="ghost" size="sm">
                Acción Ghost
              </MagneticButton>
            </div>
          </div>
        </Section>

        {/* ── Footer ─────────────────────────────────── */}
        <footer
          style={{
            padding: "var(--space-12) 0 var(--space-20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          <span
            style={{
              fontWeight: "var(--weight-black)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--color-text-primary)",
            }}
          >
            Te lo <span style={{ color: "var(--color-accent)" }}>imprimo</span>
          </span>
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-tertiary)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
            }}
          >
            Sistema de diseño · v1.0
          </span>
        </footer>
      </div>
    </div>
  );
}
