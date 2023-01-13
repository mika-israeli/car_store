import { Box, Button, Drawer, FormControl, Input, InputLabel, Stack } from "@mui/material";
import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { axiosPrivate } from "../api/axios";
import useUser from "../Hooks/useUser";
import { useAuth } from "../Context/AuthProvider"
import Swal from "sweetalert2";

const UserSettings = () => {
  const { User } = useUser();
  const { currentUser } = useAuth();
  const api = axiosPrivate(currentUser);
  const [userValues, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const res = api
          .patch(`/users/${User._id}`, { ...userValues })
          .then((res) => {
            if ((res.statusText = "OK")) {
              Swal.fire("Saved!", "Your setting have been modifide", "success");
              setLoading(false);
            } else {
              Swal.fire("Oops!", "server comunication error", "error");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleChange = (prop) => (event) => {
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
    <Box>
      <div style={{ margin: "100px" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "50px" }}>
          <div>
            <h1>User Settings</h1>
            <hr style={{ margin: "10px" }}></hr>
            <TextField label="New username" id="outlined-start-adornment" sx={{ m: 1, width: "25ch" }} onChange={handleChange("username")} />
            <br></br>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={userValues.showPassword ? "text" : "password"}
                value={userValues.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {userValues.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Reapet Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={userValues.showPassword ? "text" : "password"}
                value={userValues.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {userValues.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput id="outlined-adornment-email" type="email" value={userValues.email} onChange={handleChange("email")} label="Email" />
            </FormControl>
            <LoadingButton style={{ margin: "10px 0px 0px 10px", left: "300px" }} color="secondary" onClick={handleClick} loading={loading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
              Save
            </LoadingButton>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default UserSettings;
