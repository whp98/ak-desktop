import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Err404 from '@/renderer/pages/Err404';

import NavLayout from '@/renderer/components/layout/NavLayout';
import About from '@/renderer/pages/About';
import AkStockCandlestickChart1 from '@/renderer/pages/AkStockCandlestickChart1';
import AkStockTable from '@/renderer/pages/AkStockTable';
import AkCurrency from '@/renderer/pages/AkCurrency';
import AkOilPrice from '@/renderer/pages/AkOilPrice';
import AkGoldPrice from '@/renderer/pages/AkGoldPrice';
import AkInvestmentAnalyst from '@/renderer/pages/AkInvestmentAnalyst';
import AkInvestmentAnalystReport from '@/renderer/pages/AkInvestmentAnalystReport';
import AkStockCandlestickChart2 from '@/renderer/pages/AkStockCandlestickChart2';
import AkIndexCenter from '@/renderer/pages/AkIndexCenter';
import AkIndexDaily from '@/renderer/pages/AkIndexDaily';

const App: React.FunctionComponent = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={<About />} />
          <Route path="stock-candlestick1" element={<AkStockCandlestickChart1 />} />
          <Route path="stock-list" element={<AkStockTable />} />
          <Route path="currency" element={<AkCurrency />} />
          <Route path="oil-price" element={<AkOilPrice />} />
          <Route path="gold-price" element={<AkGoldPrice />} />
          <Route path="investment-analyst-rank" element={<AkInvestmentAnalyst />} />
          <Route path="investment-analyst-report" element={<AkInvestmentAnalystReport />} />
          <Route path="stock-candlestick2" element={<AkStockCandlestickChart2 />} />
          <Route path="index-center" element={<AkIndexCenter />} />
          <Route path="index-daily" element={<AkIndexDaily />} />
        </Route>
        <Route path="*" element={<Err404 />} />
      </Routes>
    </MemoryRouter>
  </>
);

export default App;
