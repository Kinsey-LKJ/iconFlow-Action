const { exec } = require('child_process');

exec(
  `npm run generate && npm run build:bundle`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  },
);
