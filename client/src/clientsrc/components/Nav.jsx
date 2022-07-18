import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
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
import useAuth from "../Hooks/useAuth";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useUser from "../Hooks/useUser";
import { Badge, Drawer } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "../Hooks/useCart";
import CartPage from "./CartPage";
import toast from "react-hot-toast";

const pages = [
  { name: "Home", icon: <HomeTwoToneIcon />, link: "/home" },
  { name: "Cars", icon: <DirectionsCarTwoToneIcon />, link: "/cars" },
  { name: "Contact us", icon: <ConnectWithoutContactTwoToneIcon />, link: "/contact" },
  {}
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
  const { Auth, setAuth } = useAuth();
  const { User } = useUser();
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
    setAuth({});
    setCart([]);
    toast("Logged out successfully", { type: "success" });
    navigate("/home");
  };
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
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
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
            Igor Project
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={`${page.link}`} style={{ textDecoration: "none" }}>
                      {page.icon}
                      {page.name}
                    </Link>
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
              <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "flex", alignContent: "center" }} startIcon={page.icon}>
                <Link to={`${page.link}`} style={{ textDecoration: "none", color: "white" }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          {Auth.accessToken ? (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 3 }}>
              <Tooltip title={"Admin dashboard"}>
                <IconButton onClick={() => navigate("/admin")} sx={{ color: "white" }}>
                  <DashboardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Your Cart">
                <IconButton sx={{ color: "white" }} onClick={() => setdrawerOpen(true)}>
                  <Badge badgeContent={Cart.length} color="info">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={User.username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Typography>welcom {User.username}</Typography>
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
              <Drawer open={drawerOpen} anchor="right" onClose={toggleDrawer(false)} variant="temporary">
                <CartPage closeCart={() => setdrawerOpen(false)} />
              </Drawer>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pagesNotLoggedIn.map((page) => (
                <Button key={page.name} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "flex", alignContent: "center" }} startIcon={page.icon}>
                  <Link to={`${page.link}`} style={{ textDecoration: "none", color: "white" }}>
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
