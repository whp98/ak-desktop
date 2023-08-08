import React, {useEffect, useState} from "react";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import akrq from "@/renderer/api/Akrq";
// import {getLineChartOptions} from '@/renderer/pages/utils/echartLine'
import {getKlineOption} from '@/renderer/pages/utils/echartK-lineChart'
import EChartsContainer from "@/renderer/components/chart/EChartsContainer";
import PageLayout from "@/renderer/components/layout/PageLayout";

const AkStockHis = (props) => {
  const [inputStock, setInputStock] = useState('600000');
  const [echartOptions, setechartOptions] = useState({});

  // 每当props改变的时候就会实时重新渲染
  useEffect(() => {
    akrq.instance.get("stock_zh_a_hist", {params: {symbol: inputStock}})
      .then(r => {
        // const myOptions = getKlineOption(r.data)
        const myOptions = getKlineOption(r.data)
        setechartOptions(myOptions)
      })
  }, [props, inputStock]);
  return <PageLayout>
    <Stack direction="column" display="flex" padding="20px">
      <Stack
        direction="row"
      >
        <TextField
          required
          fullWidth
          id="outlined-required"
          value={inputStock}
          onChange={(event) => {
            setInputStock(event.target.value as string);
          }}
          placeholder="stock"
          label="stock"
        />
      </Stack>
      <Stack
        direction="row"
      >
        <EChartsContainer options={echartOptions}/>
      </Stack>
    </Stack>
  </PageLayout>;
}

export default AkStockHis;
