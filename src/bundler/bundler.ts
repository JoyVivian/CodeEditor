import * as esbuild from 'esbuild-wasm';

export const bundle = async(rawCode: string) => {
    // Run the bundle and get result.
    const result = await esbuild.transform(rawCode, {
        loader: 'jsx',
        target: 'es2015'
    });

    return result.code;
};