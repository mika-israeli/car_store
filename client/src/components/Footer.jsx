import { Box, Grid, Link, ThemeProvider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box px={{ xs: 3, sm: 7 }} py={{ xs: 5, sm: 10 }} color="black" bgcolor="primary">
        <Container maxWidth="100%" sx={{ position: "sticky", bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography>THIS IS THE FOOTER</Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
