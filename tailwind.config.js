module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // false, 'media' or 'class'
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      scale: {
        '102': '1.02'
      },
      width: {
        '98': '26rem'
      },
      transitionProperty: {
        'height': 'height'
      }
    }
  },
  variants: {
    extend: {
      display: ['dark']
    },
  },
  plugins: [],
}
