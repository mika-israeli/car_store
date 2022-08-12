import React from 'react';
import CarFeed from '../components/CarFeed';
import { useEffect } from 'react';
import { useState } from 'react';

import { Box } from '@mui/material';
import { useParams } from 'react-router';
import axios from '../api/axios';

const Products = () => {
  const [data, setdata] = useState('');
  const { type } = useParams();
  useEffect(() => {
    axios
      .get(`/cars/type/${type}`)
      .then((res) => res.data)
      .then((data) => setdata(data));
  }, []);

  return (
    <Box display='flex' justifyContent='center' alignItems={'center'}>
      {data && <CarFeed items={data} />}
    </Box>
  );
};

export default Products;
