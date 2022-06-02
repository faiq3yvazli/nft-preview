const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      h1: ['4.375rem', '4.625rem'],
      h2: ['3.125rem', '3.375rem'],
      h3: ['1.75rem', '2rem'],
      h4: ['1.625rem', '1.875rem'],
      h5: ['1.5rem', '1.75rem'],
      mh1: ['1.75rem', '2rem'],
      mh2: ['1.75rem', '2rem'],
      mh3: ['1.375rem', '1.75rem'],
      mh4: ['1.5625rem', '1.75rem'],
      mh5: ['1.25rem', '1.5625rem'],
    },
    fontFamily: {
      iceberg: ['Iceberg', 'cursive'],
      sans: ['Smooch Sans', ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      grayscale: {
        75: '75%',
      },
      willChange: {
        height: 'height',
      },
      zIndex: {
        '-1': -1,
        1: 1,
      },
      colors: {
        primary: {
          100: '#99edf3',
          200: '#66e4ee',
          300: '#33dbe8',
          400: '#00d2e2',
          500: '#00a8b5',
          600: '#007e88',
          700: '#00545a',
          800: '#002a2d',
        },
        secondary: {
          100: '#a1d7db',
          200: '#72c4ca',
          300: '#43b0b8',
          400: '#149ca6',
          500: '#107d85',
          600: '#0c5e64',
          700: '#083e42',
          800: '#041f21',
        },
        info: {
          100: '#99dbfb',
          200: '#67c8f8',
          300: '#34b6f6',
          400: '#01a4f4',
          500: '#0183c3',
          600: '#016292',
          700: '#004262',
          800: '#002131',
        },
        success: {
          100: '#e9c5bd',
          200: '#dfa89d',
          300: '#d48b7c',
          400: '#c96e5b',
          500: '#a15849',
          600: '#794237',
          700: '#502c24',
          800: '#281612',
        },
        danger: {
          100: '#e9c5bd',
          200: '#dfa89d',
          300: '#d48b7c',
          400: '#c96e5b',
          500: '#a15849',
          600: '#794237',
          700: '#502c24',
          800: '#281612',
        },
        warning: {
          100: '#e9c5bd',
          200: '#dfa89d',
          300: '#d48b7c',
          400: '#c96e5b',
          500: '#a15849',
          600: '#794237',
          700: '#502c24',
          800: '#281612',
        },
        gradient: {
          primary: {
            from: '#292B5b',
            to: '#10122b',
          },
          secondary: {
            from: '#142938',
            to: '#19213a',
          },
          ternary: {
            from: '#182d40',
            to: '#1b223e',
          },
          card: {
            from: '#ffffff00',
            to: '#222652',
          },
          'st-primary': {
            from: '#C4C4C400',
            to: 'rgba(2,199,152,0.29)',
          },
        },
      },
    },
  },
  plugins: [],
};
