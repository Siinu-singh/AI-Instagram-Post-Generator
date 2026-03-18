/**
 * Theme Configuration - Professional Design System
 * Follows backend agents pattern: modular, reusable, well-documented
 * Supports light/dark modes with liquid glassmorphism effects
 */

/**
 * Color Palette - Light Mode
 * Designed for professional, classic aesthetic with clarity
 */
export const lightTheme = {
  // Primary Backgrounds
  bg: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    overlay: 'rgba(255, 255, 255, 0.98)',
  },

  // Cards with Glassmorphism
  card: {
    bg: 'rgba(255, 255, 255, 0.88)',
    bgHover: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(203, 213, 225, 0.5)',
    borderHover: 'rgba(148, 163, 184, 0.6)',
    shadow: '0 8px 32px 0 rgba(200, 200, 220, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(0, 0, 0, 0.04)',
    shadowHover: '0 16px 48px 0 rgba(180, 180, 210, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(0, 0, 0, 0.06)',
  },

  // Text Colors - Hierarchical
  text: {
    primary: '#0f172a',      // Strong contrast for readability
    secondary: '#475569',     // Medium contrast for secondary info
    tertiary: '#78716c',      // Lower contrast for muted text
    muted: '#cbd5e1',         // Subtle text
    inverse: '#ffffff',       // For dark backgrounds
  },

  // Accent Colors - Professional Palette
  accent: {
    primary: '#a855f7',       // Purple - Primary action
    primaryLight: '#d8b4fe',  // Light purple
    secondary: '#2563eb',     // Blue - Secondary action
    secondaryLight: '#93c5fd',// Light blue
    tertiary: '#7c3aed',      // Violet - Highlight
    success: '#16a34a',       // Green - Success states
    warning: '#ea580c',       // Orange - Warning states
    error: '#dc2626',         // Red - Error states
    info: '#0284c7',          // Cyan - Info states
  },

  // Gradients - Professional
  gradient: {
    primary: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    secondary: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
    accent: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
  },

  // Liquid Gradients - Flowing effects
  liquid: {
    purple: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 25%, #7c3aed 50%, #6d28d9 75%, #5b21b6 100%)',
    blue: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 25%, #1e40af 50%, #1e3a8a 75%, #1e40af 100%)',
    mixed: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 25%, #7c3aed 50%, #2563eb 75%, #0284c7 100%)',
  },

  // Borders - Glassmorphic
  border: {
    light: 'rgba(203, 213, 225, 0.4)',
    medium: 'rgba(148, 163, 184, 0.5)',
    strong: 'rgba(100, 116, 139, 0.3)',
  },

  // Shadows - Layered
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Color Palette - Dark Mode
 * High contrast for readability, sophisticated dark aesthetic
 */
export const darkTheme = {
  // Primary Backgrounds
  bg: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    overlay: 'rgba(15, 23, 42, 0.98)',
  },

  // Cards with Glassmorphism
  card: {
    bg: 'rgba(30, 30, 46, 0.8)',
    bgHover: 'rgba(30, 30, 46, 0.9)',
    border: 'rgba(255, 255, 255, 0.2)',
    borderHover: 'rgba(255, 255, 255, 0.3)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.48), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.4)',
    shadowHover: '0 16px 48px 0 rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 1px rgba(0, 0, 0, 0.5)',
  },

  // Text Colors - High contrast
  text: {
    primary: '#f1f5f9',       // High contrast for readability
    secondary: '#cbd5e1',     // Medium contrast for secondary info
    tertiary: '#94a3b8',      // Lower contrast for muted text
    muted: '#475569',         // Subtle text
    inverse: '#0f172a',       // For light backgrounds
  },

  // Accent Colors - Brightened for dark mode
  accent: {
    primary: '#d8b4fe',       // Light purple
    primaryLight: '#a855f7',  // Regular purple
    secondary: '#60a5fa',     // Light blue
    secondaryLight: '#2563eb',// Regular blue
    tertiary: '#a78bfa',      // Violet
    success: '#4ade80',       // Light green
    warning: '#fb923c',       // Light orange
    error: '#f87171',         // Light red
    info: '#38bdf8',          // Light cyan
  },

  // Gradients - Professional dark mode
  gradient: {
    primary: 'linear-gradient(135deg, #d8b4fe 0%, #a78bfa 100%)',
    secondary: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)',
    accent: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
  },

  // Liquid Gradients - Flowing effects (bright for dark mode)
  liquid: {
    purple: 'linear-gradient(135deg, #d8b4fe 0%, #c4b5fd 25%, #a78bfa 50%, #8b5cf6 75%, #7c3aed 100%)',
    blue: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #2563eb 50%, #1d4ed8 75%, #1e40af 100%)',
    mixed: 'linear-gradient(135deg, #d8b4fe 0%, #c4b5fd 25%, #a78bfa 50%, #60a5fa 75%, #38bdf8 100%)',
  },

  // Borders - Glassmorphic
  border: {
    light: 'rgba(255, 255, 255, 0.15)',
    medium: 'rgba(255, 255, 255, 0.2)',
    strong: 'rgba(255, 255, 255, 0.12)',
  },

  // Shadows - Layered
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
};

/**
 * Export Theme Collection
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
