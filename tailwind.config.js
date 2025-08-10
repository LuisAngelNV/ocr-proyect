/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // primario (indigo-500)
          600: "#4f46e5", // primario hover
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        success: { 100: "#e6f9f0", 600: "#16a34a" },
        warning: { 100: "#fff7e6", 600: "#d97706" },
        danger: { 100: "#fee2e2", 600: "#dc2626" },
      },
      boxShadow: {
        card: "0 2px 10px rgba(17, 24, 39, 0.06)", // suave
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
