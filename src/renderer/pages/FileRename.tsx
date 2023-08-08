import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AlertColor, Divider, FormControlLabel, Stack, Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import PageLayout from '@/renderer/components/layout/PageLayout';

const FileRename: React.FunctionComponent = () => {
  const handleSelectDir = async (): Promise<void> => {
    await window.mainApi.send('openDialogDir');
  };

  const [inputPath, setInputPath] = useState('');
  const [inputMatchStr, setInputMatchStr] = useState('');
  const [inputReplaceStr, setInputReplaceStr] = useState('');
  const [inputIsRecursive, setnputIsRecursive] = useState(true);
  const [inputIsRenameFolder, setInputIsRenameFolder] = useState(false);
  const [alterType, setAlterType] = useState<AlertColor>('info');
  const [alterMessage, setAlterMessage] = useState('请选择文件路径开始重命名');

  const handleRunRename = async (): Promise<void> => {
    if (!inputPath) {
      setAlterMessage('请选择文件后再操作');
      setAlterType('error');
      return;
    }
    setAlterMessage('操作中');
    setAlterType('info');
    await window.mainApi.send(
      'runRename',
      inputPath,
      inputMatchStr,
      inputReplaceStr,
      inputIsRecursive,
      inputIsRenameFolder,
    );
    setAlterMessage('操作完毕');
    setAlterType('info');
  };
  useEffect(() => {
    window.mainApi.receive('fileSelected', (_event, fileArr: string[]) => {
      setInputPath(fileArr[0]);
    });
  }, []);
  return (
    <PageLayout>
      <Stack direction="column">
        <Stack
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 900,
          }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <TextField
            required
            fullWidth
            id="outlined-required"
            value={inputPath}
            onChange={(event) => {
              setInputPath(event.target.value as string);
            }}
            placeholder="请选择路径"
            label="执行路径"
          />
        </Stack>
        <Stack
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 900,
          }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <TextField
            id="outlined-required"
            value={inputMatchStr}
            onChange={(event) => {
              setInputMatchStr(event.target.value as string);
            }}
            placeholder="匹配字符串"
            label="匹配字符串"
          />
          <TextField
            id="outlined-required"
            value={inputReplaceStr}
            onChange={(event) => {
              setInputReplaceStr(event.target.value as string);
            }}
            placeholder="请输入替换字符串"
            label="请输入替换字符串"
          />
        </Stack>
        <Stack
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 900,
          }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <FormControlLabel
            control={
              <Switch
                checked={inputIsRecursive}
                onChange={(event) => setnputIsRecursive(event.target.checked)}
              />
            }
            label="是否递归"
          />
          <FormControlLabel
            control={
              <Switch
                checked={inputIsRenameFolder}
                onChange={(event) => setInputIsRenameFolder(event.target.checked)}
              />
            }
            label="是否重命名文件夹"
          />
        </Stack>
        <Stack
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 900,
          }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Button variant="contained" onClick={handleSelectDir} color="primary">
            选择文件
          </Button>
          <Button variant="contained" onClick={handleRunRename} color="primary">
            开始执行
          </Button>
        </Stack>
        <Alert severity={alterType}>{alterMessage}</Alert>
      </Stack>
    </PageLayout>
  );
};

export default FileRename;
