import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.primary.light,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      position="sticky"
      bottom={0}
    >
      <Container>
        <Typography variant="body1" textAlign="center">
          My sticky footer can be found here.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
