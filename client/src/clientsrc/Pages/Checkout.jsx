import React from 'react';

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stepper,
  TextField,
  Typography,
  Step,
  StepLabel,
  Container,
  Paper,
  Button,
  Alert,
  Dialog,
} from '@mui/material';
import useUser from '../Hooks/useUser';
import Address from '../components/Address';
import Review from '../components/Review';
import { useState } from 'react';
import useCart from '../Hooks/useCart';
import { useAuth } from "../Context/AuthProvider"
import { axiosPrivate } from '../api/axios';
import { Navigate, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import UserRecommendation from '../components/UserRecommendation';
import FacebookLogin from 'react-facebook-login';
import { FacebookShareButton, FacebookIcon } from 'react-share';
const Checkout = () => {
  const [activeStep, setactiveStep] = useState(0);
  const { User } = useUser();
  const { Cart, setCart } = useCart();
  const { currentUser } = useAuth();
  const [shippingDetails, setshippingDetails] = useState({ email: User.email });
  const products = Cart.map((product) => {
    return {
      name: product.manufacturer + ' ' + product.model,
      desc: product.description,
      year: product.year,
      price: product.price,
    };
  });
  const onNext = () => {
    //check if the form is valid
    if (
      shippingDetails.firstName &&
      shippingDetails.lastName &&
      shippingDetails.address1 &&
      shippingDetails.city &&
      shippingDetails.zip
    ) {
      setactiveStep(activeStep + 1);
    } else {
      toast.error('Please fill in all the fields');
    }
  };
  const onBack = () => {
    setactiveStep(activeStep - 1);
  };
  const onChange = (e) => {
    setshippingDetails({
      ...shippingDetails,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Address onChange={onChange} shippingDetails={shippingDetails} />
        );
      case 1:
        return <Review shippingDetails={shippingDetails} products={products} />;
      case 2:
        return (
          <Box>
            <Alert severity='success'>
              Thank you for your order! you can view your order status{' '}
              <Link to={{ pathname: '/orderhistory' }}>Your orders</Link>
            </Alert>
            <FacebookShareButton
              url='https://www.facebook.com/Shop-730745804865220/?ref=pages_you_manage?quote=wow'
              hashtag='#shop'
            >
              Share this on facebook: <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  const confirmOrder = () => {
    const Order = {
      userid: User._id,
      userDetails: {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
      },
      items: Cart.map((product) => product._id),
      amount: Cart.reduce((acc, product) => acc + product.price, 0),
      status: 'pending',
      date: new Date(),
      address: shippingDetails.address1 + ',' + shippingDetails.city,
    };

    const privateAxios = axiosPrivate(currentUser);
    privateAxios
      .post('/orders/add', { user: User._id, Order: Order })
      .then((res) => {
        setactiveStep(2);
        setCart([]);
      })
      .catch((err) => {
        console.log(err);
        toast('Something went wrong, please try again later', {
          type: 'error',
        });
      });
  };

  return (
    <>
      {Cart.lenght < 0 && <Navigate to='/cars/all' />}
      <Container component='main' maxWidth='md' sx={{ mb: 4 }}>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component='h1' variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper alternativeLabel activeStep={activeStep}>
            <Step>
              <StepLabel>Shipping address</StepLabel>
            </Step>
            <Step>
              <StepLabel>Place order</StepLabel>
            </Step>
            <Step>
              <StepLabel>Done!</StepLabel>
            </Step>
          </Stepper>
          <div>{getStepContent(activeStep)}</div>
          {activeStep === 1 ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 3 }}
                onClick={onBack}
              >
                prev
              </Button>
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 3 }}
                onClick={confirmOrder}
              >
                Confirm order
              </Button>
            </Box>
          ) : (
            activeStep < 2 && (
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 3 }}
                onClick={onNext}
              >
                Next
              </Button>
            )
          )}
        </Paper>
      </Container>
    </>
  );
};
export default Checkout;
