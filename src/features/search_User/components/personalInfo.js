import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  backgroundColor: "darkwhite",
  marginTop: "20px",
  padding: "10px",
});

function PersonalInfo() {
  const [selectedRole, setSelectedRole] = useState("admin");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const userData = {
    id: 123,
    name: "Sandesh",
    email: "sandeshrnaik2000@gmail.com",
    CurrentRole: "User",
  };

  return (
    <>
      <div>
        <h5 style={{ textAlign: "center" }}>User Name</h5>
        <h3>Personal-information</h3>
      </div>
      <StyledCard>
        <CardContent>
          <Grid item xs={12}>
            <div>
              User Data:
              <ul>
                <li>ID: {userData.id}</li>
                <li>Name: {userData.name}</li>
                <li>Email: {userData.email}</li>
                <li>User Role: {userData.CurrentRole}</li>
              </ul>
            </div>
          </Grid>
          <Grid item xs={12} marginTop={5}>
            <h3>Upgrade Role</h3>
            <FormControl >
              <InputLabel id="role-label">Select Role:</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={selectedRole}
                onChange={handleRoleChange}
                label="Select Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="fieldOfficer">
                  Field Development Officer
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} marginTop={3}>
            <Button type="submit" variant="contained" color="primary" >
              Update
            </Button>
          </Grid>
        </CardContent>
      </StyledCard>
    </>
  );
}

export default PersonalInfo;
