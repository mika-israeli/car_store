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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthProvider";
import axios from "../api/axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const LOGIN_URL = "auth/login";
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      return navigate("/login");
    } catch (error) {
      seterror(error.response.data);
    }
  };
  const [user, setuser] = useState({});
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState("");
  useEffect(() => {
    seterror("");
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      {success ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1">
            Success
          </Typography>
          <Typography variant="h6" component="h2">
            You have successfully logged in
          </Typography>
        </Box>
      ) : (
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
          {error ? <Alert severity="error">{error}</Alert> : ""}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus />
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
      )}
    </Container>
  );
};

export default Login;
