import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import akrq from '@/renderer/api/Akrq';

function AkNewsComponent() {
  const [selectedDate, setSelectedDate] = useState(moment().subtract(1, 'day'));
  const [news, setNews] = useState([{ "title": '', "date": '', "content": '' }]);
  const fetchNews = (date) => {
    akrq.instance
      .get('news_cctv', { "params": { "date": moment(date).format('YYYYMMDD') } })
      .then((e) => {
        setNews(e.data);
      });
  };
  useEffect(() => {
    // 从服务器获取选定日期的新闻
    fetchNews(selectedDate);
  }, [selectedDate]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box>
      <Box sx={{
        "display":'flex',
        "direction":'row',
        "alignItems":'center',
        "justifyContent":'center'
      }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </LocalizationProvider>
      </Box>

      {news.map((item) => (
        <Grid key={`${item.title}grid`} container sx={{ "margin": 2 }}>
          <Typography key={`${item.title}title`} variant="h5">
            {item.title}
          </Typography>
          <Typography key={`${item.date}date`} variant="subtitle1" sx={{ "fontSize": '18px' }}>
            {item.date}
          </Typography>
          <Typography key={`${item.content}content`} variant="body1">
            {item.content}
          </Typography>
        </Grid>
      ))}
    </Box>
  );
}

export default AkNewsComponent;
