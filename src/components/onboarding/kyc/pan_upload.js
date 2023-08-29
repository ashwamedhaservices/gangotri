import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
} from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import {
  getAccountsKyc,
  getAccountsOnboarding,
  postFileUpload,
  putAccountsKyc,
  putFileUpload,
} from "../../../service/ash_admin";
import ImageInput from "../../image-input";

function PanUpload() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [kycId, setKycId] = useState(null);
  const [kycUpdateId, setKycUpdateId] = useState(null);
  const [uploadImagePercentage, setUploadImagePercentage] = useState(0);
  const [kycData, setKycData] = useState({
    id_proof_url: "",
  });

  useEffect(() => {
    const kycId = searchParams.get('id');
    setKycUpdateId(kycId)
    fetchKycData();
  }, []);

  const fetchKycData = async () => {
    try {
      const kyc = await getAccountsKyc();
      console.log("[pan_upload]::[_fetchKycData]::", kyc);
      setKycId(kyc.id);
    } catch (error) {
      console.error("[pan_upload]::[_fetchKycData]::err", error);
    }
  };

  const updateKyc = async () => {
    try {
      console.log("[pan]::[_updateKyc]:: Enter", kycData);
      const kycPayload = { kyc: kycData };
      console.log("[pan]::[_updateKyc]::", kycPayload);

      const data = await putAccountsKyc(kycPayload, kycId);
      console.log("[pan]::[_updateKyc]::[response]::", data);

      if(kycUpdateId) {
        navigate('/kyc', {replace: true});
        return
      }

      await _fetchOnboardingStatus();
    } catch (error) {
      console.error("[pan]::[_updateKyc]::err", error);
    }
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
        navigate(path, { replace: true })
      }

      console.log(`[ProfilePage]::[_fetchOnboardingStatus]`, pages, onboarding);
    } catch (err) {
      console.log(`[ProfilePage]::[_fetchOnboardingStatus]::err ${err}`);
    }
  };

  const handleImage = async (file) => {
    let inputFile = { ...file[0] };
    inputFile.type = file[0].name.split(".")[1];
    inputFile.name = file[0].name.split(".")[0];
    inputFile.location = "pan";
    console.log("file:", file[0], inputFile);

    // Creating the file location
    const res = await postFileUpload({
      file: {
        ...inputFile,
      },
    });
    console.log("upload course res", res);
    const uploadImageLocation = res.message.split("?")[0];
    if (res) {
      setKycData({
        ...kycData,
        id_proof_url: uploadImageLocation,
      });
    }

    // Uploading the file to the Storage URL of file location
    const resFileUpload = await putFileUpload(
      res.message,
      file[0],
      (progressEvent) => {
        const percentage = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        setUploadImagePercentage(percentage);
        return percentage; // Because you were returning the percentage before.
      }
    );
    console.log("uploaded course image", resFileUpload);
  };

  const handlePanProofSubmit = async () => {
    console.log(kycData);
    await updateKyc();
  }
  const buttonDisabled = () => {
    if(kycData && !kycData.id_proof_url) return true
    return false
  }
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
            Pan Upload
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Container style={{ padding: "16px", marginTop: "32px" }}>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Upload PAN Image
            </Typography>
            <ImageInput
              previewImage={kycData.id_proof_url}
              handleImage={handleImage}
              percentage={uploadImagePercentage}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px", color: `${ buttonDisabled() ? 'white' : 'var(--theme-background-tertiary)'}`, backgroundColor: `${ buttonDisabled() ? 'var(--theme-background-tertiary)' : 'var(--theme-primary-color)'}` }}
            onClick={handlePanProofSubmit}
            disabled={buttonDisabled()}
          >
            {kycUpdateId ? 'Update' : 'Continue' }
          </Button>
        </Container>
      </Container>
    </div>
  );
}

export default PanUpload;
