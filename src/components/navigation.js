import * as React from "react";
import {
  IconButton,
  Button,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Box,
  Menu,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { stringAvatar } from "../constants";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { deAuthenticateUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";

// const pages = ["Project", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  console.log(user);

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
    handleCloseUserMenu();
    localStorage.setItem("superuser", null);
    dispatch(deAuthenticateUser());
    navigate("/login");
  };

  return (
    <Box sx={{marginBottom: '120px'}}>
    <AppBar position="fixed">
      <Container maxWidth="100%">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <img src="/assets/login-logo.png" alt="logo" width={80} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* <MenuIcon /> */}
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Link to="/projects">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Projects
              </Button>
            </Link>

            <Link to="/events">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Events
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {user === null ? (
              <Link
                to="/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <Login></Login>
                <Typography>Log In</Typography>
              </Link>
            ) : (
              <Tooltip title="Open settings">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    {...stringAvatar(user.firstName + " " + user.lastName)}
                  />
                  <Typography>
                    {user.firstName + " " + user.lastName}
                  </Typography>
                </Box>
              </Tooltip>
            )}
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
              <MenuItem onClick={handleLogOut}>
                <Logout></Logout>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}
export default Navigation;
