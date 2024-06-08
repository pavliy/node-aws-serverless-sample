
import { build } from 'esbuild';
import esbuildConfig from './esbuild.config';
import fs from 'fs';

const distPath = '../../dist/lambdas/products-get-items';
try {
    const buildResult = await build(esbuildConfig);
    fs.writeFileSync(`${distPath}/buildMeta.json`, JSON.stringify(buildResult.metafile, null, 2));
    console.log('Build complete');

} catch (error) {
    console.error(error);
    process.exit(1);
}

export {}
