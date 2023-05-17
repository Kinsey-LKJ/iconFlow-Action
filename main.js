const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra'); // Use fs-extra module

const userRepoPath = path.resolve(process.env.GITHUB_WORKSPACE, '..');
const actionRepoPath = path.resolve(process.env.GITHUB_WORKSPACE, 'action');

// Copy entire 'src' directory from user's repository to action's repository
fs.copySync(
  path.join(userRepoPath, 'src'),
  path.join(actionRepoPath, 'src')
);

exec(
  `cd ${actionRepoPath} && npm run generate && npm run build:bundle`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  },
);
