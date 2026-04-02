/** @type {import('tailwindcss').Config} */
export default {
  // 1. Le decimos a Tailwind dónde buscar las clases (en tu HTML y en todos tus componentes React)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aquí podrías agregar colores personalizados en el futuro si lo deseas
    },
  },
  plugins: [
    // 2. Agregamos el plugin para las animaciones fluidas (fade-in, zoom-in, etc.)
    require("tailwindcss-animate")
  ],
}