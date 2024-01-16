/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports","prettier-plugin-tailwindcss"],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,

  // TailwindCSS
  tailwindFunctions: ["cn", "cva"],

  // Sort Imports
  importOrder: ["^@react/(.*)$", "^react/(.*)$","^@next/(.*)$", "^next/(.*)$", "^@/(.*)$", "^[./]"],
};

export default config;
