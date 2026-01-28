import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './public/assets'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@components': path.resolve(__dirname, './src/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@page': path.resolve(__dirname, 'src/root/page'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  base: '/Dashboard/',
});
