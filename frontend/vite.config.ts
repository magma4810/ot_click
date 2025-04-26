import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    base: "/ot_click/",
    build: {
      outDir: "dist/ot_click",
      assetsDir: "assets",
      manifest: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          secure: false,
        },
      },
    },
    define: {
      "process.env": env, // для совместимости с некоторыми библиотеками
    },
  };
});
