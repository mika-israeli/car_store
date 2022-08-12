import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
export default function CarsIconMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    setAnchorEl(null);
    navigate(`/cars/${type}`);
  };
  const navigate = useNavigate();
  const type = [
    'all',
    'universal',
    'sedan',
    'suv',
    'hatchback',
    'minivan',
    'minibus',
    'liftback',
    'coupe',
    'van',
  ];
  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          my: 2,
          color: 'white',
          display: 'flex',
          alignContent: 'center',
        }}
        startIcon={<DirectionsCarTwoToneIcon />}
      >
        <Typography textAlign='center'>Cars</Typography>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {type.map((type) => (
          <MenuItem key={type} onClick={() => handleClose(type)}>
            {type}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
