import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Grid, Stepper, TextField, Typography, Step, StepLabel, Container, Paper } from "@mui/material";
const Address = ({ onChange, shippingDetails }) => {
  return (
    <div>
      <Typography variant="h6">Shipping address</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required id="firstName" name="firstName" label="First name" autoComplete="given-name" variant="standard" onChange={onChange} defaultValue={shippingDetails?.firstName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="lastName" name="lastName" label="Last name" autoComplete="family-name" variant="standard" onChange={onChange} defaultValue={shippingDetails?.lastName} />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="address1" name="address1" label="Street name" autoComplete="shipping address-line1" variant="standard" onChange={onChange} defaultValue={shippingDetails?.address1} />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="email" name="eail" label="Email" autoComplete="email" variant="standard" disabled onChange={onChange} defaultValue={shippingDetails.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="city" name="city" label="City" autoComplete="shipping address-level2" variant="standard" onChange={onChange} defaultValue={shippingDetails?.city} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="zip" name="zip" label="Zip / Postal code" autoComplete="shipping postal-code" variant="standard" onChange={onChange} defaultValue={shippingDetails?.zip} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Address;
