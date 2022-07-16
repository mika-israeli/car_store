import { Box, Button, Drawer, FormControl, Input, InputLabel, Stack } from "@mui/material";
import React, { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControlLabel from '@mui/material/FormControlLabel';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import api from "../api/axios"
import {useUser} from "../Hooks/useUser"
import {useAuth} from "../Hooks/useAuth"

const UserSettings = () => {

  const [userValues, setValues] = React.useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    showPassword: false,
  });

  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await api.patch("/users/" , {userValues})
    console.log(res)
    if (res == "ok"){
      setLoading(false)
    }
  }
  
  const handleChange = (prop) => (event) => {
    console.log(event.target.value)
    setValues({ ...userValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...userValues,
      showPassword: !userValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
    <div>
    <h3>User Settings</h3>
      <TextField
        label="Name"
        id="outlined-start-adornment"
        sx={{ m: 1, width: '25ch' }}
        onChange={handleChange('name')}
       
      />
        <TextField
        label="Last Name"
        id="outlined-start-adornment"
        sx={{ m: 1, width: '25ch' }}
        onChange={handleChange('lastName')}

      />
      <br></br>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={userValues.showPassword ? 'text' : 'password'}
          value={userValues.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {userValues.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Reapet Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={userValues.showPassword ? 'text' : 'password'}
          value={userValues.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {userValues.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type = 'email'
          value={userValues.email}
          onChange={handleChange('email')}
          label="Email"
        />
      </FormControl>
    <LoadingButton
          style={{margin:"10px"}}
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save
        </LoadingButton>
    </div>
  </Box>
  );
};

export default UserSettings;
