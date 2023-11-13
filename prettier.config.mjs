/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: "es5",
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
