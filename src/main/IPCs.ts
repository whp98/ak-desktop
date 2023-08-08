import { BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { version } from '../../package.json';
import replaceFileName from './replaceFileName';
/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(window: BrowserWindow): void {
    // Get application version
    ipcMain.on('msgRequestGetVersion', () => {
      window.webContents.send('msgReceivedVersion', version);
    });

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event, url) => {
      await shell.openExternal(url);
    });

    // 打开文件选择框
    ipcMain.on('openDialogDir', () => {
      dialog
        .showOpenDialog({ title: '请选择文件', properties: ['openDirectory'] })
        .then((result) => {
          if (result.filePaths.length > 0) {
            window.webContents.send('fileSelected', result.filePaths);
          }
        });
    });
    // 文件夹运行字符串替换操作
    ipcMain.on(
      'runRename',
      (
        event,
        startPath: string,
        matchStr: string,
        replaceStr: string,
        isRecursive: boolean,
        isRenameFolder: boolean,
      ) => {
        replaceFileName(startPath, matchStr, replaceStr, isRecursive, isRenameFolder);
      },
    );
  }
}
