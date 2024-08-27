import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const preserveUniAppConditionals = () => {
    return {
        name: 'preserve-uniapp-conditionals',
        transform(code, id) {
            // 只处理 .js 文件
            if (!id.endsWith('.js')) return null;
            // 保留uniapp条件编译 // #ifdef, // #ifndef, 和 // #endif 的注释标记
            const preservedCode = code
                .replace(/\/\/\s*#ifdef\s.*!/g, match => match)
                .replace(/\/\/\s*#ifndef\s.*!/g, match => match)
                .replace(/\/\/\s*#endif\s.*/g, match => match);
            return {
                code: preservedCode,
                map: null
            };
        }
    };
};
export default {
    // input: './src/EventBusCore.js',
    input: './index.js',
    output: {
        file: 'dist/ylxuni.min.js',
        format: 'umd',
        name: 'ylxuni'
    },

    plugins: [

        resolve(),
        commonjs(),
        terser({
            compress: {
                dead_code: true,
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                booleans: true,
                loops: true,
                unused: true,
                hoist_funs: true,
                keep_fargs: false,
                hoist_vars: true,
                if_return: true,
                join_vars: true,
                side_effects: true,
                warnings: false
            },
            mangle: true,

            format: {
                comments: /#(ifdef|ifndef|endif)/
            }
        }),
        preserveUniAppConditionals(), // 添加自定义插件
    ]
};
