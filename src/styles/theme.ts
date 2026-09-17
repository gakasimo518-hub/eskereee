import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  // ---------------------------------------------------------------------------
  // Color palette
  // ---------------------------------------------------------------------------
  colors: {
    // Primary brand colors
    primary: "#0066FF",          // main brand blue
    primaryHover: "#0052CC",
    primaryActive: "#003D99",
    primaryContrast: "#FFFFFF",

    // Secondary brand colors
    secondary: "#FF6600",        // accent orange
    secondaryHover: "#E65C00",
    secondaryActive: "#CC5200",
    secondaryContrast: "#FFFFFF",

    // Semantic colors
    success: "#28A745",
    successHover: "#218838",
    successActive: "#1E7E34",
    successContrast: "#FFFFFF",

    warning: "#FFC107",
    warningHover: "#E0A800",
    warningActive: "#C69500",
    warningContrast: "#212529",

    error: "#DC3545",
    errorHover: "#C82333",
    errorActive: "#BD2130",
    errorContrast: "#FFFFFF",

    // Neutrals
    background: "#F5F7FA",
    surface: "#FFFFFF",
    border: "#E0E4EB",
    disabled: "#CED4DA",

    // Text
    textPrimary: "#212529",
    textSecondary: "#495057",
    textDisabled: "#6C757D",
    textInverse: "#FFFFFF",
  },

  // ---------------------------------------------------------------------------
  // Spacing scale (in pixels)
  // ---------------------------------------------------------------------------
  spacing: {
    xxxs: 2,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  // ---------------------------------------------------------------------------
  // Typography
  // ---------------------------------------------------------------------------
  typography: {
    // Font families
    fontFamilyBase: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontFamilyMono: "'Fira Code', Menlo, Monaco, Consolas, 'Courier New', monospace",

    // Font sizes (in rem)
    fontSize: {
      xs: "0.75rem",   // 12px
      sm: "0.875rem",  // 14px
      md: "1rem",      // 16px
      lg: "1.125rem",  // 18px
      xl: "1.25rem",   // 20px
      xxl: "1.5rem",   // 24px
      xxxl: "2rem",    // 32px
    },

    // Font weights
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },

    // Letter spacing
    letterSpacing: {
      normal: "0",
      wide: "0.025em",
    },
  },

  // ---------------------------------------------------------------------------
  // Border radius
  // ---------------------------------------------------------------------------
  radii: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    pill: "9999px",
    circle: "50%",
  },

  // ---------------------------------------------------------------------------
  // Shadows
  // ---------------------------------------------------------------------------
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.05)",
    sm: "0 2px 4px rgba(0,0,0,0.07)",
    md: "0 4px 8px rgba(0,0,0,0.10)",
    lg: "0 8px 16px rgba(0,0,0,0.12)",
    xl: "0 12px 24px rgba(0,0,0,0.15)",
  },

  // ---------------------------------------------------------------------------
  // Responsive breakpoints (in px)
  // ---------------------------------------------------------------------------
  breakpoints: {
    // Mobile first
    xs: "0",          // < 576px
    sm: "576px",      // ≥ 576px
    md: "768px",      // ≥ 768px
    lg: "992px",      // ≥ 992px
    xl: "1200px",     // ≥ 1200px
    xxl: "1400px",    // ≥ 1400px
  },

  // ---------------------------------------------------------------------------
  // Helper functions for styled‑components
  // ---------------------------------------------------------------------------
  // Convert a spacing key to a pixel value (e.g., theme.space('md') => '16px')
  space: (key: keyof typeof theme.spacing) => `${theme.spacing[key]}px`,
  // Convert a fontSize key to a rem value (e.g., theme.fontSize('lg') => '1.125rem')
  fontSize: (key: keyof typeof theme.typography.fontSize) => theme.typography.fontSize[key],
};

export default theme;