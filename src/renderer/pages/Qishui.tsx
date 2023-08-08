import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AlertColor, Divider, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import * as cheerio from 'cheerio';
import PageLayout from '@/renderer/components/layout/PageLayout';

const Qishui: React.FunctionComponent = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [alterType, setAlterType] = useState<AlertColor>('info');
  const [alterMessage, setAlterMessage] = useState('请输入url开始获取');
  const [text, setText] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  async function getHTML(url) {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  }

  const handleRunRename = async (): Promise<void> => {
    if (!inputUrl) {
      setAlterMessage('请选择Url后再操作');
      setAlterType('error');
      return;
    }
    setAlterMessage('操作中');
    setAlterType('info');
    /* 操作 */
    getHTML(inputUrl).then((html) => {
      // 获取到HTML源代码
      const $sec = cheerio.load(html);
      const data = $sec('#root > div > div > div > div:nth-child(2) > div > div > div > div');
      const res: string[] = [];
      for (let i = 0; i < data.children().length; i += 1) {
        const selector1 = `#root > div > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(${
          i + 1
        }) > div:nth-child(2) > div:nth-child(1) > p`;
        const selector2 = `#root > div > div > div > div:nth-child(2) > div > div > div > div > div:nth-child(${
          i + 1
        }) > div:nth-child(2) > div:nth-child(2) > p`;
        const songName = $sec(selector1).text();
        // atr,album · songName
        const artAndAlbum = $sec(selector2).text();
        res.push(`${songName} - ${artAndAlbum}`);
      }
      setText(res.join('\n'));
      setAlterMessage('操作完毕');
      setAlterType('info');
    });
  };
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
            value={inputUrl}
            onChange={(event) => {
              setInputUrl(event.target.value as string);
            }}
            placeholder="Url"
            label="Url"
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
          <Button variant="contained" onClick={handleRunRename} color="primary">
            开始执行
          </Button>
        </Stack>
        <Alert severity={alterType}>{alterMessage}</Alert>
        <TextField value={text} onChange={(e) => setText(e.target.value)} multiline rows={4} />
        <Button variant="contained" color="primary" onClick={copyToClipboard}>
          复制结果
        </Button>
      </Stack>
    </PageLayout>
  );
};

export default Qishui;
