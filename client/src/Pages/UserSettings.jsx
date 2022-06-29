import { Box, Button, Drawer, FormControl, Input, InputLabel } from "@mui/material";
import React from "react";

const UserSettings = () => {
  return (
    <Box>
      <h1>User Settings</h1>

      <FormControl>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input id="username" aria-describedby="username-helper-text" />
      </FormControl>
      <FormControl>
        <InputLabel htmlfor="email">Email</InputLabel>
        <Input id="email" aria-describedby="email-helper-text" />
      </FormControl>
    </Box>
  );
};

export default UserSettings;
