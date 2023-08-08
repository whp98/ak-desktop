// const PageLayout = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 50px;
//   padding-left: 5%;
// `;
import { Box } from '@mui/material';

const PageLayout = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '50px',
      padding: '20px',
    }}
  >
    {children}
  </Box>
);

export default PageLayout;
