import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

function getContext(mode) {
    if (mode === 'no-api') return require('./data.json');

    const url = mode === 'development' ? 'http://127.0.0.1:7071/api/HomepageData' :
        process.env.PAGE_DATA_URL;

    return fetch(url).then(response => response.json());
}

export default defineConfig(async ({ mode }) => {
    const context = await getContext(mode);
    console.log(context);
    return {
        root: resolve(__dirname, 'src'),
        resolve: {
            alias: {
                '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            }
        },
        server: {
            port: 8080,
            hot: true
        },
        plugins: [
            handlebars({ context })
        ],
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'src/index.html'),
                    unsubscribe: resolve(__dirname, 'src/unsubscribe.html'),
                    data: resolve(__dirname, 'src/adatkezeles.html'),
                }
            }
        }
    }
});