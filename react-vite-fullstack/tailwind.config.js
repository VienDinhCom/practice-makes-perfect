import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [daisyui],
  daisyui: { logs: false },
};

export default config;
