import React from 'react'
import { styled } from "@mui/material/styles";
import { Stack, Grid, Paper, TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomForm = ({
  
  handleChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item sx={12} sm={6}>
        <Item>
          <Stack>
            <TextField 
              label="label"
              name="name"
              variant="outlined"
              fullWidth
              value={'value'}
              onChange={() => {}}
              margin="normal"
            />
          </Stack>
        </Item>
      </Grid>
    </Grid>
  )
}

export default CustomForm