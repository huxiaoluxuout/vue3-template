import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
    server: {
        open: true,
        proxy: { //配置多个代理
            '/test-api': {
                target: "http://192.168.2.100:8071",
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/test-api/, '/api')
            },
        }
    },
    plugins: [
        uni()
    ],

});

