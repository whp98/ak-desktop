const handleDateWrapper = (dataInput: any): any[] => {
  const res: any = [];
  for (let i = 0; i < dataInput.length; i += 1) {
    const currVal = dataInput[i];
    res[i] = [
      currVal['日期'].substring(0, 10),
      currVal['开盘'],
      currVal['收盘'],
      currVal['最低'],
      currVal['最高'],
      currVal['成交额'],
      /* currVal['成交量'],
      currVal['振幅'],
      currVal['涨跌幅'],
      currVal['涨跌额'],
      currVal['换手率'], */
    ];
  }
  return res;
};

export default handleDateWrapper;
