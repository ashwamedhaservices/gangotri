import { useState, useEffect } from "react";
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useKycAddressContext } from "../../../context/address/kycAddressContextProvider";
import CustomAppBar from "../../common/AppBar/CustomAppBar";

function Address() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchAddressByIdForAdminData, updateKycAddress } = useKycAddressContext();
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
    const addressId = searchParams.get('id');
    if(addressId) {
      _fetchKycAddressData(addressId);
    }
  }, []);

  const _fetchKycAddressData = async (addressId) => {
    const address = await fetchAddressByIdForAdminData(addressId);
    setAddressData(() => ({
      ...address
    }))
  }

  const _updateKycAddress = async () => {
    await updateKycAddress(addressData);
    navigate('/kyc', {replace: true});
  }

  const handleAddressSubmit = async () => {
    console.log(addressData);
    if(addressData && addressData.id) {
      await _updateKycAddress();
      return
    }
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
      <CustomAppBar title="Address details" link='/onboarding' isReplace/>
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
