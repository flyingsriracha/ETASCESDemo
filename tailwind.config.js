/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Custom breakpoints as specified for ETAS design
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
        'success': {
          DEFAULT: '#039C7D',
          foreground: '#ffffff',
        },
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
        lg: 'var(--radius)',      // 50px for buttons
        md: 'var(--radius-md)',   // 8px
        sm: 'var(--radius-sm)',   // 3px
        full: '9999px',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['Fira Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['14px', '22px'],      // ETAS CI 2.0
        'sm': ['16px', '24px'],       // ETAS CI 2.0 base
        'base': ['16px', '24px'],     // ETAS CI 2.0 base
        'lg': ['18px', '28px'],       // ETAS CI 2.0
        'xl': ['20px', '28px'],       // ETAS CI 2.0
        '2xl': ['24px', '32px'],      // ETAS CI 2.0
        '3xl': ['28px', '36px'],      // ETAS CI 2.0
        '4xl': ['32px', '40px'],      // ETAS CI 2.0
        '5xl': ['36px', '44px'],      // ETAS CI 2.0
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '10px',
        '4': '12px',
        '5': '16px',
        '6': '20px',
        '8': '26px',
        '10': '32px',
        '12': '38px',
        '16': '51px',
      },
    },
  },
  plugins: [],
}