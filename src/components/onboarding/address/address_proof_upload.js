import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Stack, AppBar, IconButton, Toolbar, Typography, FormControl, Select, MenuItem } from '@mui/material';
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Container } from '@mui/system';
import { getAccountsKyc, getAccountsOnboarding, postFileUpload, putAccountsKyc, putFileUpload } from '../../../service/ash_admin';
import ImageInput from '../../image-input';

const AddressProofUpload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [kycId, setKycId] = useState(null);
  const [kycUpdateId, setKycUpdateId] = useState(null);
  const [uploadImagePercentage, setUploadImagePercentage] = useState(0);
  const [addressProofData, setAddressProofData] = useState({
    address_proof_no: '',
    address_proof_url: '',
    address_proof_type: 'aadhaar',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchKycData();
    const kycId = searchParams.get('id');
    setKycUpdateId(kycId)
  }, []);

  const fetchKycData = async () => {
    try {
      const kyc = await getAccountsKyc();
      console.log("[address]::[_fetchKycData]::", kyc);
      setKycId(kyc.id);
    } catch (error) {
      console.error("[address]::[_fetchKycData]::err", error);
    }
  };

  const updateAddressProof = async () => {
    try {
      console.log("[address]::[_createKycAddress]:: Enter", addressProofData);
      const addressProofPayload = { kyc: addressProofData };

      const data = await putAccountsKyc(addressProofPayload, kycId);
      console.log("[address_proof_upload]::[updateAddressProof]::[response]::", data);
      
      if(kycUpdateId) {
        navigate('/kyc', {replace: true});
        return
      }

      await _fetchOnboardingStatus();
    } catch (error) {
      console.error(error);
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
        navigate(path, { replace: true });
      }

      console.log(`[ProfilePage]::[_fetchOnboardingStatus]`, pages, onboarding);
    } catch (err) {
      console.log(`[ProfilePage]::[_fetchOnboardingStatus]::err ${err}`);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAddressProofData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImage = async (file) => {
    let inputFile = { ...file[0] };
    inputFile.type = file[0].name.split(".")[1];
    inputFile.name = file[0].name.split(".")[0];
    inputFile.location = addressProofData && addressProofData.address_proof_type ? addressProofData.address_proof_type: 'aadhaar';
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
      setAddressProofData({
        ...addressProofData,
        address_proof_url: uploadImageLocation,
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

  const handleAddressSubmit = async () => {
    console.log(addressProofData);
    await updateAddressProof();
  };

  const buttonDisabled = () => {
    return (
      addressProofData &&
      (!addressProofData.address_proof_no ||
        !addressProofData.address_proof_type ||
        !addressProofData.address_proof_url)
    );
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
            Address proof upload
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "16px", marginTop: "32px" }}>
        <TextField
          label="Enter address proof no"
          type="text"
          name="address_proof_no"
          value={addressProofData.address_proof_no}
          onChange={handleInputChange}
          error={Boolean(errors.address_proof_no)}
          helperText={errors.address_proof_no}
          fullWidth
          margin="normal"
        />

         {/* Address proof type */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <Select
            name="address_proof_type"
            value={addressProofData.address_proof_type}
            onChange={handleInputChange}
            label="Address proof type"
          >
            <MenuItem value="aadhaar">Aadhaar</MenuItem>
            <MenuItem value="passport">Passport</MenuItem>
          </Select>
        </FormControl>

        <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Upload  {addressProofData.address_proof_type} image
            </Typography>
            <ImageInput
              previewImage={addressProofData.address_proof_url}
              handleImage={handleImage}
              percentage={uploadImagePercentage}
            />
          </Stack>

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
          onClick={handleAddressSubmit}
          disabled={buttonDisabled()}
        >
          {kycUpdateId ? 'Update' : 'Continue' }
        </Button>
      </Container>
    </div>
  );
};

export default AddressProofUpload;
