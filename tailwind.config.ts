import type { Config } from "tailwindcss";
const config: Config = { content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}",], theme: { extend: { colors: {'solana-green':'#00FFA3','solana-purple':'#9945FF','dark-bg':'#121212','light-bg':'#1E1E1E','border-color':'#2C2F3A',},},}, plugins: [],};
export default config;

