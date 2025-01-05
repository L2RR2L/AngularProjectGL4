/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "15px",
        sm: "15px",
        lg: "15px",
        xl: "0",
        "2xl": "0",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1392px",
      },
    },
    extend: {
      colors: {
        primaryBackground: "hsl(var(--primary-background) / <alpha-value>)",
        secondaryBackground: "hsl(var(--secondary-background) / <alpha-value>)",
        primaryForeground: "hsl(var(--primary-foreground) / <alpha-value>)",
        secondaryForeground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        primaryFill: "hsl(var(--primary-fill) / <alpha-value>)",
        secondaryFill: "hsl(var(--secondary-fill) / <alpha-value>)",
        primaryGrey: "hsl(var(--primary-grey) / <alpha-value>)",
        secondaryGrey: "hsl(var(--secondary-grey) / <alpha-value>)",
      },
      fontSize: {
        "2xl": ["34px", { lineHeight: "42px" }],
        xl: ["24px", { lineHeight: "32px" }],
        base: ["20px", { lineHeight: "30px" }],
        lg: ["18px", { lineHeight: "30px" }],
        md: ["16px", { lineHeight: "30px" }],
        sm: ["14px", { lineHeight: "24px" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(15, 22, 36, 0.06), 0px 1px 3px 0px rgba(15, 22, 36, 0.10)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],};
