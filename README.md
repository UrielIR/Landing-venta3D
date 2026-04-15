# Te lo imprimo — Monorepo

Estudio creativo de diseño de objetos. Infraestructura escalable basada en Next.js 14 con App Router, TailwindCSS, TypeScript y Turborepo.

## Estructura

```
Landing-venta3D/
├── apps/
│   ├── web/          → Next.js 14 App Router (frontend)
│   └── api/          → Express + TypeScript (backend)
├── packages/
│   ├── ui/           → Componentes compartidos + Design System
│   ├── lib/          → Utilidades agnósticas
│   ├── config-typescript/  → tsconfig base
│   ├── config-tailwind/    → tailwind config base
│   └── config-eslint/      → eslint config base
├── turbo.json
└── package.json
```

## Design System

El sistema de diseño vive en `packages/ui/src/`:

| Archivo | Contenido |
|---------|-----------|
| `tokens.css` | Variables CSS globales (colores, tipografía, spacing, sombras) |
| `globals.css` | Reset, clases tipográficas, utilidades base |
| `theme-toggle.tsx` | Toggle Dark Mode con ícono ampolleta |
| `hooks/use-theme.ts` | Hook de tema con persistencia en localStorage |

### Aliases disponibles

```ts
import { ThemeToggle } from "@repo/ui/theme-toggle"
import { useTheme }    from "@repo/ui/hooks/use-theme"
import { Button }      from "@repo/ui/button"
```

### Tailwind + CSS Variables

Los tokens están mapeados en `tailwind.config.js` como clases:

```tsx
<div className="bg-bg-subtle text-text-primary shadow-md">
  <span className="text-accent font-sans">Te lo imprimo</span>
</div>
```

O directamente con variables CSS:

```css
background: var(--color-bg-base);
box-shadow: var(--shadow-lg);
font-family: var(--font-display);
```

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Dev — apps/web en :3000
npm run dev --workspace=apps/web

# Build completo via Turbo
npm run build

# Lint
npm run lint
```

## Deploy en Vercel

1. Importar el repositorio en [vercel.com](https://vercel.com)
2. Configurar **Root Directory** → `apps/web`
3. Vercel detecta Next.js automáticamente
4. Variables de entorno en el dashboard de Vercel

> El archivo `apps/web/vercel.json` incluye la configuración de build con Turborepo.

## Paleta cromática

| Token | Light | Dark |
|-------|-------|------|
| `--color-accent` | `#E8420A` | `#FF5722` |
| `--color-highlight` | `#F5E642` | `#E8D800` |
| `--color-bg-base` | `#FFFFFF` | `#0C0B09` |
| `--color-text-primary` | `#0F0E0C` | `#F2F0EC` |
