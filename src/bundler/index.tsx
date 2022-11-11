import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

// Initialize esbuild.
export const setup = async () => {
  try {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/esbuild.wasm',
    })
  } catch (e) {
    console.log(e)
  }
}

export const bundle = async (rawCode: string) => {
  try {
    const result = esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    });

    return {
      code: (await result).outputFiles[0].text,
      err: '',
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: '',
        err: err.message,
      }
    } else {
      throw err
    }
  }
}
