import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), svgrPlugin(), tsconfigPaths()],
    define: {
      __APP_VERSION__: JSON.stringify("v1.0.0"),
      "process.env": env,
      global: "window",
    },
    resolve: {
      alias: {
        crypto: "crypto-browserify",
      },
    },
  };
});
