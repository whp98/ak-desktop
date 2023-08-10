import React from 'react';
import { MdBarChart, MdCurrencyExchange, MdInfo, MdOilBarrel, MdStickyNote2 } from 'react-icons/md';
import { AiFillGold } from 'react-icons/ai';
import { FaChartLine, FaRankingStar } from 'react-icons/fa6';

const SidebarData = [
  {
    "title": '关于',
    "path": '/',
    "icon": <MdInfo />,
  },
  {
    "title": 'ak股票k线',
    "path": '/stock',
    "icon": <MdBarChart />,
  },
  {
    "title": 'ak股票列表',
    "path": '/stock-list',
    "icon": <MdStickyNote2 />,
  },
  {
    "title": 'ak汇率外汇管理局',
    "path": '/currency',
    "icon": <MdCurrencyExchange />,
  },
  {
    "title": 'ak 中国油价',
    "path": '/oil-price',
    "icon": <MdOilBarrel />,
  },
  {
    "title": 'ak黄金价格',
    "path": '/gold-price',
    "icon": <AiFillGold />,
  },
  {
    "title": 'ak分析师排行',
    "path": '/investment-analyst-rank',
    "icon": <FaRankingStar />,
  },
  {
    "title": 'ak分析师报告',
    "path": '/investment-analyst-report',
    "icon": <FaChartLine />,
  },
];
export default SidebarData;
