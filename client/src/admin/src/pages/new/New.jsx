import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Nevbar from '../../components/nevbar/Nevbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { matchRoutes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import React from 'react';

//I need to add punctionality to add users here

const New = ({ inputs, productRows }) => {
  const [file, setFile] = useState('');
  const location = useLocation();
  const locationArr = location.pathname.split('/');
  const id = locationArr[locationArr.length - 1];
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`/cars/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(product);
  // document.getElementById('userInput').value
  const updateObject = async () => {
    const car = {};
    if (document.getElementsByClassName('userInput-color')[0].value != '') {
      car.color = document.getElementsByClassName('userInput-color')[0].value;
    }
    if (document.getElementsByClassName('userInput-price')[0].value != '') {
      car.price = document.getElementsByClassName('userInput-price')[0].value;
    }
    if (
      document.getElementsByClassName('userInput-manufacturer')[0].value != ''
    ) {
      car.manufacturer = document.getElementsByClassName(
        'userInput-manufacturer'
      )[0].value;
    }
    if (
      document.getElementsByClassName('userInput-kilometers')[0].value != ''
    ) {
      car.kilometers = document.getElementsByClassName(
        'userInput-kilometers'
      )[0].value;
    }
    //new
    if (document.getElementsByClassName('userInput-model')[0].value != '') {
      car.model = document.getElementsByClassName('userInput-model')[0].value;
    }
    if (
      document.getElementsByClassName('userInput-description')[0].value != ''
    ) {
      car.description = document.getElementsByClassName(
        'userInput-description'
      )[0].value;
    }
    if (document.getElementsByClassName('userInput-image')[0].value != '') {
      car.image = document.getElementsByClassName('userInput-image')[0].value;
    }
    if (document.getElementsByClassName('userInput-type')[0].value != '') {
      car.type = document.getElementsByClassName('userInput-type')[0].value;
    }
    if (document.getElementsByClassName('userInput-year')[0].value != '') {
      car.year = document.getElementsByClassName('userInput-year')[0].value;
    }

    const res = await axios
      .patch(`/cars/${id}`, car)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Nevbar />
        <div className='top'>
          <h1>{'Edit Product'}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                product?.image 
                  ? product.image
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className='right'>
            <form>
              {inputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={product[input.label]?product[input.label] : null}
                    className={`userInput-${input.label}`}
                  />
                </div>
              ))}
            </form>
            <button
              onClick={function () {
                updateObject();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
