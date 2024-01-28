import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";

function PersonalInfo() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const location = useLocation();
  const user = location.state?.user;

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h5 style={{ textAlign: "center" }}>
        {user
          ? `${user.fname} ${user.mname ? user.mname + " " : ""}${user.lname}`
          : "Loading..."}
      </h5>
      <h3>Personal Information</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
  {user &&
    Object.entries(user).map(([key, value], index) => (
      <div
        key={key}
        style={{
          marginBottom: "10px",
          gridColumn: index % 2 === 0 ? "1" : "2", 
        }}
      >
        <span style={{ fontWeight: "bold" }}>{key}:</span> {value}
      </div>
    ))}
</div>

      <Grid item xs={12} style={{ marginTop: "3px" }}>
        <h3>Upgrade Role</h3>
        <FormControl>
          <InputLabel id="role-label">Select Role:</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={selectedRole}
            onChange={handleRoleChange}
            label="Select Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="fieldOfficer">Field Development Officer</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "10px" }}>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </Grid>
    </div>
  );
}

export default PersonalInfo;
