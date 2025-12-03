/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./main.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Custom breakpoints as specified for export
      'sm': '640px',   // Small devices (tablets)
      'md': '1024px',  // Medium devices (desktops)
      'lg': '1440px',  // Large devices (large desktops)
    },
    extend: {
      colors: {
        // ETAS Design System Colors
        'etas-blue': '#164293',
        'etas-purple': '#89037A',
        'surface-50': '#FAFAFA',
        'gray-900': '#5A646E',
        'success': '#039C7D',
        'error': '#E5004A',
        'warning': '#FCCD22',
        
        // Semantic colors from CSS variables
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
