import { Drawer, Typography, Divider } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import ApprovalRoundedIcon from "@mui/icons-material/ApprovalRounded";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const logo = null;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  justifyContent: "flex-end",
}));
// const useStyles = makeStyles((theme) => {
//   return {
//     page: {
//       background: "#f9f9f9",
//       width: "100%",
//       padding: theme.spacing(3),
//     },
//     root: {
//       display: "flex",
//     },
//     drawer: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//     drawerPaper: {
//       width: drawerWidth,
//     },
//     active: {
//       background: "#f4f4f4",
//     },
//     title: {
//       letterSpacing: "3px",
//       fontWeight: "bold",
//       textAlign: "center",
//     },
//     drawerHeader: {
//       padding: theme.spacing(2),
//     },
//     appStyles: {
//       flexGrow: 1,
//     },
//     appAvatar: {
//       marginLeft: theme.spacing(2),
//       color: "#ec407a",
//     },
//     appBar: {
//       minHeight: "64px",
//     },
//     toolbar: theme.mixins.toolbar,
//     link: {
//       textDecoration: "none",
//       color: theme.palette.text.primary,
//     },
//   };
// });

export default function Layout({ children }) {
  const classes = null;

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //Responsive Design

  const styledTheme = useTheme();

  const isMatch = useMediaQuery(styledTheme.breakpoints.up("md"));

  console.log(isMatch);

  return (
    <div className={classes.root}>
      {/* appbar */}
      <AppBar position="fixed" className={classes.appBar} color="inherit" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography className={classes.appStyles} variant="h6">
            Campaigns
          </Typography>

          {isMatch ? (
            <>
              {" "}
              <Avatar src={logo} />
              <Typography className={classes.appAvatar}>Need help? Schedule a tour </Typography>
            </>
          ) : null}

          {
            <div>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenUserMenu} color="inherit">
                <AccountCircle />
                <KeyboardArrowDownOutlinedIcon />
              </IconButton>
              <Menu
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
                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>About</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
