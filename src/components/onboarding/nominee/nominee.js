import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccountsKyc, getAccountsOnboarding } from '../../../service/ash_admin';
import { KycNomineeContext } from '../../../context/nominee/kycNomineeContextProvider';
import CustomAppBar from '../../common/AppBar/CustomAppBar';

const Nominee = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchNomineeByIdForAdminData, createKycNominee, updateKycNominee } = useContext(KycNomineeContext)
  const [kycId, setKycId] = useState(null);
  const [nomineeData, setNomineeData] = useState({
    name: '',
    dob: '',
    relationship: '',
  });

  useEffect(() => {
    const nomineeId = searchParams.get('id');
    if(nomineeId) {
      _fetchKycNomineeData(nomineeId);
    }
  }, []);

  const _fetchKycNomineeData = async (nomineeId) => {
    const nominee = await fetchNomineeByIdForAdminData(nomineeId);
    setNomineeData(() => ({
      ...nominee
    }))
  }

  const _createNominee = async () => {
    await createKycNominee(nomineeData, kycId);
  };

  const _updateKycNominee = async () => {
    await updateKycNominee(nomineeData);
    navigate('/onboarding', {replace: true});
  }


  const handleInputChange = event => {
    const { name, value } = event.target;
    setNomineeData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddressSubmit = async () => {
    console.log(nomineeData);
    if(nomineeData && nomineeData.id) {
      await _updateKycNominee();
      return
    }
    await _createNominee();
  }

  const buttonDisabled = () => {
    return (
      nomineeData &&
      (!nomineeData.name ||
        !nomineeData.dob ||
        !nomineeData.relationship )
    );
  };

  return (
    <div>
      <CustomAppBar title="Nominee details" link='/onboarding' isReplace/>
      <Container style={{ padding: "16px", marginTop: "32px" }}>
        <TextField
          label="Enter nominee name"
          type="text"
          name="name"
          value={nomineeData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Select Date of birth"
          name="dob"
          type="date"
          value={nomineeData.dob}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Relationship with nominee"
          name="relationship"
          select
          value={nomineeData.relationship}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="self">Self</MenuItem>
          <MenuItem value="spouse">Spouse</MenuItem>
          <MenuItem value="child">Child</MenuItem>
          <MenuItem value="parent">Parent</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>

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
          {nomineeData && nomineeData.id ? 'Update' : 'Continue'}
        </Button>
      </Container>
    </div>
  );
};

export default Nominee;
