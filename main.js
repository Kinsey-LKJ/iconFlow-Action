const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');


// Define the paths
const actionRepoPath = process.env.GITHUB_WORKSPACE;
const userRepoPath = path.resolve(process.env.GITHUB_WORKSPACE, '..');

console.log('Current working directory:', process.cwd());

// Copy src directory from user repo to action repo
fs.copySync(path.join(userRepoPath, 'src'), path.join(actionRepoPath, 'src'));

// Change the working directory to the action repo
process.chdir(actionRepoPath);

console.log('Current working directory:', process.cwd());

// Get the NPM auth token from the action inputs
const npmAuthToken = process.env.INPUT_NPM_AUTH_TOKEN;

// Create .npmrc file with auth token
fs.writeFileSync('.npmrc', `//registry.npmjs.org/:_authToken=${npmAuthToken}`);

// Install dependencies, generate icons, build bundle, and publish
exec('npm install && npm run generate && npm run build:bundle && npm publish', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
