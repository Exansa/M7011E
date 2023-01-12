import Link from "next/link";
import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import Routes from "../routes";
import { signIn, signOut, useSession } from "next-auth/react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { checkIfAdmin } from "../utils/checkAdmin";

//const pages = ["home", "about", "browse"];

function SettingsBox(args) {
  const { anchorElUser, handleOpenUserMenu, handleCloseUserMenu, session } =
    args;

  const settings = [
    { link: Routes.users.index, name: "Profile" },
    { link: Routes.users.settings, name: "Settings" },
    { link: Routes.posts.make, name: "Post" },
  ];

  const isAdmin = session ? checkIfAdmin(session) : false;

  if (isAdmin) {
    settings.push({ link: Routes.admin.index, name: "Admin" });
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={session.user.username}
            src={session.user.profile_picture}
          />
        </IconButton>
      </Tooltip>
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
          <Link key={`link-${setting}`} href={setting.link}>
            <MenuItem
              key={setting.link}
              onClick={(event) => {
                //console.log("Click!");
                //handleSetting(setting);
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">{setting.name}</Typography>
            </MenuItem>
          </Link>
        ))}
        <MenuItem
          onClick={(event) => {
            handleCloseUserMenu();
            signOut();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

function NavBarSmall(args) {
  const {
    title,
    session,
    pages,
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
    SettingsBox,
  } = args;
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
                <Link key={`link-${page}`} href={page.link}>
                  <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
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
          >
            {title}
          </Typography>

          {session ? { ...SettingsBox } : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function NavBarExpanded(args) {
  const { title, session, pages, handleCloseNavMenu, SettingsBox } = args;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={`link-${page}`} href={page.link}>
                <Button
                  key={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box>
            {session ? (
              { ...SettingsBox }
            ) : (
              <Button
                key={"login"}
                onClick={signIn}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { data: session } = useSession();

  const pages = [
    { link: "/", name: "Home" },
    { link: Routes.posts.index, name: "Browse" },
    { link: "/about", name: "About" },
  ];

  if (session) {
    pages.push({ link: Routes.posts.make, name: "Make Post" });
  }

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

  const args = {
    title: "M7011E",
    session,
    pages,
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    SettingsBox: (
      <SettingsBox
        anchorElUser={anchorElUser}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
        session={session}
      />
    ),
  };

  //const { user, error, isLoading } = useUser();

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none", width: "100vw" } }}>
        <NavBarSmall {...args} />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block", width: "100vw" } }}>
        <NavBarExpanded {...args} />
      </Box>
    </>
  );
}
