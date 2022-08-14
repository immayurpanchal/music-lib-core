import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import path from "node:path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      /**
       * All the public components are stored in src/components and exported from index.ts
       */
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MyLib",
      formats: ["es", "umd"],
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      /**
       * Externalize all the dependencies that you don't want to bundle into the library.
       */
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          classnames: "classNames"
        }
      }
    }
  }
})
