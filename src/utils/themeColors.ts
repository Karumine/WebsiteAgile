import type { ThemeSettings } from '@/types';

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length !== 6) {
        return { r: 2, g: 132, b: 199 };
    }
    const num = parseInt(cleanHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
}

export function rgbToHex(r: number, g: number, b: number): string {
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
    return (
        '#' +
        [clamp(r), clamp(g), clamp(b)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')
    );
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
    const { r, g, b } = hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case rNorm:
                h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) * 60;
                break;
            case gNorm:
                h = ((bNorm - rNorm) / delta + 2) * 60;
                break;
            case bNorm:
                h = ((rNorm - gNorm) / delta + 4) * 60;
                break;
        }
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number): string {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 60) {
        r = c; g = x; b = 0;
    } else if (h < 120) {
        r = x; g = c; b = 0;
    } else if (h < 180) {
        r = 0; g = c; b = x;
    } else if (h < 240) {
        r = 0; g = x; b = c;
    } else if (h < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }

    return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export interface ThemePalette {
    sky50: string;
    sky100: string;
    sky200: string;
    sky300: string;
    sky400: string;
    sky500: string;
    sky600: string;
    sky700: string;
    sky800: string;
    sky900: string;
    sky950: string;
    blue600: string;
    primaryRgb: string;
    accentRgb: string;
    startRgb: string;
    endRgb: string;
}

export function generateThemePalette(theme: ThemeSettings): ThemePalette {
    const primaryHex = theme.primaryColor || '#0284c7';
    const accentHex = theme.accentColor || '#38bdf8';
    const endHex = theme.gradientEnd || '#0369a1';
    const startHex = theme.gradientStart || '#0284c7';

    const { h, s } = hexToHsl(primaryHex);
    const primRgb = hexToRgb(primaryHex);
    const accRgb = hexToRgb(accentHex);
    const stRgb = hexToRgb(startHex);
    const edRgb = hexToRgb(endHex);

    return {
        sky50: hslToHex(h, Math.min(s, 70), 96),
        sky100: hslToHex(h, Math.min(s, 75), 91),
        sky200: hslToHex(h, Math.min(s, 80), 82),
        sky300: hslToHex(h, Math.min(s, 85), 70),
        sky400: accentHex,
        sky500: primaryHex,
        sky600: endHex,
        sky700: hslToHex(h, Math.min(s, 90), 30),
        sky800: hslToHex(h, Math.min(s, 95), 22),
        sky900: hslToHex(h, Math.min(s, 100), 15),
        sky950: hslToHex(h, Math.min(s, 100), 8),
        blue600: endHex,
        primaryRgb: `${primRgb.r}, ${primRgb.g}, ${primRgb.b}`,
        accentRgb: `${accRgb.r}, ${accRgb.g}, ${accRgb.b}`,
        startRgb: `${stRgb.r}, ${stRgb.g}, ${stRgb.b}`,
        endRgb: `${edRgb.r}, ${edRgb.g}, ${edRgb.b}`,
    };
}
