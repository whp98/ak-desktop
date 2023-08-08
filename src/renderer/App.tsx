import {MemoryRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import Err404 from '@/renderer/pages/Err404';

import NavLayout from '@/renderer/components/layout/NavLayout';
import About from '@/renderer/pages/About';

import Qishui from '@/renderer/pages/Qishui';
import AkStockHis from "@/renderer/pages/AkStockHis";
import AkStockTable from "@/renderer/pages/AkStockTable";
import FileRename from './pages/FileRename';

const App: React.FunctionComponent = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<NavLayout/>}>
          <Route index element={<About/>}/>
          <Route path="fileRename" element={<FileRename/>}/>
          <Route path="qishui" element={<Qishui/>}/>
          <Route path="stock" element={<AkStockHis/>}/>
          <Route path="stock-list" element={<AkStockTable/>}/>
        </Route>
        <Route path="*" element={<Err404/>}/>
      </Routes>
    </MemoryRouter>
  </>
);

export default App;
