import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect, useContext } from "react";
import { Alert } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthProvider"

const SignupUser = () => {

  const {signup} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
    const response = await signup(user.email,user.password);
     console.log(response);
      // return navigate("/login");
    } catch (error) {
      console.log(error);
      seterror(error);
    }

  };
  const [user, setuser] = useState({});
  const [error, seterror] = useState("");
  useEffect(() => {
    seterror("");
  }, [user]);

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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : ""}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus />
          <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Have an account? Log-in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupUser;
