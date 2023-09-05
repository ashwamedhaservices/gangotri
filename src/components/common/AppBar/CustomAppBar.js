import React from 'react'
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types'

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";


const CustomAppBar = ({
  title,
  link,
  isReplace
}) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "var(--theme-background-secondary)",
        elevation: 0,
      }}
    >
      <Toolbar>
        <IconButton onClick={() => navigate(link, { replace: isReplace })}>
          <ArrowBackSharpIcon
            color="primary"
            style={{ color: "var(--theme-primary-navbar-color)" }}
          />
        </IconButton>
        <Typography
          variant="h6"
          color="primary"
          style={{ color: "var(--theme-primary-navbar-color)" }}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

CustomAppBar.defaultProps = {
  isReplace: false,
  link: '/',
}

CustomAppBar.propTypes = {
  isReplace: PropTypes.bool,
  link: PropTypes.any,
  title: PropTypes.string.isRequired
}

export default CustomAppBar