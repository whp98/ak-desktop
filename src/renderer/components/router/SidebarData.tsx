import React from 'react';
import { MdBarChart, MdCurrencyExchange, MdInfo, MdOilBarrel, MdStickyNote2 } from 'react-icons/md';
import { AiFillGold } from 'react-icons/ai';

const SidebarData = [
  {
    title: '关于',
    path: '/',
    icon: <MdInfo />,
  },
  {
    title: 'ak股票k线',
    path: '/stock',
    icon: <MdBarChart />,
  },
  {
    title: 'ak股票列表',
    path: '/stock-list',
    icon: <MdStickyNote2 />,
  },
  {
    title: 'ak汇率外汇管理局',
    path: '/currency',
    icon: <MdCurrencyExchange />,
  },
  {
    title: 'ak 中国油价',
    path: '/oil-price',
    icon: <MdOilBarrel />,
  },
  {
    title: 'ak黄金价格',
    path: '/gold-price',
    icon: <AiFillGold />,
  },
];
export default SidebarData;
