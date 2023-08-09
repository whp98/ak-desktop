import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Err404 from '@/renderer/pages/Err404';

import NavLayout from '@/renderer/components/layout/NavLayout';
import About from '@/renderer/pages/About';
import AkStockHis from '@/renderer/pages/AkStockHis';
import AkStockTable from '@/renderer/pages/AkStockTable';
import AkCurrency from '@/renderer/pages/AkCurrency';
import AkOilPrice from '@/renderer/pages/AkOilPrice';
import AkGoldPrice from '@/renderer/pages/AkGoldPrice';

const App: React.FunctionComponent = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={<About />} />
          <Route path="stock" element={<AkStockHis />} />
          <Route path="stock-list" element={<AkStockTable />} />
          <Route path="currency" element={<AkCurrency />} />
          <Route path="oil-price" element={<AkOilPrice />} />
          <Route path="gold-price" element={<AkGoldPrice />} />
        </Route>
        <Route path="*" element={<Err404 />} />
      </Routes>
    </MemoryRouter>
  </>
);

export default App;
