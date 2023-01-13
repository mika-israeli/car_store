import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useUser from '../Hooks/useUser';
import { useAuth } from "../Context/AuthProvider"
import CircularProgress from '@mui/material/CircularProgress';
import Car from './Car';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const UserRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [data, setdata] = useState([]);
  const { User } = useUser();
  const { currentUser } = useAuth();
  const privateAxios = axiosPrivate(currentUser);
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getRecommendationsBasedOnOrders = async () => {
    setLoading(true);
    console.log('IN GET RECOM', data, Orders);
    const similarCars = data.filter((car) => {
      return Orders.some((order) => {
        return order.items.some((cartCar) => {
          console.log('cart car', cartCar);
          return (
            (car.manufacturer === cartCar.manufacturer ||
              car.color === cartCar.color ||
              car.type.includes(cartCar.type)) &&
            cartCar._id !== car._id
          );
        });
      });
    });
    console.log('similar cars', similarCars);
    setRecommendations(similarCars.splice(0, 3));
    setLoading(false);
  };
  useEffect(() => {
    const getDataAndOrders = async () => {
      await privateAxios
        .get(`/orders/find/${User._id}`)
        .then((res) => res.data)
        .then((data) => setOrders(data.sort((a, b) => 0.5 - Math.random())));
      await fetch('http://localhost:8000/cars')
        .then((res) => res.json())
        .then((res) => setdata(res.sort((a, b) => 0.5 - Math.random())))
        .then(() => console.log(data, Orders));
    };
    getDataAndOrders();
  }, []);
  useEffect(() => {
    setLoading(true);
    console.log(Orders);
    if (Orders.length > 0) {
      getRecommendationsBasedOnOrders().then(() => setLoading(false));
    }
  }, [data, Orders]);
  useEffect(() => {
    console.log(recommendations);
  }, [recommendations]);
  return (
    <div>
      <Typography variant='h4'>Recommendations for you</Typography>
      <div className='recommendations'>
        {loading && recommendations.length > 0 ? (
          <CircularProgress />
        ) : (
          <Box display={'flex'} gap={2}>
            {recommendations.map((car) => {
              return <Car item={car} />;
            })}
          </Box>
        )}
      </div>
    </div>
  );
};

export default UserRecommendation;
