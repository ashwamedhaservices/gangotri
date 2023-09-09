import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Stack,
  Typography,
  Container,
  Button,
} from "@mui/material";
import {
  postFileUpload,
  putFileUpload,
} from "../../../service/ash_admin";
import ImageInput from "../../image-input";
import { useKycContext } from "../../../context/kyc/kycContextProvider";
import CustomAppBar from "../../common/AppBar/CustomAppBar";

function PanUpload() {
  const { updateKyc, fetchKycByIdForAdminData } = useKycContext();
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
    if(kycId){
      _fetchKycData(kycId);
    }
    
  }, []);

  const _fetchKycData = async (kycId) => {
    try {
      const kyc = await fetchKycByIdForAdminData(kycId);
      console.log("[pan_upload]::[_fetchKycData]::", kycId);
      setKycData(kycId);
    } catch (error) {
      console.error("[pan_upload]::[_fetchKycData]::err", error);
    }
  };

  const _updateKyc = async () => {
    await updateKyc(kycData);
    navigate('/onboarding', {replace: true});
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
    await _updateKyc();
  }
  const buttonDisabled = () => {
    if(kycData && !kycData.id_proof_url) return true
    return false
  }
  return (
    <div>
      <CustomAppBar title="Pan upload" link='/onboarding' isReplace/>
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
