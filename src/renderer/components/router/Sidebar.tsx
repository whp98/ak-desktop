import React from 'react';
import {useNavigate} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {MdChevronLeft, MdChevronRight, MdLightMode, MdMenu, MdModeNight} from 'react-icons/md';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {RootState} from '@/renderer/store';
import {setDarkTheme} from '@/renderer/store/slices/appScreenSlice';
import SidebarData from '@/renderer/components/router/SidebarData';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'isOpen'})<{
  // eslint-disable-next-line no-undef
  isOpen?: boolean;
}>(({theme, isOpen}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(isOpen && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  isOpen: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
  // eslint-disable-next-line no-undef
})<AppBarProps>(({theme, isOpen}) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface Props {
  children: any;
}

const Sidebar: React.FunctionComponent<Props> = ({children}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // const [close, setClose] = useState(true);
  const darkTheme = useSelector((state: RootState) => state.appScreen.darkTheme);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [subTitle, setSubTitle] = React.useState('');

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };
  const handleChangeTheme = (): void => {
    dispatch(setDarkTheme(!darkTheme));
  };
  // const showSidebar = () => setClose(!close);
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <AppBar position="fixed" sx={{height: '64px'}} isOpen={isOpen}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={handleDrawerOpen}
          >
            <MdMenu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            MagicBox · {subTitle || '主页'}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={handleChangeTheme}
          >
            {darkTheme ? <MdLightMode/> : <MdModeNight/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main sx={{paddingTop: '0'}} isOpen={isOpen}>
        <Toolbar/>
        {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <MdChevronLeft/> : <MdChevronRight/>}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <List>
          {SidebarData.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setSubTitle(item.title);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
