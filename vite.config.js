import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname, "src"),
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/static/variables.scss" as *;',
      },
    },
  },
  build: {
    outDir: resolve(__dirname, "./dist"), // Specify the output directory
    rollupOptions: {
      input: {
        index: resolve(__dirname, "/index.html"),
        //
        notFound: resolve(__dirname, "/notFound.html"),
        error: resolve(__dirname, "/error.html"),
        home: resolve(__dirname, "/home.html"),
        profile: resolve(__dirname, "/profile.html"),
        signin: resolve(__dirname, "/signin.html"),
        signup: resolve(__dirname, "/signup.html"),
      },
    },
  },
});
