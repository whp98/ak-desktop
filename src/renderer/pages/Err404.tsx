import { Link } from 'react-router-dom';
import PageLayout from '@/renderer/components/layout/PageLayout';

const Err404 = () => (
  <PageLayout>
    <h4>Err 404</h4>
    <Link to="/">回到首页</Link>
  </PageLayout>
);

export default Err404;
