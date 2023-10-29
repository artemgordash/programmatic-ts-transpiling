import cp from 'node:child_process';
import fs from 'node:fs';
import ts from 'typescript';

const exportFileName = 'output';
const compiledCode = ts.transpile(
  fs.readFileSync(`./${exportFileName}.ts`, 'utf-8'),
  {
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: 'esnext',
    target: 'esnext',
    mapRoot: './map',
    outDir: './',
    sourceMap: true,
    inlineSourceMap: true,
    inlineSources: true,
    sourceRoot: './',
  },
  exportFileName + '.ts'
);

fs.writeFileSync(exportFileName + '.js', compiledCode, 'utf-8');

cp.exec(
  `node --experimental-modules --enable-source-maps ${exportFileName}.js`,
  (error, stdout, stderr) => {
    if (error) {
      return console.error(error);
    } else if (stderr) {
      return console.error(stderr);
    }
    console.log(stdout);
  }
);
