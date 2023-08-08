import fs from 'fs';
import path from 'path';

function replaceFileName(
  startPath: string,
  matchStr: string,
  replaceStr: string,
  isRecursive: boolean,
  isRenameFolder: boolean,
) {
  // 获取起始路径下的所有文件和文件夹
  const files = fs.readdirSync(startPath);
  files.forEach((file) => {
    const filePath = path.join(startPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      // 处理文件
      const fileName = path.basename(filePath);
      const newFileName = fileName.replace(matchStr, replaceStr);
      if (newFileName !== fileName) {
        // 重命名文件
        const newFilePath = path.join(path.dirname(filePath), newFileName);
        fs.renameSync(filePath, newFilePath);
      }
    } else if (stat.isDirectory() && isRecursive) {
      // 递归处理子文件夹
      replaceFileName(filePath, matchStr, replaceStr, isRecursive, isRenameFolder);

      if (isRenameFolder) {
        // 处理文件夹名
        const folderName = path.basename(filePath);
        const newFolderName = folderName.replace(matchStr, replaceStr);
        if (newFolderName !== folderName) {
          // 重命名文件夹
          const newFolderPath = path.join(path.dirname(filePath), newFolderName);
          fs.renameSync(filePath, newFolderPath);
        }
      }
    }
  });
}

export default replaceFileName;
