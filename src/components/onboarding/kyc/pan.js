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
import {
  getAccountsOnboarding,
} from "../../../service/ash_admin";
import { panNumberValidation } from "../../../utils/validations";

import { KycContext } from "../../../context/kyc/kycContextProvider";

const Pan = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchKycData, createKyc, updateKyc } = useContext(KycContext)
  const [panNumberError, setPanNumberError] = useState("");

  const [kycData, setKycData] = useState({
    name: "",
    id_proof_no: "",
    id_proof_type: "pan",
  });

  useEffect(() => {
    const kycId = searchParams.get('id');
    if(kycId) {
      _fetchKycData();
    }
  }, [])

  const _fetchKycData = async () => {
    const kyc = await fetchKycData();
    setKycData({...kyc})
  };

  const _createKyc = async () => {
    await createKyc(kycData);
    await _fetchOnboardingStatus();
  };

  const _updateKyc = async () => {
    await updateKyc(kycData);
    navigate('/kyc', {replace: true});
  };

  const _fetchOnboardingStatus = async () => {
    try {
      console.log("[ProfilePage]::[_fetchOnboardingStatus]");
      const onboarding = await getAccountsOnboarding();

      const flow = onboarding["flow"];

      const pages = flow.filter((page) => !page["status"]);
      console.log(pages);

      if (!onboarding["status"]) {
        const path = `/kyc/${pages && pages[0]["page"]}`;
        console.log(path);
        navigate(path, { replace: true });
      }

      console.log(`[ProfilePage]::[_fetchOnboardingStatus]`, pages, onboarding);
    } catch (err) {
      console.log(`[ProfilePage]::[_fetchOnboardingStatus]::err ${err}`);
    }
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
    await _createKyc();
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
          <IconButton onClick={() => navigate("/kyc", { replace: true })}>
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
