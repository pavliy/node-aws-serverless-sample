import { BuildOptions } from 'esbuild';

const distPath = '../../dist/lambdas/products-get-items';
const esbuildConfig: BuildOptions = {
 entryPoints: ['index.ts'],
 bundle: true,
 metafile: true,
 keepNames: true,
 format: 'esm',
 minify: true,
 treeShaking: true,
 sourcemap: true,
 target: 'es2022',
 platform: 'node',
 outfile: `${distPath}/index.mjs`,
 external: ['@aws-sdk'],
};

export default esbuildConfig;