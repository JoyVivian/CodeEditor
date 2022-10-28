import * as esbuild from 'esbuild-wasm';

export const bundle = async (rawCode: string) => {
    // Run the bundle and get result.
    try {
        const result = await esbuild.transform(rawCode, {
            loader: 'jsx',
            target: 'es2015'
        });
        return {
            code: result.code,
            err: ''
        }
    } catch (err) {
        if (err instanceof Error) {
            return {
                code: '',
                err: err.message,
            }
        } else {
            throw err;
        }
    }
};