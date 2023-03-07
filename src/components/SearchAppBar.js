import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "./Auth";
import { Typography } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchAppBar({ setSearchValue }) {
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogOut = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <Box sx={{ m: 1, p: 1 }}>
      <AppBar position="static" sx={{ alignItems: "center" }}>
        <Toolbar>
          <Search sx={{ minWidth: { xs: 100, md: 500, lg: 700 } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Job tittle"
              inputProps={{ "aria-label": "search" }}
              sx={{ width: "100%" }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Search>

          {!auth.user && (
            <Button
              style={{ color: "orange" }}
              size="small"
              component={Link}
              to={"/login"}
              state={{ background: location }}
            >
              Sign In
            </Button>
          )}
          {auth.user && (
            <>
              <Typography
                variant="h6"
                noWrap
                component="div"
                mr={2}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Welcome {auth.user} !
              </Typography>
              <Button
                style={{ color: "orange" }}
                size="small"
                onClick={handleLogOut}
              >
                Sign Out
              </Button>
            </>
          )}
          {/* {console.log(auth.user)} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
