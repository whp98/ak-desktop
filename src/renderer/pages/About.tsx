/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { setVersion } from '@/renderer/store/slices/appScreenSlice';
import { bodyRoot } from '@/renderer/assets/css/global';
import type { RootState } from '@/renderer/store';
import PageLayout from '@/renderer/components/layout/PageLayout';

const About = () => {
  // const darkTheme = useSelector((state: RootState) => state.appScreen.darkTheme);
  const appVersion = useSelector((state: RootState) => state.appScreen.version);
  // const counterValue = useSelector((state: RootState) => state.appScreen.counterValue);
  // const [t] = useTranslation(['common']);
  const dispatch = useDispatch();

  const handleGithubLink = async (): Promise<void> => {
    await window.mainApi.send('msgOpenExternalLink', 'https://github.com/whp98/magicbox');
  };

  useEffect(() => {
    // Get application version from package.json version string (Using IPC communication)
    window.mainApi.receive('msgReceivedVersion', (event, version: string) => {
      dispatch(setVersion(version));
    });

    window.mainApi.send('msgRequestGetVersion');
  }, []);

  return (
    <PageLayout>
      <div css={bodyRoot}>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <List sx={{}} component="nav" aria-label="mailbox folders">
            <ListItemButton>
              <ListItemText primary="关于" />
            </ListItemButton>
            <Divider />
            <ListItemButton>
              <ListItemText primary={`版本${appVersion}`} />
            </ListItemButton>
            <ListItemButton onClick={handleGithubLink}>
              <ListItemText primary="打开GitHub" />
            </ListItemButton>
          </List>
        </Paper>
      </div>
    </PageLayout>
  );
};

export default About;
