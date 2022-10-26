import * as esbuild from 'esbuild-wasm';


export default async (rawCode: string) => {
    
    let isInitialized = false;

    // Initialize esbuild.
    if (!isInitialized) { 
        try {
            await esbuild.initialize({
                worker: true,
                wasmURL: '/esbuild.wasm',
            });
        } catch (e) { console.log(e); }
        
        isInitialized = true;
    } 
    

    // Run the bundle and get result.
    const result = await esbuild.transform(rawCode, {
        loader: 'jsx',
        target: 'es2015'
    });

    return result.code;
}