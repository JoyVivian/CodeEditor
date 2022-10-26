import * as esbuild from 'esbuild-wasm';

// Initialize esbuild.
export const setup = async() => {
    try {
        await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm',
        });
    } catch (e) { console.log(e); }
};

