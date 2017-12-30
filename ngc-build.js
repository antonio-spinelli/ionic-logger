const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const baseFolder = '.';
const distFolder = './dist';

process();

async function process() {
  console.log('Clean dist folder...');
  fs.removeSync(distFolder);

  console.log('Running build...');
  const es2015 = runNgc(`${baseFolder}/tsconfig.json`);
  const umd = runNgc(`${baseFolder}/tsconfig.umd.json`);

  const build = await Promise.all([es2015, umd]);
}

function runNgc(tsConfigPath) {
  console.log('Started for', tsConfigPath);

  const ngc = path.resolve('node_modules', '.bin', 'ngc');
  return new Promise((resolve, reject) => {
    exec(`${ngc} -p ${tsConfigPath}`, (err, stdout, stdeer) => {
      if (err) {
        console.log('Error !', err);
        reject(err);
      }

      console.log('Done for', tsConfigPath);
      resolve(tsConfigPath);
    });
  });
}
