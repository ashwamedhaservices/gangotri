import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { panNumberValidation } from "../../../utils/validations";

import { KycContext } from "../../../context/kyc/kycContextProvider";

const Pan = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateKyc, fetchKycByIdForAdminData } = useContext(KycContext)
  const [panNumberError, setPanNumberError] = useState("");

  const [kycData, setKycData] = useState({
    name: "",
    id_proof_no: "",
    id_proof_type: "pan",
  });

  useEffect(() => {
    const kycId = searchParams.get('id');
    if(kycId) {
      _fetchKycData(kycId);
    }
  }, [])

  const _fetchKycData = async (kycId) => {
    const kyc = await fetchKycByIdForAdminData(kycId);
    setKycData({...kyc})
  };

  const _updateKyc = async () => {
    await updateKyc(kycData);
    navigate('/onboarding', {replace: true});
  };

  const _panNumberValidation = (value) => {
    console.log(`[PanUpload]::[_panNumberValidation]:: Enter ${value}`);
    setPanNumberError(() => panNumberValidation(value));
  };

  const handlePanSubmit = async () => {
    console.log(kycData);
    if(kycData && kycData.id) {
      console.log('Update');
      _updateKyc();
      return
    }
  };

  const handleKycDetails = (event) => {
    if (event.target.name === "id_proof_no") {
      _panNumberValidation(event.target.value.toUpperCase());
    }

    setKycData({
      ...kycData,
      [event.target.name]:
        event.target.name === "id_proof_no"
          ? event.target.value.toUpperCase()
          : event.target.value,
    });
  };

  const buttonDisabled = () => {
    if (panNumberError) return true;
    if (kycData && !kycData.name) return true;
    if (kycData && !kycData.id_proof_no) return true;
    return false;
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: "var(--theme-background-secondary)",
          elevation: 0,
        }}
      >
        <Toolbar>
          <IconButton onClick={() => navigate("/onboarding", { replace: true })}>
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
            Pan details
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "16px", marginTop: "32px" }}>
        <TextField
          name="name"
          label="Enter pan name"
          value={kycData.name}
          variant="outlined"
          fullWidth
          onChange={handleKycDetails}
        />
        <Grid sx={{ mt: 2 }}></Grid>
        <TextField
          name="id_proof_no"
          label="Enter pan number"
          value={kycData.id_proof_no}
          variant="outlined"
          fullWidth
          error={panNumberError.length > 0}
          helperText={panNumberError}
          onChange={handleKycDetails}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "16px",
            color: `${
              buttonDisabled() ? "white" : "var(--theme-background-tertiary)"
            }`,
            backgroundColor: `${
              buttonDisabled()
                ? "var(--theme-background-tertiary)"
                : "var(--theme-primary-color)"
            }`,
          }}
          onClick={handlePanSubmit}
          disabled={buttonDisabled()}
        >
          {kycData && kycData.id ? 'Update' : 'Continue'}
        </Button>
      </Container>
    </div>
  );
};

export default Pan;
