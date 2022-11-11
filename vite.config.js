import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
    root: resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    plugins: [
        handlebars({ context: require('./data.json') })
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.hbs')
            }
        }
    }
}