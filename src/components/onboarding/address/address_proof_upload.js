import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Stack, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { Container } from '@mui/system';
import { getAccountsKyc, getAccountsOnboarding, postFileUpload, putAccountsKyc, putFileUpload } from '../../../service/ash_admin';
import ImageInput from '../../image-input';
import CustomAppBar from '../../common/AppBar/CustomAppBar';
import { useKycContext } from '../../../context/kyc/kycContextProvider';

const AddressProofUpload = () => {
  const navigate = useNavigate();
  const { updateKyc, fetchKycByIdForAdminData } = useKycContext();
  const [searchParams] = useSearchParams();
  const [uploadImagePercentage, setUploadImagePercentage] = useState(0);
  const [kycData, setKycData] = useState({
    address_proof_no: '',
    address_proof_url: '',
    address_proof_type: 'aadhaar',
  });
  const [errors, setErrors] = useState({});

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


  const handleInputChange = event => {
    const { name, value } = event.target;
    setKycData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImage = async (file) => {
    let inputFile = { ...file[0] };
    inputFile.type = file[0].name.split(".")[1];
    inputFile.name = file[0].name.split(".")[0];
    inputFile.location = kycData && kycData.address_proof_type ? kycData.address_proof_type: 'aadhaar';
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
    console.log(kycData);
    await _updateKyc();
  };

  const buttonDisabled = () => {
    return (
      kycData &&
      (!kycData.address_proof_no ||
        !kycData.address_proof_type ||
        !kycData.address_proof_url)
    );
  }

  return (
    <div>
      <CustomAppBar title="Address proof upload" link='/onboarding' isReplace/>
      <Container style={{ padding: "16px", marginTop: "32px" }}>
        <TextField
          label="Enter address proof no"
          type="text"
          name="address_proof_no"
          value={kycData.address_proof_no}
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
            value={kycData.address_proof_type}
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
              Upload  {kycData.address_proof_type} image
            </Typography>
            <ImageInput
              previewImage={kycData.address_proof_url}
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
          Update
        </Button>
      </Container>
    </div>
  );
};

export default AddressProofUpload;
