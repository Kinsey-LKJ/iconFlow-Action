const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const userRepoPath = process.env.GITHUB_WORKSPACE
const actionRepoPath = path.resolve(process.env.GITHUB_WORKSPACE, 'action');

const userPackagePath = path.resolve(userRepoPath, 'package.json');
const userPackageContent = fs.readFileSync(userPackagePath, 'utf-8');
const userPackageObj = JSON.parse(userPackageContent);
const userVersion = userPackageObj.version;

const packagePath = path.join(__dirname, 'package.json');
let packageContent = fs.readFileSync(packagePath, 'utf-8');
let packageObj = JSON.parse(packageContent);

// 修改版本号
packageObj.version = userVersion;

// 将修改后的对象写回文件
packageContent = JSON.stringify(packageObj, null, 2);
fs.writeFileSync(packagePath, packageContent, 'utf-8');

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
