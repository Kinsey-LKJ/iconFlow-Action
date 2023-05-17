const { exec } = require('child_process');
const path = require('path');

const actionRepoPath = path.resolve(__dirname);

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
