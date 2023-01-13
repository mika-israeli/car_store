import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect, useContext } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider"
import useUser from "../Hooks/useUser";
import jwt_decode from "jwt-decode";
import useLocalStorage from "../Hooks/useLocalStorage";
import useCart from "../Hooks/useCart";

const LoginUSer = () => {
  const { login } = useAuth();
  const { User, setUser } = useUser();
  const LOGIN_URL = "auth/login";
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setvalue] = useLocalStorage(User._id, []);

  const { Cart, setCart } = useCart();
  const from = location.state?.from?.pathname || "/";
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
     
    
     const response = await login(user.email,user.password);
      response && navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      seterror(error.response.data);
    }
  };

  const [error, seterror] = useState("");
  // useEffect(() => {
  //   seterror("");
  // }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error ? (
          <Alert severity="error" variant="outlined" sx={{ margin: 1 }}>
            {error}
          </Alert>
        ) : (
          ""
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginUSer;
