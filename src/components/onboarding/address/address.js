import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getAccountsKyc,
  getAccountsOnboarding,
} from "../../../service/ash_admin";
import { KycAddressContext } from "../../../context/address/kycAddressContextProvider";

function Address() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchKycAddressData, createKycAddress, updateKycAddress } = useContext(KycAddressContext)
  const [kycId, setKycId] = useState(0);
  const [addressData, setAddressData] = useState({
    name: "",
    address_type: "",
    address_line_one: "",
    address_line_two: "",
    address_line_three: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    fetchKycData();
    const addressId = searchParams.get('id');
    if(addressId) {
      _fetchKycAddressData(addressId);
    }
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

  const _fetchKycAddressData = async (addressId) => {
    const addresses = await fetchKycAddressData(kycId);
    setAddressData(() => ({
      ...addresses.filter((address) => address.id === Number(addressId))[0]
    }))
  }

  const _createKycAddress = async () => {
    await createKycAddress(addressData, kycId);
    await _fetchOnboardingStatus();
  };

  const _updateKycAddress = async () => {
    await updateKycAddress(addressData);
    navigate('/kyc', {replace: true});
  }
  
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

  const handleAddressSubmit = async () => {
    console.log(addressData);
    if(addressData && addressData.id) {
      await _updateKycAddress();
      return
    }
    await _createKycAddress();
  };

  const handleAddressDetail = (event) => {
    setAddressData({
      ...addressData,
      [event.target.name]: event.target.value,
    });
  };

  const buttonDisabled = () => {
    return (
      addressData &&
      (!addressData.name ||
        !addressData.address_type ||
        !addressData.address_line_one ||
        !addressData.address_line_two ||
        !addressData.address_line_three ||
        !addressData.city ||
        !addressData.state ||
        !addressData.country ||
        !addressData.postal_code)
    );
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
            Address Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "16px", marginTop: "32px" }}>
        {/* Name of Address */}
        <TextField
          label="Name of Address"
          name="name"
          variant="outlined"
          fullWidth
          value={addressData.name}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* Address type */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <Select
            name="address_type"
            value={addressData.address_type}
            onChange={handleAddressDetail}
            label="Address Type"
          >
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="office">Office</MenuItem>
          </Select>
        </FormControl>

        {/* Address line 1 */}
        <TextField
          label="Address line 1"
          variant="outlined"
          fullWidth
          name="address_line_one"
          value={addressData.address_line_one}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* Address line 2 */}
        <TextField
          label="Address line 2"
          variant="outlined"
          fullWidth
          name="address_line_two"
          value={addressData.address_line_two}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* Address line 3 (Landmark) */}
        <TextField
          label="Landmark"
          variant="outlined"
          fullWidth
          name="address_line_three"
          value={addressData.address_line_three}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* City */}
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          name="city"
          value={addressData.city}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* State */}
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          name="state"
          value={addressData.state}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* Country */}
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          name="country"
          value={addressData.country}
          onChange={handleAddressDetail}
          margin="normal"
        />

        {/* Postal Code */}
        <TextField
          label="Postal Code"
          variant="outlined"
          fullWidth
          name="postal_code"
          value={addressData.postal_code}
          onChange={handleAddressDetail}
          margin="normal"
        />

        <Button
          variant="contained"
          color="secondary"
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
          Continue
        </Button>
      </Container>
    </div>
  );
}

export default Address;
