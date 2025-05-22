// vite.config.ts
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const targetBrowser = process.env.BROWSER || 'chrome';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                background: resolve(__dirname, 'src/background/service_worker.ts'),
                content: resolve(__dirname, 'src/content/content.ts'),
                popup: resolve(__dirname, 'public/index.html')
            },
            output: {
                entryFileNames: '[name].js'
            }
        },
        sourcemap: true,
        emptyOutDir: true
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: `manifests/manifest.${targetBrowser}.json`,
                    dest: '.',
                    rename: 'manifest.json'
                }
            ]
        })
    ]
});