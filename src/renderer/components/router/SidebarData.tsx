import React from 'react';
import {
  MdCurrencyExchange,
  MdInfo,
  MdInfoOutline,
  MdMan3,
  MdNewspaper,
  MdOilBarrel,
  MdRadio,
  MdStickyNote2,
} from 'react-icons/md';
import { AiFillGold } from 'react-icons/ai';
import { FaRankingStar } from 'react-icons/fa6';
import { RiTimeLine } from 'react-icons/ri';
import { BsTable } from 'react-icons/bs';

const SidebarData = [
  {
    "title": '关于',
    "path": '/',
    "icon": <MdInfo />,
  },

  {
    "title": 'ak股票列表',
    "path": '/stock-list',
    "icon": <MdStickyNote2 />,
  },
  /*  {
    "title": 'ak股票k线1',
    "path": '/stock-candlestick1',
    "icon": <MdBarChart />,
  },
  {
    "title": 'ak股票k线2',
    "path": '/stock-candlestick2',
    "icon": <MdBarChart />,
  }, */
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
  /*  {
    "title": 'ak分析师报告',
    "path": '/investment-analyst-report',
    "icon": <FaChartLine />,
  }, */
  {
    "title": '指数中心',
    "path": '/index-center',
    "icon": (
      <div>
        <BsTable /> <RiTimeLine />
      </div>
    ),
  },
  {
    "title": '银行拆借利率调整',
    "path": '/bank-rate-his',
    "icon": <MdRadio />,
  },
  {
    "title": 'cctv新闻',
    "path": '/news_cctv',
    "icon": <MdNewspaper />,
  },
  {
    "title": '进出口',
    "path": '/cust_import_export',
    "icon": <MdInfoOutline />,
  },
  {
    "title": '消费者信心',
    "path": '/cust_consumer_confidence',
    "icon": <MdMan3 />,
  },
  /* {
    "title": '指数详情',
    "path": '/index-daily',
    "icon": <RiStockLine />,
  }, */
];
export default SidebarData;
