import React, { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import DirectionsCarTwoToneIcon from "@mui/icons-material/DirectionsCarTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import ConnectWithoutContactTwoToneIcon from "@mui/icons-material/ConnectWithoutContactTwoTone";
import ShopIcon from "@mui/icons-material/Shop";
import {useAuth} from "../Context/AuthProvider";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Badge, Drawer } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "../Hooks/useCart";
import CartPage from "./CartPage";
import toast from "react-hot-toast";
import CarsIconMenu from "./CarsIconMenu";
import ProductApi from "../Pages/ProductApi";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const pages = [
  { name: "Home", icon: <HomeTwoToneIcon />, link: "/home" },
  // {
  //   name: "Contact us",
  //   icon: <ConnectWithoutContactTwoToneIcon />,
  //   link: "/contact",
  // },
  {
    name: "Product Api",
    icon: <CloudDownloadIcon />,
    link: "/api",
  },
];

const pagesNotLoggedIn = [
  {
    name: "login",
    link: "/login",
    icon: <LoginIcon />,
  },
  {
    name: "sign-up",
    link: "/signup",
    icon: <AppRegistrationIcon />,
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const { currentUser,logout,userData } = useAuth();
  const { Cart, setCart } = useCart();
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = () => {
    logout()
    //setAuth({ accessToken: null, isAdmin: false });
    //setUser({});
    toast('Logged out successfully', { type: 'success' });
    navigate('/home');
  };

useEffect(()=>{
  if(userData?.isAdmin && !window.location.href.includes('admin'))
    navigate('/admin')
},[userData])

  const settings = [
    {
      name: "Order History",
      onClick: () => {
        navigate("/orderhistory");
      },
    },
    {
      name: "Logout",
      onClick: handleLogOut,
    },
    {
      name: "Settings",
      onClick: () => {
        navigate("/settings");
      },
    },
  ];
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setdrawerOpen(open);
  };
  return (
    <AppBar position="static" sx={{ zindex: 2, overflow: "auto" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShopIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Car Bazar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu id="menu-appbar" open={Boolean(anchorElNav)}>
              {pages.map((page) => (
                <MenuItem key={page.name}>
                  <Typography textAlign="center">
                    <Button>
                      <IconButton
                        onClick={() => {
                          navigate(page.link);
                        }}
                      >
                        {page.icon}
                        {page.name}
                      </IconButton>
                    </Button>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  alignContent: "center",
                }}
                startIcon={page.icon}
              >
                <Link
                  to={`${page.link}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
            <CarsIconMenu />
          </Box>
          {currentUser?.email ? (
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {currentUser && userData?.isAdmin && (
                <Tooltip title={'Admin dashboard'}>
                  <IconButton
                    onClick={() => navigate("/admin")}
                    sx={{ color: "white" }}
                  >
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Your Cart">
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => setdrawerOpen(true)}
                >
                  <Badge badgeContent={Cart.length} color="info">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={currentUser.email}
                    src='/static/images/avatar/2.jpg'
                  />
                </IconButton>
              </Tooltip>
              <Typography>welcom {currentUser?.email}</Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={setting.onClick}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Drawer
                open={drawerOpen}
                anchor="right"
                onClose={toggleDrawer(false)}
                variant="temporary"
              >
                <CartPage closeCart={() => setdrawerOpen(false)} />
              </Drawer>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pagesNotLoggedIn.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "flex",
                    alignContent: "center",
                  }}
                  startIcon={page.icon}
                >
                  <Link
                    to={`${page.link}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
